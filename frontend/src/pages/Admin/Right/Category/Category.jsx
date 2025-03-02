import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { deleteCategory, getAllCategory } from '../../../../services/CategoryService'
import { handleChangeInput, useRoleDetail } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCategoryRedux, initDataCategory } from '../../../../redux/Category/categoriesSlice'
import { visiblePagination } from '../../../../until/function'
import { switchPage } from '../../../../redux/Category/categoriesSlice'
import { toast } from 'react-toastify'
import AddCategory from './AddCategory'
import EditCategory from './EditCategory'
import Pagination from '../../../../components/Pagination'
export default function Category() {
  const dispatch = useDispatch()
  const categories = useSelector(state => state?.categories?.categories)
  const page = useSelector(state => state?.categories?.page)
  const totalPage = useSelector(state => state?.categories?.totalPage)
  const totalCategory = useSelector(state => state?.categories?.totalCategory)
  const limit = useSelector(state => state?.categories?.limit)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [displayTextSearch, setDisplayTextSearch] = useState('idCategory')
  const [searchCriteria, setSearchCriteria] = useState({
    idCategory: '',
    name: ''
  })
  const { isAuthenticated, userData } = useSelector((state) => state.auth);
  const idRole = isAuthenticated && userData?.dataLogin?.idRole



  const { data: roleDetails, isLoading: isRoleDetailsLoading, isError: isRoleDetailsError, error: roleDetailsError } = useRoleDetail(idRole)
  const isDisplayPageCategory = roleDetails?.permissions?.some(item =>
    item.action.toLowerCase().includes('category') && item.allow === true
  )
  useEffect(() => {
    const fetchData = async () => {

      try {
        let query = `page=${page}&limit=${limit}`
        if (searchCriteria.name != "") {
          query += `&search=${searchCriteria.name}`
        }
        if (searchCriteria.idCategory != "") {
          query += `&idCategory=${searchCriteria.idCategory}`
        }


        const response = await getAllCategory(query)
        if (response && response.status == 200) {
          dispatch(initDataCategory(response))
        }

      
      }
      catch (error) {
        console.log("Fail when get categories to display")
      }
    }
    fetchData()
  }, [page, limit, dispatch, searchCriteria, displayTextSearch])

  const handleSwitchPageEdit = (data) => {
    setShowEdit(true)
    setSelectedCategory(data)
  }

  const handlePagination = (page) => {
    dispatch(switchPage(page))
  }


  // handle delete product
  const handleDeleteCategory = async (id) => {
    const response = await deleteCategory(id)
    console.log(response)
    if (response && response?.status === 200) {
      dispatch(deleteCategoryRedux(id))
      if (categories?.length === 1 && page > 1) {
        dispatch(switchPage(page - 1))
      }
    }
  }

  const handleChangeSearchSelect = (e) => {
    setSearchCriteria({
      idCategory: '',
      name: ''
    })
    setDisplayTextSearch(e.target.value)
  }
  return (
    <div className='px-4 py-2 bg-white product'>
      {isDisplayPageCategory ? (
        <Fragment>

          <div className='d-flex justify-content-between'>
    
            <div className='d-flex align-items-center'>
              <h3>Category</h3>
              <h6 className='ms-3'>({totalCategory} category found)</h6>
    
    
              {!isRoleDetailsLoading ? (
                <button
                  onClick={() => setShowAddModal(true)}
                  type="button"
                  className="btn btn-outline-success ms-3"
                  disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                    (item) => item?.action === "category_add" && item?.allow === false
                  )}
                >
                  Create Category
                </button>
              ) : (
                <div class="spinner-border" role="status">
                  <span class="sr-only"></span>
                </div>
              )}
    
    
            </div>
            <div className='d-flex align-items-center'>
              <i className="bi bi-bell me-3"></i>
              <i className="bi bi-search me-3"></i>
              <ImageComponent
                src="https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png" alt=""
                width="30px"
                height="30px"
                borderRadius="5px"
              />
            </div>
          </div>
    
          <select
            onChange={handleChangeSearchSelect}
            class="form-select mt-2"
          >
            <option value="idCategory" selected>Tìm kiếm theo Id</option>
            <option value="name">Tìm kiếm theo tên</option>
          </select>
    
    
          {displayTextSearch && (
            <div class="input-group mb-3 mt-1">
              <button class="btn btn-outline-secondary" disabled type="button" id="button-addon1">Tìm kiếm theo {displayTextSearch}</button>
              <input
                type="text"
                class="form-control"
                name={displayTextSearch}
                value={searchCriteria[`${displayTextSearch}`]}
                onChange={(e) => handleChangeInput(e, setSearchCriteria)}
              />
            </div>
          )}
    
    
    
    
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories && categories?.length > 0 ? (
                categories?.map((category, index) => (
                  <tr key={index}>
                    <th scope="row">{(category?._id).slice(0, 10)}...</th>
                    <td>
                      <ImageComponent
                        src={category?.image} alt=""
                        width="70px"
                        height="50px"
                        borderRadius="5px"
                        className="me-2"
                      />
                      {category?.name}
                    </td>
                    <td>{new Date(category?.createdAt).toLocaleString('vi-VN')}</td>
                    <td>{new Date(category?.updatedAt).toLocaleString('vi-VN')}</td>
                    <td style={{ width: '6%' }} className='text-center'>
                      <button
                        onClick={() => handleSwitchPageEdit(category)}
                        type="button"
                        className="btn btn-outline-primary"
                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                          (item) => item?.action === "category_edit" && item?.allow === false
                        )}
                      >
                        Edit
    
                      </button>
                    </td>
                    <td style={{ width: '6%' }} className='text-center'>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        type="button"
                        className="btn btn-outline-danger"
                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                          (item) => item?.action === "category_delete" && item?.allow === false
                        )}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : <p>Không có thể loại nào</p>}
    
            </tbody>
          </table>
    
          {totalPage > 1 && (
            <Pagination
              totalPage={totalPage}
              handlePagination={handlePagination}
              page={page}
              visiblePagination={visiblePagination}
            />
          )}
    
          <AddCategory show={showAddModal} close={() => setShowAddModal(false)} />
          <EditCategory show={showEdit} close={() => setShowEdit(false)} data={selectedCategory} />
        </Fragment>
      ) : ""}
    </div>
  )
}
