import { ReactNode, useState } from 'react'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { Link, NavLink, routes, useLocation } from '@redwoodjs/router'
import { getQueryParams, ListFilterItemType } from '@/utils/getQueryParams'
import { parseSearch } from '@redwoodjs/router'

type ListItemProps = {
  isFavorite?: boolean
  children: ReactNode
  defaulCheched?: boolean
  icon?: ReactNode
  onChange?(value: boolean): void
}

const ListItemComponent = ({
  children,
  defaulCheched = false,
  isFavorite = false,
  icon,
  onChange,
}: ListItemProps) => {
  const [favorite, setFavorite] = useState<boolean>(isFavorite);

  return (
    <li className="list-none">
      <Link
        to="#"
        className="rouded flex w-full items-center justify-between gap-1 rounded bg-mauve-6 px-2 py-1 transition-colors duration-200 hover:cursor-pointer hover:bg-mauve-7"
      >
        <div className="flex items-center gap-2">
          <Checkbox
            defaultChecked={defaulCheched}
            onChange={(value) => onChange?.(value)}
          />
          <span>{children}</span>
        </div>

        {icon && (
          <button
            className={`${
              favorite ? 'text-tomato-9' : 'text-current'
            } pointer-events-`}
            onClick={(e) => {
              e.stopPropagation()
              setFavorite(!favorite)
            }}
          >
            {icon}
          </button>
        )}
      </Link>
    </li>
  )
}

const ListFilterItem = ({
  children,
  icon,
  name,
}: Pick<ListItemProps, 'children' | 'icon'> & { name: ListFilterItemType }) => {
  const filter = getQueryParams('filter');

  return (
    <li className="list-none">
      <NavLink
        to={routes.home({ filter: name })}
        activeClassName="bg-mauve-7"
        activeMatchParams={[{ filter: name }]}
        className={`rouded flex w-full items-center gap-2 rounded px-2 py-1 transition-colors duration-200 hover:cursor-pointer hover:bg-mauve-7 ${
          !filter && name === 'all' ? 'bg-mauve-7' : ''
        } `}
      >
        {icon}
        <span>{children}</span>
      </NavLink>
    </li>
  )
}

export const ListItem = {
  Root: ListItemComponent,
  Filter: ListFilterItem,
}
