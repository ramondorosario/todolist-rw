import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'placeholder:white flex min-h-[150px] resize-none w-full rounded border border-mauve-6 bg-mauve-5 px-3 py-2 text-base placeholder:text-base placeholder:text-opacity-50 hover:border-tomato-9 focus-visible:border-tomato-9 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
