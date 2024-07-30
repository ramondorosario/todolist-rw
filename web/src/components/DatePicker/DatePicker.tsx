import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Label as ShadLabel } from '@/components/ui/label'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function DatePicker({
  onChange,
  defaultValue,
}: {
  onChange?(value: Date): void
  defaultValue?: Date
}) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue)

  React.useEffect(() => date && onChange?.(date), [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start border-mauve-6  bg-mauve-5 text-left font-normal outline-none hover:border-tomato-9 hover:bg-mauve-5 hover:text-white focus-visible:border-tomato-9 focus-visible:ring-0 focus-visible:ring-offset-0 ',
            !date && 'text-muted-foreground rounded'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'dd/MM/yyyy')
          ) : (
            <span className="text-white text-opacity-50">Escolha a data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          fixedWeeks
        />
      </PopoverContent>
    </Popover>
  )
}
