import { Router, Route, Set, PrivateSet } from '@redwoodjs/router'
import { BaseLayout } from '@/layouts/BaseLayout/BaseLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={BaseLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <PrivateSet unauthenticated="login">
          <Route path="/home" page={HomePage} name="home" />
          <Route path="/task/{id}" page={TaskPage} name="task" />
        </PrivateSet>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
