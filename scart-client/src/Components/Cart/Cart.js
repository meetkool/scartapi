import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearCart, deleteItem } from '../../utils/Slices/CartSlice';
import delBin from '../../assets/delete.png'


const Cart = () => {

  const items = useSelector(store => store.cart.items);
  console.log(items);

  const dispatch = useDispatch();
  const clearItems = () => dispatch(clearCart());
  const handleDelete = (product) => {
    dispatch(deleteItem(product));
  }

  return (
    <>
    <div class="flex flex-col my-32">
  <div class="overflow-x-auto sm:-mx-6 lg:mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium bg-black text-white dark:border-neutral-500">
          <tr>
            <th className='px-3 py-3 text-center'>Image</th>
            <th className='px-3 py-3 text-center'>Product Title</th>
            {/* <th className='px-6 py-3'>Color</th> */}
            <th className='px-3 py-3 text-center'>Price</th>
            <th className='px-3 py-3 text-center'>Delete</th>
          </tr>
          </thead>
          <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td className='px-3 py-3 text-center'><img src={item.image} className='w-10' alt={item.id} /></td>
                <td className='px-3 py-3 text-center font-medium text-gray-900 whitespace-nowrap'>{item.title}</td>
                {/* <td className='px-6 py-3'>{item.color}</td> */}
                <td className='px-3 py-3 text-center'>${item.price}</td>
                <td className='px-3 py-3 text-center' onClick={() => handleDelete(item)}><img src={delBin} className='w-8 cursor-pointer' alt='delete' /></td>
              </tr>);
          })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
     
      {items !== [] ? <button className="flex items-center justify-center rounded-md float-right bg-slate-900 px-5 py-2.5 my-2.5 mr-10 text-center text-sm font-medium text-white hover:bg-gray-700 " onClick={clearItems}>
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Clear Cart
      </button> : ('')}
    </>
  )
}


export default Cart