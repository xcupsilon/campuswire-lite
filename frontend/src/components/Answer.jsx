import React, { useState } from 'react'

import axios from 'axios'

const Answer = ({ _id, renderAnswer }) => {
  const [ans, setAns] = useState('')

  const answerPost = async () => {
    await axios.post('/api/questions/answer', { _id, answer: ans })
      .then(() => {
        setAns('')
        renderAnswer(ans)
      })
      .catch(error => {
        alert(`${error.response.data}`)
      })
  }

  return (
    <div className="mt-20">
      <div>
        Answer this question:
      </div>
      <div className="mb-4">
        <textarea onChange={e => setAns(e.target.value)} value={ans} className="form-control w-full h-36 mt-3 shadow border rounded-lg py-2 px-3 text-black text-base leading-tight focus:outline-none focus:shadow-outline focus:border-greentea" id="answer" type="text" />
      </div>
      <button onClick={e => answerPost()} type="button" className="w-full shadow first-letter:appearance-none border rounded-lg py-4 px-8 text-lg font-semibold text-light_matcha bg-dark_matcha leading-tight">Submit Answer</button>
    </div>
  )
}

export default Answer
