import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// components
import AddPostModal from './AddPostModal'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [question, setQuestion] = useState('')
  const [author, setAuthor] = useState('')
  const [answer, setAnswer] = useState('')

  const [modalVisible, setModalVisible] = useState(false)

  const [loggedIn, setLoggedIn] = useState(false)

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

  const addPost = (q, au) => {
    setPosts(...posts, { q, au: '', ans: '' })
  }

  const setDisplay = (q, au, ans) => {
    setQuestion(q)
    setAuthor(au)
    setAnswer(ans)
  }

  const questionBlock = post => {
    const { q, au, ans } = post
    return <button onClick={e => setDisplay(q, au, ans)} type="button" className="p-5 bg-white">{q}</button>
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
          <button type="button" className="w-full shadow appearance-none border rounded-lg mb-3 py-4 px-8 text-lg font-semibold text-light_matcha bg-dark_matcha leading-tight">Login to submit questions</button>
        </Link>
      )
    }
    return (
      <>
        <button onClick={e => setModalVisible(true)} type="button" className="w-full shadow appearance-none border rounded-lg m-5 mb-3 py-4 px-8 ml-5 text-lg font-semibold text-light_matcha bg-dark_matcha leading-tight">Add new Questions +</button>
        <Modal />
      </>
    )
  }

  return (
    <div className="bg-matcha">
      <div className="font-bold text-5xl p-7 pl-10 shadow-md bg-light_matcha text-dark_matcha">Campuswire Lite</div>
      <div className="grid grid-cols-3 font-mono text-dark_matcha">
        <div className="col-span-1 m-5">
          <AddButton />
          <div className="flex">
            {console.log(posts)}
            {/* {posts.map(post => questionBlock(post))} */}
          </div>
        </div>
        <div className="col-span-2 m-5 ml-10 p-10 border-l-2 border-dark_matcha">
          <h2 className="text-3xl">{question}</h2>
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
