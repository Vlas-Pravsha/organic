'use client'

import { Button, Form, Input } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import * as z from 'zod'
import type { SubmitHandler } from 'react-hook-form'
import { login } from '../actions'

import 'react-toastify/dist/ReactToastify.css'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)
    try {
      await login(data)
      router.push('/')
    }
    catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to log in. Please try again.')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between min-h-screen">
      <div className="custom-gradient w-full flex min-h-screen justify-center items-center flex-col">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg p-10 rounded-lg shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
          <div className="space-y-4">
            <Form.Field>
              <Form.Control>
                <Input
                  type="text"
                  placeholder="email@example.com"
                  {...register('email')}
                  hasError={errors.email}
                />
              </Form.Control>
              {errors.email && (
                <Form.ErrorMessage>{errors.email.message}</Form.ErrorMessage>
              )}
            </Form.Field>

            <Form.Field>
              <Form.Control>
                <Input
                  type="password"
                  placeholder="your very secret password"
                  {...register('password')}
                  hasError={errors.password}
                />
              </Form.Control>
              {errors.password && (
                <Form.ErrorMessage>{errors.password.message}</Form.ErrorMessage>
              )}
            </Form.Field>
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={loading}
            className="w-full mt-6"
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </Form>
        <ToastContainer position="bottom-right" autoClose={5000} theme="colored" />
      </div>
    </div>
  )
}
