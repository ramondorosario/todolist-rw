import { Label as ShadLabel } from '@/components/ui/label'
import { ReactNode } from 'react'

type OrientationType = 'top' | 'left' | 'right'

type LabelProps = {
  id?: string
  text: string
  children: ReactNode
  errorMessage?: string
  orientation?: OrientationType
}

const dictionary: Record<OrientationType, string> = {
  top: 'flex-col',
  left: 'flex-row items-center',
  right: 'flex-row-reverse items-center',
}

const Label = ({
  text,
  children,
  orientation = 'top',
  errorMessage,
}: LabelProps) => {
  return (
    <div className={`flex ${dictionary[orientation]} parent w-full gap-1`}>
      <ShadLabel className="text-base text-white">{text}</ShadLabel>

      {children}

      {errorMessage && (
        <p className="ml-auto text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}

export default Label
