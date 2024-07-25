import { Checkbox as ShadCheckbox } from '@/components/ui/checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'
import { useState } from 'react'

interface CustomCheckboxProps extends Omit<CheckboxProps, 'onChange' | "onClick"> {
  onChange?(checked: boolean): void
}

export const Checkbox = ({ onChange, ...props }: CustomCheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(
    Boolean(props.checked || props.defaultChecked)
  )

  return (
    <ShadCheckbox
      onClick={() => {
        setChecked(!checked)
        onChange(!checked)
      }}
      {...props}
    />
  )
}
