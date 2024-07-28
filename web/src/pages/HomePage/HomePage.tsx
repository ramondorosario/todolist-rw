import { Box } from '@/components/Box/Box'
import { Button } from '@/components/Button/Button'
import { ListContainer } from '@/components/ListContainer/ListContainer'
import { ListItem } from '@/components/ListItem/ListItem'
import { Metadata, useMutation, useQuery } from '@redwoodjs/web'
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
import { Loading } from '@/components/Loading/Loading'
import { CreateTaskInput, MutationcreateTaskArgs, Task } from 'types/graphql'

const CREATE_TASKS = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      dueDate
      priority
    }
  }
`

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
    }
  }
`

const HomePage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { loading, data } = useQuery<{
    tasks: {
      id: string
      title: string
    }[]
  }>(GET_TASKS)
  const [create, { loading: mutationLoading }] = useMutation<
    { createTask: Task },
    MutationcreateTaskArgs
  >(CREATE_TASKS, {
    update(cache, { data }) {
      const currentList = cache.readQuery<{ tasks: Task[] }>({
        query: GET_TASKS,
      })

      if (currentList && data) {
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks: [...currentList.tasks, data.createTask],
          },
        })
      }
    },
  })

  function onSubmit(input: CreateTaskInput) {
    create({
      variables: {
        input,
      },
    }).finally(() => {
      setOpenModal(false)
    })
  }

  console.log(data)

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

      <Box
        title="Tasks"
        className="h-full"
        footer={
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
                  onSubmit={(data) =>
                    onSubmit({
                      title: data.title,
                      description: data.description,
                      dueDate: data.dueDate.toISOString(),
                      priority: data.priority,
                    })
                  }
                  footer={
                    <DialogFooter>
                      <Button
                        type="button"
                        variant={'ghost'}
                        onClick={() => setOpenModal(false)}
                        disabled={mutationLoading}
                      >
                        Cancelar
                      </Button>
                      <Button disabled={mutationLoading}>Cadastrar</Button>
                    </DialogFooter>
                  }
                />
              </DialogContent>
            </Dialog>
          </>
        }
      >
        {loading ? (
          <Loading />
        ) : (
          <ListContainer gap={2}>
            {data?.tasks.map((task) => (
              <ListItem.Root key={task.id} icon={<Star size={20} />}>
                {task.title}
              </ListItem.Root>
            ))}
          </ListContainer>
        )}
      </Box>
    </>
  )
}

export default HomePage
