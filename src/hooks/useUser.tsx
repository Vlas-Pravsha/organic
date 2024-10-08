'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  async function getUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      console.error('No active session or user not found')
      setLoading(false)
      return
    }
    setUser(data.user)
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [supabase.auth])

  return { user, setUser, loading }
}

export { useUser }
