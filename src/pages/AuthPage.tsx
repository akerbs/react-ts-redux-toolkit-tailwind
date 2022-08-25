import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../hook/input';
import { useAppDispatch } from '../hook/redux';
import { login, register } from '../store/actions/authActions';

export function AuthPage() {
  const username = useInput('')
  const password = useInput('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const isFormValid = () => username.value && password.value

  const loginHandler = () => {
    if(isFormValid()) {
      dispatch(login({username: username.value, password: password.value})).then(() => {
        navigate('/')
      })
     } else{  
      alert('INVALIDE FORM, PLEASE CHANGE')
    }
  }

  const submitHandler = async (event: React.FormEvent) => {
    try {
    event.preventDefault()
      
    if(isFormValid()) {
      await dispatch(
        register({username: username.value, password: password.value}))
        navigate('/')
     } else{  
      alert('INVALIDE FORM, PLEASE CHANGE')
    }
    } catch (e) {
      
    }

  }

  return (
    <form 
      className='container mx-auto max-w-[500px] pt-8'
      onSubmit={submitHandler}
    >
      <div className='mb-2'>
        <label htmlFor="username" className='block'>UserName</label>
        <input type="text" {...username} id="username" className='border py-1 px-2 w-full' />
      </div>

      <div className='mb-2'>
        <label htmlFor="password" className='block'>Password</label>
        <input type="text" {...password} id="password" className='border py-1 px-2 w-full' />
      </div>

      <button className='py-2 px-4 bg-blue-700 border text-white' type='submit'>Register</button>
      <button onClick={loginHandler} className='py-2 px-4 bg-green-700 border text-white' type='button'>Login</button>
      
    </form>
  )
}