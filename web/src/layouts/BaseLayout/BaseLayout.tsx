import { Avatar } from '@/components/Avatar/Avatar'

type BaseLayoutProps = {
  children?: React.ReactNode
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center p-10">
      <div className="flex h-full w-full flex-col gap-6 rounded bg-mauve-1 p-14">
        <header className="flex items-center justify-between">
          <h2 className="text-5xl">
            task<span className="text-tomato-9">flow.</span>
          </h2>

          <div className='flex gap-2 items-center' >
            <p>Ramon do Rosário</p>
            <Avatar />
          </div>
        </header>

        <div className="grid h-full w-full grid-cols-[320px,1fr] gap-8">
          {children}
        </div>
      </div>
    </div>
  )
}
