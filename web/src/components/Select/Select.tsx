import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SelectProps = React.ComponentProps<typeof ShadSelect> & {
  options: { value: string; label: string }[]
  onChange?(value: string): void
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, onChange, ...props }) => {
    return (
      <ShadSelect {...props} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadSelect>
    )
  }
)
