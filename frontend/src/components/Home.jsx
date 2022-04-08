import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// components
import AddPostModal from './AddPostModal'
import Display from './Display'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [question, setQuestion] = useState('')
  const [author, setAuthor] = useState('')
  const [answer, setAnswer] = useState('')

  const [loggedIn, setLoggedIn] = useState(false)

  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      const { data } = (await axios.get('/api/questions'))
      const ps = data
      setPosts(ps)
    }

    const checkLoginStatus = async () => {
      const { data } = (await axios.get('/account/status'))
      const li = data
      setLoggedIn(li)
    }

    getPosts()
    checkLoginStatus()
  }, [])

  const addPost = q => {
    setPosts(...posts, { questionText: q })
  }

  const setDisplay = (q, au, ans) => {
    setQuestion(q)
    setAuthor(au)
    setAnswer(ans)
  }

  const QuestionBlock = ({ post }) => {
    const { questionText: q, author: au, answer: ans } = post
    return (
      <div>
        <button onClick={e => setDisplay(q, au, ans)} type="button" className="ml-5 p-3 px-4 bg-white w-full text-black text-left shadow-md rounded">{q}</button>
      </div>
    )
  }

  const Modal = () => {
    if (modalVisible) {
      return (<AddPostModal setModalVisible={setModalVisible} addPost={addPost} />)
    }
    return <></>
  }

  const AddButton = () => {
    if (!loggedIn) {
      return (
        <Link to="/login">
          <button type="button" className="w-full shadow appearance-none border rounded-lg mb-5 py-4 px-8 text-lg font-semibold text-light_matcha bg-dark_matcha leading-tight">Login to submit questions</button>
        </Link>
      )
    }
    return (
      <>
        <button onClick={e => setModalVisible(true)} type="button" className="w-full shadow first-letter:appearance-none border rounded-lg m-5 mb-5 py-4 px-8 ml-5 text-lg font-semibold text-light_matcha bg-dark_matcha leading-tight">Add new Questions +</button>
        <Modal />
      </>
    )
  }

  return (
    <div className="bg-light_matcha w-screen h-screen">
      <div className="font-bold text-5xl p-7 pl-10 shadow-md bg-white text-dark_matcha">Campuswire Lite</div>
      <div className="grid grid-cols-3 font-mono text-dark_matcha">
        <div className="col-span-1 m-5">
          <AddButton />
          <div className="flex flex-col gap-3">
            {posts.map(post => {
              const { _id } = post
              return <QuestionBlock post={post} key={_id} />
            })}
          </div>
        </div>
        <div className="col-span-2 m-5 ml-10 pl-10 pt-5 border-l-2 border-dark_matcha">
          <Display question={question} author={author} answer={answer} />
        </div>
      </div>
    </div>
  )
}

export default Home
