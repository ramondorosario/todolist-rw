import { Input as ShadInput } from '@/components/ui/input'

type InputProps = React.ComponentProps<typeof ShadInput>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <ShadInput {...props} ref={ref} />
  }
)
