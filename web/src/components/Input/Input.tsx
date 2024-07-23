import { InputProps, Input as ShadInput } from '@/components/ui/input'
import { Label as ShadLabel } from '@/components/ui/label'

type OrientationType = 'top' | 'left' | 'right';

type CustomInputProps = {
  label: string
  id: string
  orientation?: OrientationType
} & Omit<InputProps, 'id'>

const dictionary: Record<OrientationType, string> = {
  top: 'flex-col',
  left: 'flex-row items-center',
  right: 'flex-row-reverse items-center',
}

export const Input = ({
  id,
  label,
  orientation = 'top',
  ...props
}: CustomInputProps) => {
  return (
    <div className={`flex ${dictionary[orientation]} gap-1`}>
      <ShadLabel className='text-base text-white' htmlFor={id}>{label}</ShadLabel>
      <ShadInput id={id} {...props} />
    </div>
  )
}
