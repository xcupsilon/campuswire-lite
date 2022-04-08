import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// components
import AddPostModal from './AddPostModal'
import Display from './Display'
import Logout from './Logout'
import Answer from './Answer'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [question, setQuestion] = useState('')
  const [author, setAuthor] = useState('')
  const [answer, setAnswer] = useState('')
  const [id, setId] = useState('')

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')

  const [modalVisible, setModalVisible] = useState(false)

  const [questionSelected, setQuestionSelected] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      const { data } = (await axios.get('/api/questions'))
      setPosts(data)
    }

    const checkLoginStatus = async () => {
      const { data } = (await axios.get('/account/status'))
      const { username, status } = data
      setLoggedIn(status)
      if (status) {
        setUser(username)
      }
    }

    getPosts()
    checkLoginStatus()
    const intervalID = setInterval(() => {
      getPosts()
      checkLoginStatus()
    }, 2000)

    return () => clearInterval(intervalID)
  }, [])

  // Function that rerenders the display based on the question we select
  const setDisplay = (q, au, ans) => {
    setQuestion(q)
    setAuthor(au)
    setAnswer(ans)
  }

  // Functional component that renders one of the question block in the question lists
  const QuestionBlock = ({ post }) => {
    const onSubmit = (q, au, ans, postId) => {
      setDisplay(q, au, ans)
      setQuestionSelected(true)
      setId(postId)
    }

    const {
      questionText: q, author: au, answer: ans, _id: postId,
    } = post
    return (
      <div>
        <button onClick={e => onSubmit(q, au, ans, postId)} type="button" className="ml-5 p-3 px-4 bg-white w-full text-black text-left shadow-md rounded">{q}</button>
      </div>
    )
  }

  // Pop-up modal used for adding new questions
  const Modal = () => {
    if (modalVisible) {
      return <AddPostModal setModalVisible={setModalVisible} />
    }
    return <></>
  }

  // Button used to add new question or direct user to log in if they have not
  const AddButton = () => {
    if (!loggedIn) {
      return (
        <Link to="/login">
          <button type="button" className="w-full shadow appearance-none border rounded-lg m-5 mb-5 py-4 px-8 text-lg font-semibold text-light_matcha bg-dark_matcha leading-tight">Login to submit questions</button>
        </Link>
      )
    }
    return (
      <>
        <button onClick={e => setModalVisible(true)} type="button" className="w-full shadow first-letter:appearance-none border rounded-lg m-5 mb-5 py-4 px-8 ml-5 text-lg font-semibold text-light_matcha bg-dark_matcha leading-tight">Add new Questions +</button>
      </>
    )
  }

  return (
    <div className="bg-light_matcha w-screen h-screen">
      <div className="p-7 pl-10 h-28 shadow-md bg-white">
        <span className="font-bold text-5xl text-dark_matcha float-left">Campuswire Lite</span>
        {
          loggedIn && (
            <Logout user={user} />
          )
        }
      </div>
      <div className="grid grid-cols-3 font-mono text-dark_matcha">
        <div className="col-span-1 m-5">
          <AddButton />
          <Modal />
          <div className="flex flex-col gap-3">
            {posts.map(post => {
              const { _id } = post
              return <QuestionBlock post={post} key={_id} />
            })}
          </div>
        </div>
        <div className="col-span-2 m-5 ml-10 pl-10 pt-5 border-l-2 border-dark_matcha">
          <Display question={question} author={author} answer={answer} />
          {
            loggedIn && questionSelected && (
              <Answer _id={id} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home
