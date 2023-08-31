import React from 'react';
import dummy from '../assets/Big_phone_with_cart.jpg';
import { Link } from 'react-router-dom';

const Featured = () => {
  return (
    <>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="text-center mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Featured Items</h1>
     
      <div className="flex mt-6 justify-center">
        <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex" />
      </div>
    </div>
    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full bg-slate-200 rounded-lg m-4">
        <a className="block relative h-40 rounded overflow-hidden">
          <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={dummy} />
        </a>
        <div className="mt-4 flex justify-between">
            <div>
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Brand</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">Product</h2>
          <p className="mt-1">$100</p>
          </div>
          <div>
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Color</h3>            
          </div>

        </div>
        </div>
    </div>
    <button><Link  className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">View More</Link></button>
  </div>
</section>

    </>
  )
}

export default Featured