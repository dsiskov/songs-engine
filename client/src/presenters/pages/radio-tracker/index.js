import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import api from 'api'

const RadioTracker = (props) => {
  const { data, status, error, isLoading } = useQuery(`settings`, async () => {
    const result = await api.get('settings')
    return result.data
  })

  return (
    <div>
      <p>hello {data?.exampleText || 'world'}</p>
    </div>
  )
}

export default RadioTracker
