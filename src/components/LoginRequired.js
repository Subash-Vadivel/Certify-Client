import React from 'react'
import Header from './Header'
import Footer from './Footer'
import login from '../images/login.gif'
export default function LoginRequired() {
  return (
<>
    <Header/>
    <div className="container">
      <img src={login} alt="MetaMask Logo" className="image" />
      <h1 className="heading">Login Required</h1>
      <p className="paragraph">Please Login to access this page.</p>
    </div>
    <Footer/>
    </>  )
}
