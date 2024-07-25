import { useLocation } from '@redwoodjs/router'

export type ListFilterItemType = 'all' | 'today' | 'week' | 'favorite'

const listFilterItemType: { [key: string]: ListFilterItemType } = {
  ALL: 'all',
  TODAY: 'today',
  WEEK: 'week',
  FAVORITE: 'favorite',
}

export function getQueryParams(queryString: string): ListFilterItemType | null {
  const { search } = useLocation()

  const filter = new URLSearchParams(search).get(queryString)

  if (!filter) return null

  return listFilterItemType[filter?.toUpperCase()] ?? null;
}
