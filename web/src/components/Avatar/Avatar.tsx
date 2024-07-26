import {
  Avatar as ShadAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

export const Avatar = () => {
  return (
    <ShadAvatar>
      <AvatarImage src="https://github.com/ramondorosario.png" alt="ramondorosario" />
      <AvatarFallback>CN</AvatarFallback>
    </ShadAvatar>
  )
}
