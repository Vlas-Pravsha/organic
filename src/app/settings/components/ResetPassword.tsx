'use client'

import { updateUserPassword } from '@/app/auth/actions'
import { Button, Input, Label } from '@/components/ui'
import { usePasswordVisibility, useUser } from '@/hooks/'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import * as z from 'zod'
import type { MouseEvent } from 'react'

import 'react-toastify/dist/ReactToastify.css'

const schema = z
  .object({
    newPassword: z.string().min(6, { message: 'Password must contain a minimum of 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Password must contain a minimum of 6 characters' }),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

function ResetPassword() {
  const { user } = useUser()
  const newPassword = usePasswordVisibility()
  const confirmPassword = usePasswordVisibility()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    const result = await updateUserPassword(data.newPassword)
    if (result.success) {
      toast.success('Password updated successfully')
      reset()
    }
    else {
      toast.error(result.error || 'Failed to update password')
    }
  }

  const handleResetForm = (event: MouseEvent) => {
    event.preventDefault()
    reset()
  }

  return (
    <div className="bg-gray-darkest border border-opacity-medium rounded-lg w-full p-6">
      <h2 className="text-2xl font-bold mb-6">Personal data</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Label title="Your e-mail">
          <Input placeholder="email" type="text" disabled defaultValue={user?.email} />
        </Label>
        <div>
          <h3 className="text-xl font-semibold mb-4">Password</h3>
          <div className="space-y-4">
            <Label errorText={errors.newPassword?.message} hasError={errors.newPassword} title="New password">
              <div className="relative">
                <Input
                  hasError={errors.newPassword}
                  placeholder="Current password"
                  type={newPassword.inputType}
                  {...register('newPassword')}
                />
                <button
                  type="button"
                  onClick={newPassword.togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-iconsColor cursor-pointer"
                >
                  {newPassword.passwordShown ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </Label>
            <Label errorText={errors.confirmPassword?.message} hasError={errors.confirmPassword} title="Confrim new password">
              <div className="relative">
                <Input
                  hasError={errors.confirmPassword}
                  placeholder="New password"
                  type={confirmPassword.inputType}
                  id="confirmPassword"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={confirmPassword.togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-iconsColor cursor-pointer"
                >
                  {confirmPassword.passwordShown ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </Label>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button type="submit" variant="primary">
            Update Password
          </Button>
          <Button
            variant="secondary"
            onClick={event => handleResetForm(event)}
          >
            Clear
          </Button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
    </div>
  )
}

export default ResetPassword