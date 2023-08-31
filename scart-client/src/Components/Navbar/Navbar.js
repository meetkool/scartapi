import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import menu from '../../assets/menu-icon.webp'
import axios from 'axios'

const Navbar = () => {
  const cartItems = useSelector(store => store.cart.cnt)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://scart-xebia.onrender.com/logout");

      // If logout was successful, remove the user from local storage
      if (response.data.message === 'Logged out') {
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to logout user", error);
    }
  };

  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-10'>
      <div className='md:flex items-center justify-between bg-gray-100 py-4 md:px-10 px-7'>
        <div className='font-bold text-4xl cursor-pointer flex items-center
        text-gray-800'>
          ShopIT!
        </div>

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden '>
          <img src={menu} className='w-6' alt='menu' />
        </div>

        <ul className={`md:flex md:space-x-12 md:items-center md:pb-0 pb-4 absolute md:static bg-gray-100 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-6 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
          <li key="home" className='md:ml-8 text-xl md:my-0 my-7' onClick={() => setOpen(!open)}>
            <Link to="/home" className='text-gray-800 hover:text-blue-400'>Home</Link>
          </li>
          <li key="products" className='md:ml-8 text-xl md:my-0 my-7' onClick={() => setOpen(!open)}>
            <Link to="/products" className='text-gray-800 hover:text-blue-400'>Products</Link>
          </li>
          {localStorage.getItem("user") ? <>
            <li key="cart" className='md:ml-8 text-xl md:my-0 my-7 flex' onClick={() => setOpen(!open)}>
              <Link to="./cart" className='text-gray-800 hover:text-blue-400'>Cart</Link>
              <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-md text-white mt-1 ml-2"> {cartItems}</p>
            </li>
            <li key="products" className='md:ml-8 text-xl md:my-0 my-7 cursor-pointer hover:text-blue-400' onClick={handleLogout}>
              Logout
            </li></> :
            <li key="products" className='md:ml-8 text-xl md:my-0 my-7 cursor-pointer hover:text-blue-400'>
              <Link to="/login">Login</Link>
            </li>
          }


        </ul>
      </div>
    </div>



    // return (        
    //         <nav className='flex justify-between text-lg font-medium  shadow-md py-2 sticky top-0 bg-white'>
    //             <p className='m-3 text-4xl font-bold'>ShopIT!</p>
    //             <ul className='px-28 py-4 flex space-x-8 justify-end'>
    //                 <li><Link to={'/'}>Home</Link></li>
    //                 <li>Offers</li>                    
    //                 <li className="flex">   
    //                 <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-md text-white mt-0.5 mr-2"> {cartItems}</p>                                         
    //                 <Link to={'./cart'}>Cart</Link>                               
    //                 </li>
    //             </ul>
    //         </nav>

    // )
  )
}

export default Navbar
