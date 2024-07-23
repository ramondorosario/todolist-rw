import { ButtonProps, Button as ShadButton } from '@/components/ui/button'

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <>
      <ShadButton  {...props}>{children}</ShadButton>
    </>
  )
}
