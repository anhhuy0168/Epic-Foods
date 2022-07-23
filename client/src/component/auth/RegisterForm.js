import React from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
const RegisterForm = () => {
  return (
    <>
    <Form className='my-4' >

    <Form.Group>
      <Form.Control type = 'text' placeholder='Email' name ='email' required 
        />
    </Form.Group>
    <Form.Group>
      <Form.Control type = 'text' placeholder='Address' name ='address' required />
    </Form.Group>
    <Form.Group>
      <Form.Control type = 'text' placeholder='Phone Number' name ='phoneNumber' required />
    </Form.Group>

    <Form.Group>
      <Form.Control type = 'text' placeholder='Username' name ='username' required />
    </Form.Group>

    <Form.Group>
      <Form.Control type = 'password' placeholder='Password' name ='password' required />
    </Form.Group>
    <Form.Group>
      <Form.Control type = 'password' placeholder='Confirm Password' name ='confirmPassword' required />
    </Form.Group>
    
    <Button variant ='success' type='submit'>Register</Button>
  </Form>

  <p>
  Already have an account ?
  <Link to ='login'>
    <Button variant='info' size='sm' className='ml-2'>Login</Button> 
  </Link>
  </p>
  </>

  )
}

export default RegisterForm