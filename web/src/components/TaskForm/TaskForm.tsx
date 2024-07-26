import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input/Input'
import { DatePicker } from '@/components/DatePicker/DatePicker'
import { Select } from '@/components/Select/Select'
import { TextArea } from '@/components/TextArea/TextArea'
import Label from '@/components/Label/Label'
import { ReactNode } from 'react'

const TaskFormSchema = z.object({
  title: z.string().min(1, 'Campo obrigatório'),
  description: z.string().min(1, 'Campo obrigatório'),
  dueDate: z.date({ message: 'Campo obrigatório' }),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: 'Campo obrigatório',
  }),
})

type TaskFormType = z.infer<typeof TaskFormSchema>

export const TaskForm = ({
  initialValues,
  footer,
  onSubmit,
}: {
  footer?: ReactNode
  initialValues?: TaskFormType
  onSubmit?(data: TaskFormType): void
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskFormType>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: initialValues,
  })

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((data) => {
        console.log({ data })
        onSubmit?.(data)
      })}
    >
      <Label text="Título" errorMessage={errors.title?.message}>
        <Input placeholder="Insira um titulo" {...register('title')} />
      </Label>

      <Label text="Descrição" errorMessage={errors.description?.message}>
        <TextArea
          placeholder="Descreva a sua tarefa"
          {...register('description')}
        />
      </Label>

      <div className="flex gap-4">
        <Label text="Prioridade" errorMessage={errors.priority?.message}>
          <Select
            options={[
              { value: 'low', label: 'Baixo' },
              { value: 'medium', label: 'Médio' },
              { value: 'high', label: 'Alto' },
            ]}
            onChange={(v: 'low' | 'medium' | 'high') => setValue('priority', v)}
          />
        </Label>

        <Label text="Data de vencimento" errorMessage={errors.dueDate?.message}>
          <DatePicker onChange={(date) => setValue('dueDate', date)} />
        </Label>
      </div>

      {footer && footer}
    </form>
  )
}
