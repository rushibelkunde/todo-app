import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CategoryForm = ({token, categories, setCategories}) => {

    const Url = "https://todo-app-rho-three-59.vercel.app"
  // const Url = "http://localhost:5000"

  const [categoryName, setcategoryName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [deleteDialog, setDeleteDialog] = useState(false)

    const handleAddcategory = (e)=>{
        e.preventDefault()
        axios.post(`${Url}/addCategory`, { categoryName, displayName }, {
            headers: {
              Authorization: `${token}`,
            },
          })
            .then(response => {
              console.log(response.data.message);
              fetchCategories()

            })
            .catch(error => {
              console.error('Error adding category:', error);
            });
    }

    const fetchCategories = () => {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to retrieve categories
      axios.get(`${Url}/categories`,{
        headers:{
          Authorization: token
        }
      })
        .then(response => {
          console.log(response.data)
          setCategories(response.data);
          // setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
          // setLoading(false);
        });
    };

    const deleteCategory = (id)=>{

      setCategories(categories.filter((category)=> id !== category.id))
      axios.delete(`${Url}/deleteCategory/${id}`,{
        headers:{
          Authorization: token
        }
      })
       .then(response => {
          console.log(response.data)
          // setLoading(false);
        })
        .catch(error => {
          console.error('Error Deleting categories:', error);
          // setLoading(false);
        });

    }

    useEffect(()=>{
      fetchCategories()
    },[])
  return (
    <div className='w-60  absolute left-1/2 translate-x-[-50%] bg-slate-400 p-3 rounded-xl z-50'>
        <form method='POST' className='flex flex-col gap-2'>
        <input type="text" name='category_name' placeholder='category_name' value={categoryName} 
        onChange={(e)=>setcategoryName(e.target.value)} className='p-2 bg-slate-100 rounded-xl'/>

        <input type="text" name='display_name' placeholder='display_name' value={displayName} 
        onChange={(e)=>setDisplayName(e.target.value)} className='p-2 bg-slate-100 rounded-xl' />

        <button type="submit" onClick={handleAddcategory}
         className='bg-black p-2 rounded-xl text-white font-semibold'>Create category</button>

        </form>

        <ul className='mt-2'>
          <h1 className='text-center font-semibold text-black'>Categories</h1>
        {categories.map((category)=>(
          <li className='p-2 bg-slate-100 flex flex-col  mt-2 rounded-xl'>
            <div className='flex justify-around items-center'>
            <span>{category.category_name}</span>

            {deleteDialog== category.id? "" :  <button onClick={()=> setDeleteDialog(category.id)}>X</button> }
           
            </div>
            {deleteDialog == category.id? 
            <div className='flex flex-col bg-gray-700 text-white p-2 gap-2 rounded-xl'>
            <p>
              if you delete this category all todos of this category will be deleted !!!
            </p>
            <div className='flex justify-around'>
            <button onClick={()=>deleteCategory(category.id)} 
            className='p-2 bg-red-500 text-white font-semibold rounded-xl'>Confirm</button>
              <button onClick={()=> setDeleteDialog(false)}
              className='p-2 bg-black text-white font-semibold rounded-xl'>Cancel</button>
            </div>
            </div>
            : 
            ""}
          </li>
        ))}
         
        
        </ul>


    </div>
  )
}

export default CategoryForm