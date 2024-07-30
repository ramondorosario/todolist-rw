import { Button } from '@/components/Button/Button'
import { Loading } from '@/components/Loading/Loading'
import { TaskForm, TaskFormType } from '@/components/TaskForm/TaskForm'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Link, routes } from '@redwoodjs/router'
import { Metadata, useMutation, useQuery } from '@redwoodjs/web'
import { useState } from 'react'
import { MoveLeft } from 'lucide-react'
import { Task, UpdateTaskInput, MutationupdateTaskArgs } from 'types/graphql'
import { format } from 'date-fns'

const GET_TASK = gql`
  query GetTask($id: String!) {
    task(id: $id) {
      id
      title
      description
      dueDate
      priority
    }
  }
`

const UPDATE_TASKS = gql`
  mutation UpdateTaskMutation($id: String!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      description
      dueDate
      priority
    }
  }
`

function CustomDialog({
  data,
  onSubmit,
}: {
  data?: Task
  onSubmit?(value: TaskFormType): void
}) {
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
            onSubmit={onSubmit}
            initialValues={{
              title: data?.title ?? '',
              description: data?.description ?? '',
              dueDate: data?.dueDate
                ? new Date(data?.dueDate ?? '')
                : undefined,
              priority: data?.priority ?? 'low',
            }}
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

const TaskPage = ({ id }: { id: string }) => {
  const { data, loading } = useQuery<{ task: Task }, { id: string }>(GET_TASK, {
    variables: { id },
  })

  const [update, { loading: updateLoading }] = useMutation<
    { updateTask: Task },
    MutationupdateTaskArgs
  >(UPDATE_TASKS, {
    update: (cache, { data: updatedData }) => {
      const currentTask = cache.readQuery<{ task: Task }>({
        query: GET_TASK,
      })

      if (currentTask && data) {
        cache.writeQuery({
          query: GET_TASK,
          variables: {
            id,
          },
          data: {
            task: updatedData,
          },
        })
      }
    },
  })

  return (
    <>
      <Metadata title="Task" description="Task page" />

      <div className="col-span-2 flex h-full flex-col gap-4 bg-mauve-3 p-6 rounded">
        {loading || updateLoading ? (
          <Loading />
        ) : (
          <>
            <Link to={routes.home()} className="flex items-center gap-2 ">
              <MoveLeft /> Voltar
            </Link>
            <div>
              <h2 className="text-2xl font-bold">{data?.task.title}</h2>
              <span className="text-sm text-tomato-11">
                Vencimento:{' '}
                <b>{data && format(data.task.dueDate, 'dd/MM/yyyy')}</b>
              </span>
            </div>
            <p className="max-w-[600px]">{data?.task.description}</p>

            <div className="flex h-full items-end gap-4 self-end">
              <CustomDialog
                data={data?.task}
                onSubmit={(value) =>
                  update({
                    variables: {
                      id,
                      input: { ...value, dueDate: value.dueDate.toISOString() },
                    },
                  })
                }
              />
              <Button>Concluir</Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default TaskPage
