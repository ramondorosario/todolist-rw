import { Input as ShadInput } from '@/components/ui/input'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type InputProps = React.ComponentProps<typeof ShadInput>

export const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <ShadInput {...props} ref={ref} />
  }
)

export const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
      <div className="relative">
        <ShadInput type={showPassword ? "text" : "password"} {...props} ref={ref} />
        <button
          type="button"
          className="absolute right-[8px] top-[50%]  h-[20px] w-[20px] translate-y-[-50%]
					"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    )
  }
)

export const Input = {
  Root: InputComponent,
  Password: InputPassword,
}
