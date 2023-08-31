import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../../utils/Slices/CartSlice';


const Card = ({ product }) => {
    const dispatch = useDispatch();
    const items = useSelector(store => store.cart.items);

    const handleAdd = (product) => {
        dispatch(addItem(product));
        // console.log(product);
        
    }
    const handleDelete = (product) => {
        dispatch(deleteItem(product));
    }

    return (

        <div className="lg:w-1/4 md:w-1/2 p-4 w-full z-0">
            <div className="block relative h-40 rounded overflow-hidden">
                <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={product.image} />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.brand}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                    <p className="mt-1">{product.price}</p>
                </div>
                <div>
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.color}</h3>
                </div>

            </div>
            {items.find(item=>item.id===product.id)? <button className="flex items-center justify-center rounded-md bg-red-500 px-5 py-2.5 my-2.5 text-center text-sm font-medium text-white hover:bg-red-700 w-full"
                onClick={
                    () => handleDelete(product)
                }>
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Remove from cart
            </button> : <button className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 my-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 w-full"
                onClick={
                    () => handleAdd(product)
                }>
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to cart
            </button>
            }
        </div>

    )
}

export default Card;
