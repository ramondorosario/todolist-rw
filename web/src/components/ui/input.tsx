import * as React from 'react'

import { cn } from '../../lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded bg-mauve-5 border border-mauve-6 px-3 outline-0 outline-offset-0 py-2 text-sm text-white placeholder:text-white outline-none placeholder:text-opacity-50 hover:border-red-600 focus-visible:border-red-600  disabled:cursor-not-allowed disabled:opacity-50 disabled:border-mauve-6 disabled:text-opacity-70 transition-colors duration-200',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
