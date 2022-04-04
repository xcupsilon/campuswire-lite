import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const createUser = async () => {
    await axios.post('/account/signup', { username, password })
    setMsg('(From Frontend) User creation succesful!')
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="flex bg-red-100 w-3/4 h-4/6 p-20 rounded-3xl shadow-lg">
        <div className="justify-start">
          <h1 className="text-red-600 font-semibold text-7xl font-mono">Welcome!</h1>
          <div className="mb-4">
            <input onChange={e => setUsername(e.target.value)} value={username} className="w-80 shadow border rounded-lg py-2 px-3 mt-10 text-black text-base leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="email" type="text" placeholder="Username" />
          </div>
          <div className="mb-4">
            <input onChange={e => setPassword(e.target.value)} value={password} className="w-80 shadow border rounded-lg py-2 px-3 text-black text-base leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="password" type="text" placeholder="Password" />
          </div>
          <button onClick={() => createUser()} type="submit" className="w-20 shadow appearance-none border rounded-lg py-2 px-3 text-orange-700 bg-orange-200 text-base leading-tight">
            Sign Up
          </button>
          <p>
            {msg}
          </p>
          <h2 className="text-red-300 text-2xl inline">Already have an account?</h2>
          <Link to="/login" className="text-2xl inline"> Log in here!</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
