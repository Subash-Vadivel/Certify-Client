import React from 'react'
import { useAuth } from '../Authentication'
import LoginRequired from '../components/LoginRequired';
export default function Certificates() {

    const auth=useAuth();
  if(!auth.user){
    return <LoginRequired/>
  }
  return (
    <div>Certificates</div>
  )
}
