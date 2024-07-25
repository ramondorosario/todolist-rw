type BaseLayoutProps = {
  children?: React.ReactNode
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="flex h-full max-w-7xl w-full flex-col items-center justify-center mx-auto p-10">
      <div className="flex w-full h-full flex-col gap-6 rounded bg-mauve-1 p-14">
        <header className="flex justify-between items-center">
          <h2 className="text-5xl">
            task<span className="text-tomato-9">flow.</span>
          </h2>

          <p>Ramon do Rosário</p>
        </header>

        <div className="grid grid-cols-[320px,1fr] gap-8 h-full w-full">{children}</div>
      </div>
    </div>
  )
}
