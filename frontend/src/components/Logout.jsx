import React from 'react'
import axios from 'axios'

const Logout = ({ user }) => {
  const logout = async () => {
    await axios.post('/account/logout')
      .catch(error => {
        alert(`${error.response.data}`)
      })
  }

  return (
    <span className="mt-3 float-right text-2xl font-mono text-dark_matcha">
      <span className="font-semibold">
        Hi&nbsp;
      </span>
      <span className="font-semibold">
        {user}
        !&nbsp;
      </span>
      <button onClick={e => logout()} type="submit" className="inline" aria-label="Logout">
        Logout
      </button>
    </span>
  )
}

export default Logout
