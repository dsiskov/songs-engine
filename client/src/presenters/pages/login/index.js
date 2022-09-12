import React from 'react'
import api from 'api'

const mockUser = {
  username: 'user1',
  password: '1resu'
}

const Login = () => {
  const onSignUp = async () => {
    const res = await api.post('auth/signup', mockUser)
    console.log(res.data)
  }

  return (
    <div>
      <input type="button" value={'sign-up'} id="name" onClick={onSignUp} />
    </div>
  )
}

export default Login
