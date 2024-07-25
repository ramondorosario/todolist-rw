import { Textarea as ShadTextArea } from '@/components/ui/textarea'

type TextareaProps = React.ComponentProps<typeof ShadTextArea>

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return <ShadTextArea {...props} ref={ref}/>
  }
)
