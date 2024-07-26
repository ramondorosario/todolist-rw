import { Box } from '@/components/Box/Box'
import { Button } from '@/components/Button/Button'
import { ListContainer } from '@/components/ListContainer/ListContainer'
import { ListItem } from '@/components/ListItem/ListItem'
import { Metadata } from '@redwoodjs/web'
import { CalendarCheck, CalendarDays, Inbox, Star } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useState } from 'react'
import { TaskForm } from '@/components/TaskForm/TaskForm'

function CustomDialog() {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Adicionar</Button>
      <Dialog
        open={openModal}
        onOpenChange={(isOpen) => {
          setOpenModal(isOpen)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-1">Cadastrar task</DialogTitle>
            <hr className="border-1 border-mauve-6 " />
          </DialogHeader>

          <TaskForm
            footer={
              <DialogFooter>
                <Button
                  type="button"
                  variant={'ghost'}
                  onClick={() => setOpenModal(false)}
                >
                  Cancelar
                </Button>
                <Button>Cadastrar</Button>
              </DialogFooter>
            }
          />
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
