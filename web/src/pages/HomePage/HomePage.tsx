import { Box } from '@/components/Box/Box'
import { Button } from '@/components/Button/Button'
import { ListContainer } from '@/components/ListContainer/ListContainer'
import { ListItem } from '@/components/ListItem/ListItem'
import { Metadata } from '@redwoodjs/web'
import { CalendarCheck, CalendarDays, Inbox, Star } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input/Input'
import { DatePicker } from '@/components/DatePicker/DatePicker'
import { Select } from '@/components/Select/Select'
import { TextArea } from '@/components/TextArea/TextArea'
import Label from '@/components/Label/Label'
import { useState } from 'react'

const TaskFormSchema = z.object({
  title: z.string().min(1, 'Campo obrigatório'),
  description: z.string().min(1, 'Campo obrigatório'),
  dueDate: z.date({ message: 'Campo obrigatório' }),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: 'Campo obrigatório',
  }),
})

const initialValues: Partial<TaskFormType> = {
  title: '',
  description: '',
  dueDate: undefined,
  priority: undefined,
}

type TaskFormType = z.infer<typeof TaskFormSchema>

function CustomDialog() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TaskFormType>({
    resolver: zodResolver(TaskFormSchema),
  })

  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Adicionar</Button>
      <Dialog
        open={openModal}
        onOpenChange={(isOpen) => {
          setOpenModal(isOpen)
          reset(initialValues)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-1">Cadastrar task</DialogTitle>
            <hr className="border-1 border-mauve-6 " />
          </DialogHeader>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data) => {
              console.log({ data })

              reset(initialValues)
              setOpenModal(false)
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
                  onChange={(v: 'low' | 'medium' | 'high') =>
                    setValue('priority', v)
                  }
                />
              </Label>

              <Label
                text="Data de vencimento"
                errorMessage={errors.dueDate?.message}
              >
                <DatePicker onChange={(date) => setValue('dueDate', date)} />
              </Label>
            </div>

            <DialogFooter>
              {errors.root?.message && <p>{errors.root?.message}</p>}
              <Button>Cadastrar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Box title="Filtros">
        <ListContainer>
          <ListItem.Filter name="all" icon={<Inbox size={20} />}>
            Todos
          </ListItem.Filter>
          <ListItem.Filter name="favorite" icon={<Star size={20} />}>
            Favoritos
          </ListItem.Filter>
          <ListItem.Filter name="today" icon={<CalendarCheck size={20} />}>
            Hoje
          </ListItem.Filter>
          <ListItem.Filter name="week" icon={<CalendarDays size={20} />}>
            Semana
          </ListItem.Filter>
        </ListContainer>
      </Box>

      <Box title="Tasks" footer={<CustomDialog />}>
        <ListContainer gap={2}>
          <ListItem.Root icon={<Star size={20} />}>
            Minha primeira tarefa
          </ListItem.Root>
          <ListItem.Root icon={<Star size={20} />}>
            Minha segunda tarefa
          </ListItem.Root>
          <ListItem.Root icon={<Star size={20} />}>
            Minha terceira tarefa
          </ListItem.Root>
        </ListContainer>
      </Box>
    </>
  )
}

export default HomePage
