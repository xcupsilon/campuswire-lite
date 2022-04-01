import React, { useState } from 'react'
import axios from 'axios' // issue HTTP request to the backend

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const createUser = async () => {
    await axios.post('/account/signup', { username, password })
    setMsg('(From Frontend) User creation succesful!')
  }

  return (
    <>
      Username:
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      Password:
      <input onChange={e => setPassword(e.target.value)} />
      <button onClick={() => createUser()} type="submit"> Submit </button>
      <p>
        {msg}
      </p>
    </>
  )
}

export default App
