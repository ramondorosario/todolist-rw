import { ReactNode } from 'react'

type BoxProps = {
  title?: string
  action?: ReactNode
  children: ReactNode
  footer?: ReactNode
  className?: string
  orientation?: 'vertical' | 'horizontal'
}
export const Box = ({
  title,
  action,
  children,
  className,
  footer,
}: BoxProps) => {
  return (
    <div
      className={`flex w-full flex-col  items-end justify-between rounded bg-mauve-3 p-5 text-white ${className}`}
    >
      <div className=" w-full h-full">
        {(title || action) && (
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3>{title}</h3>
            <div>{action}</div>
          </div>
        )}

        <div className={`flex h-full w-full flex-col gap-8`}>{children}</div>
      </div>

      {footer && <footer>{footer}</footer>}
    </div>
  )
}
