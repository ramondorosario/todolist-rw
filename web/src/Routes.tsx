import { Router, Route, Set } from '@redwoodjs/router'
import { BaseLayout } from '@/layouts/BaseLayout/BaseLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={BaseLayout}>
        <Route path="/home" page={HomePage} name="home" />
        <Route path="/task/{id}" page={TaskPage} name="task" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
