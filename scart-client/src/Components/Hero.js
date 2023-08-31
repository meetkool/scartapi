import React from 'react';
import '../utils/css/hero.css'
import phone from '../assets/Big_phone_with_cart.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (    
    <>
       <section className="text-gray-600 body-font">
        <div className=" mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:p-16 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="sm:text-6xl text-3xl mb-4 font-bold text-gray-800 tracking-wide">
              <span className='text-blue-600'>Order items</span> with the click of a button!
            </h1>
            <p className="mb-8 leading-relaxed">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Explore</button>
              
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src={phone} />
          </div>
        </div>
      </section>


    </>
  )
}

export default Hero