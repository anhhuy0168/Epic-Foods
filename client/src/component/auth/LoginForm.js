import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'


const LoginForm = () => {
  //alet
  const [alert, setAlert] = useState(null)
  //context
  const{loginUser}= useContext(AuthContext)

  // router
  const history = useHistory()

  //loacal state
  const [loginForm, setLoginForm] = useState({
    
    username:'',
    password:''
  })
  const {username , password} =loginForm
  const onChangeLoginForm = event => setLoginForm({...loginForm,[event.target.name]:event.target.value})
  const login = async event =>{
    event.preventDefault()
    try{
      const loginData = await loginUser(loginForm)
      if(!loginData.success){
        setAlert({ type: 'danger', message: 'Incorect Passwords or User Name' })
        setTimeout(() => setAlert(null), 5000)
      }
      if(loginData.success){
        history.push('/homepage')
      }
      else{}
    }
    catch(err){
      console.log(err)
    }
  
  }
  //
  

  return (
    <>
      <Form className='my-4' onSubmit={login}>
 
      <Form.Group>
        <Form.Control type = 'text' placeholder='Username' name ='username' required value={username} onChange={onChangeLoginForm}/>
      </Form.Group>

      <Form.Group>
        <Form.Control type = 'password' placeholder='Password' name ='password' required value={password} onChange={onChangeLoginForm}/>
      </Form.Group>
      <Button variant ='success' type='submit'>Login</Button>
    </Form>
      
    <p>
    Don't have an account ?
    <Link to ='register'>
      <Button variant='info' size='sm' className='ml-2'>Register</Button> 
    </Link>
    </p>
    </>
  
  )
}

export default LoginForm