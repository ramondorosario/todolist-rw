import { Button } from '@/components/Button/Button'
import { TaskForm } from '@/components/TaskForm/TaskForm'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useState } from 'react'
import { MoveLeft } from 'lucide-react'

function CustomDialog() {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <Button variant={'ghost'} onClick={() => setOpenModal(true)}>
        Editar
      </Button>

      <Dialog
        open={openModal}
        onOpenChange={(isOpen) => {
          setOpenModal(isOpen)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-1">Editar task</DialogTitle>
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
                <Button>Salvar</Button>
              </DialogFooter>
            }
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

const TaskPage = ({ taskId }: { taskId: string }) => {
  return (
    <>
      <Metadata title="Task" description="Task page" />

      <div className="col-span-2 flex h-full flex-col gap-4">
        <Link to={routes.home()} className='flex items-center gap-2 '>
          <MoveLeft /> Voltar
        </Link>
        <div>
          <h2 className="text-2xl font-bold">
            Titulo da task for muito grande o que acontece?
          </h2>
          <span className="text-sm text-tomato-11">
            Vencimento: <b>26/07/2024</b>
          </span>
        </div>
        <p className="max-w-[600px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
          totam aspernatur adipisci quis eum ipsa iste temporibus expedita, ab
          mollitia veritatis facilis soluta. Blanditiis minima maxime autem,
          excepturi nam repellat.
        </p>

        <div className="flex h-full items-end gap-4 self-end">
          <CustomDialog />
          <Button>Concluir</Button>
        </div>
      </div>
    </>
  )
}

export default TaskPage
