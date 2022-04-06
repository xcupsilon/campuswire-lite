import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState('')
  const [author, setAuthor] = useState('')
  const [answer, setAnswer] = useState('')

  const [loggedIn, setLoggedIn] = useState(false)

  const AddQuestion = () => {
    if (!loggedIn) {
      return (
        <Link to="/login">
          <button type="button" className="w-full shadow appearance-none border rounded-lg m-5 mb-3 py-4 px-8 ml-5 text-xl font-semibold text-light_matcha bg-dark_matcha text-base leading-tight">Login to submit questions</button>
        </Link>
      )
    }
    return (
      <button type="button" className="w-full shadow appearance-none border rounded-lg m-5 mb-3 py-4 px-8 ml-5 text-xl font-semibold text-light_matcha bg-dark_matcha text-base leading-tight">Add new Questions +</button>
    )
  }

  return (
    <div className="bg-matcha">
      <div className="font-bold text-5xl p-7 pl-10 border-1 shadow-md bg-light_matcha text-dark_matcha">Campuswire Lite</div>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <AddQuestion />
          <div className="flex">questions</div>
        </div>
        <div className="col-span-2">
          <h2>{question}</h2>
          <div>
            Author:
          </div>
          <div>
            {author}
          </div>
          <div>
            Answer:
          </div>
          <div>
            {answer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
