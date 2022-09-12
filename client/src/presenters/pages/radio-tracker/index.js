import React from 'react'
import { useQuery } from 'react-query'
import api from 'api'

const RadioTracker = () => {
  const { data /*status, error, isLoading*/ } = useQuery(
    `settings`,
    async () => {
      const result = await api.get('version')
      return result.data
    }
  )

  return (
    <div>
      <p>hello {data?.version || 'world'}</p>
    </div>
  )
}

export default RadioTracker
