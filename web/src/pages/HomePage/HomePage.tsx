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
import { CreateTaskInput, MutationcreateTaskArgs, Task } from 'types/graphql'
import { routes } from '@redwoodjs/router'
import { ListFilterItemType } from '@/utils/getQueryParams'

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

const MAKE_FAVORITE_TASK = gql`
  mutation MakeFavoriteTaskMutation($id: String!, $isFavorite: Boolean!) {
    makeFavoriteTask(id: $id, isFavorite: $isFavorite) {
      id
      isFavorite
    }
  }
`

const GET_TASKS = gql`
  query GetTasks($filter: String) {
    tasks(filter: $filter) {
      id
      title
      isFavorite
    }
  }
`

const DELETE_TASKS = gql`
  mutation DeleteTasksMutation($ids: [String]!) {
    deleteTasks(ids: $ids)
  }
`

const HomePage = ({ filter }: { filter: ListFilterItemType }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loadingFavoriteTask, setLoadingFavoriteTask] = useState<string | null>(
    null
  )
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>()

  const { loading, data, refetch } = useQuery<
    {
      tasks: {
        id: string
        title: string
        isFavorite: boolean
      }[]
    },
    { filter?: ListFilterItemType }
  >(GET_TASKS, { variables: { filter } })

  const [makeFavoriteTask] = useMutation<
    { makeFavoriteTask: Task },
    { id: string; isFavorite: boolean }
  >(MAKE_FAVORITE_TASK, {
    update(cache, { data }) {
      const currentList = cache.readQuery<{ tasks: Task[] }>({
        query: GET_TASKS,
      })
      const findedTask = currentList?.tasks.find(
        (t) => t.id === data?.makeFavoriteTask.id
      )

      if (Boolean(currentList?.tasks.length && !!data && !!findedTask)) {
        cache.writeQuery({
          query: GET_TASKS,
          variables: {
            filter,
          },
          data: {
            tasks: [...currentList!.tasks],
          },
        })
      }
    },
  })

  function handleFavoriteTaskChange(id: string, isFavorite: boolean) {
    setLoadingFavoriteTask(id)
    makeFavoriteTask({
      variables: { id, isFavorite },
    }).finally(() => {
      setLoadingFavoriteTask(null)
    })
  }

  const [create, { loading: mutationLoading }] = useMutation<
    { createTask: Task },
    MutationcreateTaskArgs
  >(CREATE_TASKS, { onCompleted: () => refetch() })

  const [deleteMany, { loading: deleteLoading }] = useMutation<
    { deleteTasks: string[] },
    { ids: string[] }
  >(DELETE_TASKS, { onCompleted: () => refetch() })

  function onSubmit(input: CreateTaskInput) {
    create({
      variables: {
        input,
      },
    }).finally(() => {
      setOpenModal(false)
    })
  }

  function onCheckedTask(id: string, checked: boolean) {
    setCheckedTasks((prev) => {
      if (prev) {
        prev[id] = checked

        return { ...prev }
      }

      return { [id]: checked }
    })
  }

  console.log({ checkedTasks })

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Box title="Filtros">
        <ListContainer>
          <ListItem.Filter name="all" icon={<Inbox size={20} />}>
            Todos
          </ListItem.Filter>
          <ListItem.Filter name="favorites" icon={<Star size={20} />}>
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
                      <Button
                        loading={mutationLoading}
                        disabled={mutationLoading}
                      >
                        Cadastrar
                      </Button>
                    </DialogFooter>
                  }
                />
              </DialogContent>
            </Dialog>
          </>
        }
      >
        {loading || deleteLoading ? (
          <div role="status" className="w-full animate-pulse">
            <div className="mb-2 h-8 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2 h-8 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-2 h-8 rounded bg-gray-200 dark:bg-gray-700"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <ListContainer gap={2}>
            {Object.values(checkedTasks ?? {}).some((checked) => checked) && (
              <div className="flex w-full justify-end gap-2">
                <Button variant="destructive">Excluir Selecionados</Button>
                <Button variant="secondary" >Concluir Selecionados</Button>
              </div>
            )}

            {data?.tasks.map((task) => (
              <ListItem.Root
                key={task.id}
                to={routes.task({ id: task.id })}
                icon={<Star size={20} />}
                isFavorite={task.isFavorite}
                loading={loadingFavoriteTask === task.id}
                onChangeFavorite={() =>
                  handleFavoriteTaskChange(task.id, !task.isFavorite)
                }
                onChange={(checked) => onCheckedTask(task.id, checked)}
              >
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
