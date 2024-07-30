import { ReactNode } from 'react'

type ListContainerProps = {
  children: ReactNode
  gap?: number
}

export const ListContainer = ({ children, gap }: ListContainerProps) => {
  return (
    <ul
      className={`flex w-full md:max-h-[232px] lg:max-h-[540px] flex-col overflow-auto ${
        gap ? 'gap-' + gap : ''
      }`}
    >
      {children}
    </ul>
  )
}
