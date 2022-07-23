import React from 'react'
import LoginForm from '../../component/auth/LoginForm'
import RegisterForm from '../../component/auth/RegisterForm'
import '../auth/auth.css'
const Auth=({authRoute})=>{
    let body
  
    body =(   
        <>

    {authRoute ==='login'&&<LoginForm/>}
    {authRoute ==='register'&&<RegisterForm/>}
        </>  
    )
    return (
        <>
        <div className='landing'>
          <div className='dark-overlay'>
              <div className='landing-inner'>
              <h1>Epic Foods</h1>
                <h4>Bring best foods for you !</h4>
            {body}
              </div>
          </div>
        </div>
        </>

          
        )
}



export default Auth