import React, { useEffect, useState } from 'react'
import api from 'api'

const RadioTracker = (props) => {
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    const res = await api.get('user')
    setUser(res.data)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUser()
    }
  }, [])

  return (
    <div>
      <p>hello {user?.id || 'world'}</p>
    </div>
  )
}

export default RadioTracker
