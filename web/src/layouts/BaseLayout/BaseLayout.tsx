import { useAuth } from '@/auth'
import { Avatar } from '@/components/Avatar/Avatar'
import { LogOut } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type BaseLayoutProps = {
  children?: React.ReactNode
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center p-10">
      <div className="flex h-full w-full flex-col gap-6 rounded bg-mauve-1 p-14">
        <header className="flex items-center justify-between">
          <h2 className="text-5xl">
            task<span className="text-tomato-9">flow.</span>
          </h2>

          {isAuthenticated && (
            <div className="flex items-center gap-2">
              <p>{currentUser?.name}</p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <Avatar />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={logOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </header>

        <div className="grid h-full w-full grid-cols-[320px,1fr] gap-8">
          {children}
        </div>
      </div>
    </div>
  )
}
