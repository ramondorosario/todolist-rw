import { useEffect, useRef } from 'react'

import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { Box } from '@/components/Box/Box'
import Label from '@/components/Label/Label'
import { Input } from '@/components/Input/Input'
import { Button } from '@/components/Button/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Campo obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string().min(3, 'Campo obrigatório'),
})

const LoginPage = () => {
  const { isAuthenticated, logIn, loading, error } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error.includes("not found") ? "E-mail ou senha inválido" : response.error)
    }
  }

  return (
    <>
      <Metadata title="Login" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <Box className="h-full">
        <div>
          <h2 className="text-xl font-bold">Login</h2>
          <p>Informe seu e-mail e senha para entrar na plataforma</p>
        </div>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <Label text="E-mail" errorMessage={errors.email?.message}>
            <Input.Root placeholder="email@email.com" {...register('email')} />
          </Label>
          <Label text="Senha" errorMessage={errors.password?.message}>
            <Input.Password
              placeholder="Insira sua senha"
              {...register('password')}
            />
            <div className="flex justify-end text-sm text-tomato-11 underline hover:text-opacity-80">
              <Link to={""}>Esqueceu a senha?</Link>
            </div>
          </Label>

          <Button className="mt-4" loading={loading} disabled={loading}>
            Entrar
          </Button>
          {error?.message && (
            <p className="self-center text-sm text-red-500">{error?.message}</p>
          )}
        </form>
      </Box>
      <Box>
        <div className="flex h-full items-center justify-center">
          <img className="h-full" src="/login-image.svg" alt="Checklist" />
        </div>
      </Box>
    </>
  )
}

export default LoginPage
