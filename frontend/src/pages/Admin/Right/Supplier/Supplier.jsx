import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'
import { deleteSupplierRedux, switchPage } from '../../../../redux/Supplier/suppliersSlice'
import { toast } from 'react-toastify'
import Pagination from '../../../../components/Pagination'
import { deleteSupplier, getAllSupplier } from '../../../../services/SupplierService'
import { initDataSupplier } from '../../../../redux/Supplier/suppliersSlice'
import AddSupplier from './AddSupplier'
import EditSupplier from './EditSupplier'
export default function Supplier() {
    const dispatch = useDispatch()
    const suppliers = useSelector(state => state?.suppliers.data)
    const page = useSelector(state => state?.suppliers?.page)
    const totalPage = useSelector(state => state?.suppliers?.totalPage)
    const totalSupplier = useSelector(state => state?.suppliers?.totalSupplier)
    const limit = useSelector(state => state?.suppliers?.limit)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const [displayTextSearch, setDisplayTextSearch] = useState('idCategory')
    const [searchCriteria, setSearchCriteria] = useState({
        idCategory: '',
        name: ''
    })


    useEffect(() => {
        const fetchData = async () => {

            try {
                let query = `page=${page}&limit=${limit}`
                // if (searchCriteria.name != "") {
                //   query += `&search=${searchCriteria.name}`
                // }
                // if (searchCriteria.idCategory != "") {
                //   query += `&idCategory=${searchCriteria.idCategory}`
                // }


                const response = await getAllSupplier(query)
                console.log(query)
                if (response && response.status == 200) {
                    dispatch(initDataSupplier(response))
                }

            }
            catch (error) {
                console.log("Fail when get supplier to display")
            }
        }
        fetchData()
    }, [page, limit])

    const handleSwitchPageEdit = (data) => {
        setShowEdit(true)
        setSelectedSupplier(data)
    }

    const handlePagination = (page) => {
        dispatch(switchPage(page))
    }


    // handle delete product
    const handleDeleteCategory = async (id) => {
        const response = await deleteSupplier(id)
        if (response && response?.status === 200) {
            dispatch(deleteSupplierRedux(id))
            if (suppliers?.length === 1 && page > 1) {
                dispatch(switchPage(page - 1))
            }
        }
    }

    const handleChangeSearchSelect = (e) => {
        // setSearchCriteria({
        //     idCategory: '',
        //     name: ''
        // })
        // setDisplayTextSearch(e.target.value)
    }
    return (
        <div className='px-4 py-2 bg-white product'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center'>
                    <h3>Supplier</h3>
                    <h6 className='ms-3'>({totalSupplier} supplier found)</h6>
                    <button onClick={() => setShowAddModal(true)} type="button" className="btn btn-outline-success ms-3">Tạo nhà cung cấp</button>
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
                <option value="idProduct" selected>Tìm kiếm theo Id</option>
                <option value="name">Tìm kiếm theo tên</option>
            </select>


            {/* {displayTextSearch && (
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
        )} */}


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Email</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers && suppliers?.length > 0 ? (
                        suppliers?.map((supplier, index) => (
                            <tr key={index}>
                                <th scope="row">{(supplier?._id).slice(0, 10)}...</th>
                                <td>{supplier?.name}</td>
                                <td>{supplier?.phone}</td>
                                <td>{supplier?.address}</td>
                                <td>{supplier?.email}</td>

                                <td>{new Date(supplier?.createdAt).toLocaleString('vi-VN')}</td>
                                <td>{new Date(supplier?.updatedAt).toLocaleString('vi-VN')}</td>
                                <td style={{ width: '6%' }} className='text-center'>
                                    <button
                                        onClick={() => handleSwitchPageEdit(supplier)}
                                        type="button"
                                        className="btn btn-outline-primary">
                                        Edit
                                    </button>
                                </td>
                                <td style={{ width: '6%' }} className='text-center'>
                                    <button onClick={() => handleDeleteCategory(supplier._id)} type="button" className="btn btn-outline-danger">Delete</button>
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

            <AddSupplier show={showAddModal} close={() => setShowAddModal(false)} />
            <EditSupplier show={showEdit} close={() => setShowEdit(false)} data={selectedSupplier} />
        </div>
    )
}
