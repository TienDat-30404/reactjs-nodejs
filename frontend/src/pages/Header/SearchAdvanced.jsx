import React, { useEffect, useState } from 'react';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputComponent } from '../../components/InputComponent';
import { getAllCategory } from '../../services/CategoryService';
import { ErrorMessageInput } from '../../components/InputComponent';
import { validateSearchAdvanced, createQueryStringForSearch } from '../../until/validate';
import { handleChangeInput } from '../../until/function';
const SearchAdvanced = forwardRef(({ show, setShowModal }, ref) => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [dataSearch, setDataSearch] = useState({
        nameSearch: '',
        idCategory: 0,
        priceFrom: '',
        priceTo: ''
    })
    const [errors, setErrors] = useState({})
    // data Category
    const getDataCategory = async () => {
        const response = await getAllCategory()
        return response
    }
    useEffect(() => {
        const fetchData = async () => {
            const listCategory = await getDataCategory()
            setCategories(listCategory)
        }
        fetchData()
    }, [])

    // reset all 
    useEffect(() => {
        if (!show) {
            setShowModal(false)
            setErrors({
                priceFrom: '',
                priceTo: ''
            })
            setDataSearch({
                nameSearch: '',
                idCategory: 0,
                priceFrom: '',
                priceTo: ''
            })
        }
    }, [show])
    // search
    const switchSearch = (e) => {
        const validateSearchPrice = validateSearchAdvanced(dataSearch.priceFrom, dataSearch.priceTo)
        if (validateSearchPrice.priceFrom || validateSearchPrice.priceTo) {
            setErrors(validateSearchPrice)
            return
        }

        const queryString = createQueryStringForSearch(dataSearch.nameSearch, dataSearch.idCategory, dataSearch.priceFrom, dataSearch.priceTo)
        e.preventDefault();
        setShowModal(false)
        navigate(`/search?${queryString}`);
    };


    const hiddenSearchAdvanced = () => {
        setShowModal(false)
    }
    return (
        <div className={`modal-display ${show ? 'd-block' : 'd-none'}`} ref={ref}>
            <div className='search_advanced-content d-flex flex-column px-4 py-2' >
                <div className='d-flex align-items-center justify-content-between mb-3'>
                    <p>Đón chờ siêu Sale</p>
                    <img src="https://salt.tikicdn.com/cache/140x28/ts/tikimsp/39/62/9d/cac51f405783e2d296146a7fd64af429.png.webp" alt="" />
                </div>
                <div className='d-flex align-items-center mb-3'>
                    <i className="bi bi-search me-2"></i>
                    <p>Sản phẩm chất lượng cao</p>
                </div>
                <div className='d-flex align-items-center mb-3'>
                    <i className="bi bi-search me-2"></i>
                    <p>Quần nam</p>
                </div>
                <div className='d-flex align-items-center mb-3'>
                    <i className="bi bi-search me-2"></i>
                    <p>Áo khoác tiki</p>
                </div>
                <div className="mb-3 row d-flex align-items-center border-top">
                    <div style={{ width: '100%' }} className="col-sm-10 mt-3">
                        <label style={{ width: '30%' }} htmlFor="staticEmail" className="col-sm-2 col-form-label text-nowrap me-3">Tên sản phẩm</label>
                        <InputComponent
                            name="nameSearch"
                            value={show ? dataSearch.name : ''}
                            onChange={(e) => handleChangeInput(e, setDataSearch)}
                            type="text"
                            style={{ width: '60%', height: '35px' }}
                        />
                    </div>
                    <div style={{ width: '100%' }} className="col-sm-10 mt-4">
                        <label style={{ width: '30%' }} htmlFor="staticEmail" className="col-sm-2 col-form-label text-nowrap me-3">Danh mục sản phẩm</label>
                        {categories.categories ? (

                            <select style={{ width: '60%', height: '35px' }} value = {dataSearch.idCategory} name="idCategory" onChange={(e) => handleChangeInput(e, setDataSearch)} >
                                <option value="0">Tất cả</option>
                                {categories.categories.map((category, index) => (
                                    <>
                                        <option key={index} value={category._id}>{category.name}</option>
                                    </>
                                ))}
                            </select>
                        ) :
                            <div className="loading">
                                <div className="spinner"></div>
                            </div>
                        }

                    </div>
                    <div style={{ width: '100%' }} className="col-sm-10 mt-4 d-flex">
                        <div style={{ width: '50%' }}>
                            <div className='d-flex w-100'>
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-nowrap me-3">Giá từ</label>
                                <InputComponent
                                    name="priceFrom"
                                    value={dataSearch.priceFrom}
                                    onChange={(e) => handleChangeInput(e, setDataSearch)}
                                    type="text"
                                    style={{ width: '75%', height: '35px' }}
                                    className={`form-control ${errors.priceFrom ? 'is-invalid' : ''}`}
                                />
                            </div>
                            {errors.priceFrom && <ErrorMessageInput errors={errors} field="priceFrom" />}
                        </div>
                        <div>
                            <div className='d-flex w-100'>
                                <i style={{ fontSize: '20px' }} className="bi bi-arrow-right me-2 ms-2"></i>
                                <InputComponent
                                    name="priceTo"
                                    value={dataSearch.priceTo}
                                    onChange={(e) => handleChangeInput(e, setDataSearch)}
                                    type="text"
                                    style={{ width: '75%', height: '35px' }}
                                    className={`form-control ${errors.priceTo ? 'is-invalid' : ''}`}
                                />
                            </div>
                            {errors.priceTo && <ErrorMessageInput errors={errors} field="priceTo" />}
                        </div>

                    </div>
                    <div className='mt-4 d-flex justify-content-center'>
                        <button onClick={switchSearch} className='btn btn-primary'>Tìm kiếm</button>
                    </div>
                </div>
            </div>
            <div onClick={hiddenSearchAdvanced} className='search_advanced'></div>
        </div>
    );
});

export default SearchAdvanced;