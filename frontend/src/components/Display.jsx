import React from 'react'

const Display = ({ question, author, answer }) => {
  const Author = () => {
    if (author !== '') {
      return (
        <>
          <div className="font-semibold">
            Author:
          </div>
          <div className="mb-5">
            {author}
          </div>
        </>
      )
    }
    return <></>
  }

  const Answer = () => {
    if (answer !== '') {
      return (
        <>
          <div className="font-semibold">
            Answer:
          </div>
          <div>
            {answer}
          </div>
        </>
      )
    }
    return <></>
  }

  return (
    <>
      <h2 className="text-3xl font-semibold mb-5">{question}</h2>
      <Author />
      <Answer />
    </>
  )
}

export default Display
