import React from 'react'

import { Link } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Welcome to Home</h1>
    <Link to="/signup" className="text-2xl inline"> Sign up</Link>
    <Link to="/login" className="text-2xl inline"> Log in here!</Link>
    {/* <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes> */}
  </div>
)

export default Home
