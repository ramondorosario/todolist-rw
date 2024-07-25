import { ReactNode } from 'react'

type ListContainerProps = {
  children: ReactNode,
	gap?: number
}

export const ListContainer = ({ children, gap }: ListContainerProps) => {
  return <ul className={`flex flex-col w-full ${gap ? "gap-" + gap : ""}`} >{children}</ul>
}
