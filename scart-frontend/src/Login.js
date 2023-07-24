import React from 'react'

const Login = () => {
  return (
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary '>
        <div className='40-w p-5 rounded bg-white'>
           <form>
            <h3>Log In</h3>
            <div className='mb-2'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Enter Email' className='form-control'/>
            </div>
            <div className='mb-2'>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Enter Password' className='form-control'/>
            </div>
            <div className='mb-2'>
                <input type="checkbox" className='custom-control custom-checkbox' id='check'/>
                <label htmlFor="check" className='custom-input-label'>
                    Remember Me
                </label>
            </div>
            <div className='d-grid'>
                 <button className='btn btn-primary'>Log In</button>
            </div>
            
           </form>
        </div>  
    </div>
  )
}

export default Login