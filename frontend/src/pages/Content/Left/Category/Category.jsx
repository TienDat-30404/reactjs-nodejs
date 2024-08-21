import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCategory } from '../../../../services/CategoryService'
const Category = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const switchCategory = (id) => {
        navigate(`/category/${id}`)
    }

    const getDataCategory = async () => {
        const categories = await getAllCategory()
        return categories.categories
    }

    useEffect(() => {
        const fetchDataCategory = async () => {
            const categories = await getDataCategory()
            setCategories(categories)
        }
        fetchDataCategory()
    }, [])
    return (
        <div className='bg-white rounded-2 category'>
            <ul className="nav flex-column">
                <p style={{ fontWeight: '600' }} className="text-capitalize mt-2 ms-4">Danh mục</p>
                {categories.length > 0 ? (

                    categories.map((category, index) => (
                        <li onClick={() => switchCategory(category.idCategory)} key={index} className="nav-item d-flex align-items-center px-4 py-1">
                            <img width="35px" src={category.image} alt="" />
                            <h5 className="nav-link text-dark">{category.name}</h5>
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
