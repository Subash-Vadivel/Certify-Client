import React from 'react'
import { useAuth } from '../Authentication'
import LoginRequired from '../components/LoginRequired';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Certificates() {

    const auth=useAuth();
  if(!auth.user){
    return <LoginRequired/>
  }
  return (
    <>
    <Header/>
    <div>Certificates</div>
    <Footer/>
    </>
  )
}
