import React, { useState } from 'react'
import LoginButton from './LoginButton'

const Main = () => {
  const [questions, setQuestions] = useState([])

  return (
    <>
      <div>header</div>
      <div className="grid">
        <div>
          <LoginButton />
          <div className="flex">questions</div>
        </div>
        <div>
          Question Display
        </div>
      </div>
    </>
  )
}

export default Main
