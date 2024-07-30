import { endOfDay, endOfWeek, startOfDay, startOfWeek } from 'date-fns'
import { db } from 'src/lib/db'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

type GetTaskFilter = 'favorites' | 'today' | 'weekly' | 'all'

type GetTasksProps = {
  filter?: GetTaskFilter
}

export const tasks: QueryResolvers['tasks'] = ({ filter }: GetTasksProps) => {
  switch (filter) {
    case 'today': {
      const todayStart = startOfDay(new Date())
      const todayEnd = endOfDay(new Date())

      return db.task.findMany({
        where: {
          dueDate: {
            gte: todayStart,
            lte: todayEnd,
          },
          isCompleted: false,
        },
      })
    }
    case 'weekly': {
      const weeklyStart = startOfWeek(new Date(), { weekStartsOn: 1 })
      const weeklyEnd = endOfWeek(new Date(), { weekStartsOn: 1 })

      return db.task.findMany({
        where: {
          dueDate: {
            gte: weeklyStart,
            lte: weeklyEnd,
          },
          isCompleted: false,
        },
      })
    }
    case 'favorites':
      return db.task.findMany({
        where: { isFavorite: true, isCompleted: false },
      })
    default:
      return db.task.findMany({
        where: { isCompleted: false },
      })
  }
}

export const task: QueryResolvers['task'] = ({ id }) => {
  return db.task.findUnique({ where: { id } })
}

export const createTask: MutationResolvers['createTask'] = ({ input }) => {
  return db.task.create({ data: input })
}

export const updateTask: MutationResolvers['updateTask'] = ({ id, input }) => {
  return db.task.update({ where: { id }, data: input })
}

export const deleteTasks: MutationResolvers['deleteTasks'] = async ({
  ids,
}) => {
  await db.task.deleteMany({ where: { id: { in: ids } } })

  return ids
}

export const makeFavoriteTask: MutationResolvers['makeFavoriteTask'] = async ({
  id,
  isFavorite,
}) => {
  return db.task.update({
    where: { id, isCompleted: false },
    data: { isFavorite },
  })
}

export const completeTasks: MutationResolvers['completeTasks'] = async ({
  ids,
}) => {
  await db.task.updateMany({
    where: { id: { in: ids } },
    data: { isCompleted: true },
  })

  return ids
}
