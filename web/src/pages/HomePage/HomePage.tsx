import { Box } from '@/components/Box/Box'
import { Button } from '@/components/Button/Button'
import { ListContainer } from '@/components/ListContainer/ListContainer'
import { ListItem } from '@/components/ListItem/ListItem'
import { Metadata } from '@redwoodjs/web'
import { CalendarCheck, CalendarDays, Inbox, Star } from 'lucide-react'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Box title='Filtros' >
        <ListContainer>
          <ListItem.Filter name='all' icon={<Inbox size={20} />}>Todos</ListItem.Filter>
          <ListItem.Filter name='favorite' icon={<Star size={20} />} >Favoritos</ListItem.Filter>
          <ListItem.Filter name='today' icon={<CalendarCheck size={20} />} >Hoje</ListItem.Filter>
          <ListItem.Filter name='week' icon={<CalendarDays size={20} />}>Semana</ListItem.Filter>
        </ListContainer>
      </Box>

      <Box title='Tasks' footer={<Button>Adicionar</Button>}>
        <ListContainer gap={2} >
          <ListItem.Root icon={<Star size={20} />}>Minha primeira tarefa</ListItem.Root>
          <ListItem.Root icon={<Star size={20} />}>Minha segunda tarefa</ListItem.Root>
          <ListItem.Root icon={<Star size={20} />}>Minha terceira tarefa</ListItem.Root>
        </ListContainer>
      </Box>
    </>
  )
}

export default HomePage
