import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCategory } from '../../../../services/CategoryService'
import { useSelector, useDispatch } from 'react-redux'
import { initDataCategory, switchPage} from '../../../../redux/Category/categoriesSlice'
const Category = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const categories = useSelector(state => state.categories.categories)
    const switchCategory = (id) => {
        navigate(`/category/${id}`)
    }
    console.log(categories)
    useEffect(() => {
        const fetchDataCategory = async () => {
            const response = await getAllCategory()
            console.log(response)
            if(response)
            {
                dispatch(initDataCategory(response))
            }
        }
        fetchDataCategory()
    }, [])
    
    return (
        <div className='bg-white rounded-2 category'>
            <ul className="nav flex-column">
                <p style={{ fontWeight: '600' }} className="text-capitalize mt-2 ms-4">Danh mục</p>
                {categories?.length > 0 ? (

                    categories?.map((category, index) => (
                        <li onClick={() => switchCategory(category?._id)} key={index} className="nav-item d-flex align-items-center px-4 py-1">
                            <img width="35px" src={category?.image} alt="" />
                            <h5 className="nav-link text-dark">{category?.name}</h5>
                        </li>
                    ))
                ) :
                    <div className="loading">
                        <div className="spinner"></div>
                    </div>
                }

            </ul>
        </div>
    )
}

export default Category
