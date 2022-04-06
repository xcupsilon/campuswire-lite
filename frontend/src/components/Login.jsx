import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
          <button type="submit" className="w-20 shadow appearance-none border rounded-lg py-2 px-3 text-orange-700 bg-orange-200 text-base leading-tight">
            Log In
          </button>
          <h2 className="text-red-300 text-2xl inline">Don&apos;t have an account?</h2>
          <Link to="/signup" className="text-2xl inline"> Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
