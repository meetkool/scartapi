import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { updateCat } from '../utils/Slices/CategorySlice';

const FilterBar = () => {
    const [categories,setCategories]=useState([]);    

    useEffect(() => {
      axios.get('https://dummyjson.com/products/categories')
      .then((res)=>setCategories(res.data));
    },[])

    const dispatch=useDispatch();
    const handleCat=(category)=>{
      dispatch(updateCat(category));
    }
    
  return (
    <div className='flex flex-row gap-x-5 flex-wrap p-5'>
        {categories.map((cat,ind)=>{
        return (
            <p className='bg-slate-300 px-3 py-1 rounded-full mx-auto my-1' onClick={()=>handleCat(cat)} key={ind}>{cat}</p>
            );
            
        })}
    </div>
  )
}

export default FilterBar