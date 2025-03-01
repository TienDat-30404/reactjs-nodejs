import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'
import { switchPage } from '../../../../redux/Size/sizesSlice'
import Pagination from '../../../../components/Pagination'
import { deleteSizeService, getAllSizeService } from '../../../../services/SizeService'
import { deleteSizeRedux, initDataSize } from '../../../../redux/Size/sizesSlice'
import AddAttribute from './AddAttribute'
import EditAttribute from './EditAttribute'
import { useRoleDetail } from '../../../../until/function'
export default function Attribute() {
    const dispatch = useDispatch()
    const attributes = useSelector(state => state?.sizes?.data)
    console.log(attributes)
    const page = useSelector(state => state?.sizes?.page)
    const totalPage = useSelector(state => state?.sizes?.totalPage)
    const totalAttribute = useSelector(state => state?.sizes?.totalSize)
    const limit = useSelector(state => state?.sizes?.limit)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedAttribute, setSelectedAttribute] = useState(null);

    const [displayTextSearch, setDisplayTextSearch] = useState('idSize')
    const [searchCriteria, setSearchCriteria] = useState({
        idSize: ''
    })
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const idRole = isAuthenticated && userData?.dataLogin?.idRole


    useEffect(() => {
        const fetchData = async () => {
            try {
                let query = `page=${page}&limit=${limit}`
                if (searchCriteria.idSize != "") {
                    query += `&idSize=${searchCriteria.idSize}`
                }
                // if (searchCriteria.status != "") {
                //     query += `&status=${searchCriteria.status}`
                // }


                const response = await getAllSizeService(query)
                console.log(response)
                if (response && response?.status === 200) {
                    dispatch(initDataSize(response))
                }
            }
            catch (error) {
                console.log("Fail when get attribute to display")
            }
        }
        fetchData()
    }, [page, limit, displayTextSearch, searchCriteria]);
    const { data: roleDetails, isLoading: isRoleDetailsLoading, isError: isRoleDetailsError, error: roleDetailsError } = useRoleDetail(idRole)

    const handleSwitchPageEdit = (data) => {
        setShowEdit(true)
        setSelectedAttribute(data)
    }

    const handlePagination = (page) => {
        dispatch(switchPage(page))
    }


    // handle delete product
    const handleDeleteDiscount = async (id) => {
        const response = await deleteSizeService(id)
        if (response && response?.status === 200) {
            dispatch(deleteSizeRedux(id))
            if (attributes?.length === 1 && page > 1) {
                dispatch(switchPage(page - 1))
            }
        }
    }

    const handleChangeSearchSelect = (e) => {
        setSearchCriteria({
            idSize: ''
        })
        console.log(e.target.value)
        setDisplayTextSearch(e.target.value)
    }
    return (
        <div className='px-4 py-2 bg-white product'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center'>
                    <h3>Discount</h3>
                    <h6 className='ms-3'>({totalAttribute} attribute found)</h6>
                    {!isRoleDetailsLoading ? (
                        <button
                            onClick={() => setShowAddModal(true)}
                            type="button"
                            className="btn btn-outline-success ms-3"
                            disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                (item) => item?.action === "attribute_add" && item?.allow === false
                            )}
                        >
                            Thêm thuộc tính
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
                class="form-select"
                onChange={handleChangeSearchSelect}
                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                    (item) => item?.action === "attribute_search" && item?.allow === false
                )}
            >
                <option value="idSize" selected>Tìm kiếm theo Id</option>
            </select>


            {displayTextSearch && (
                <div class="input-group mb-3 mt-1">
                    <button class="btn btn-outline-secondary" disabled type="button" id="button-addon1">Tìm kiếm theo {displayTextSearch}</button>
                    <input
                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                            (item) => item?.action === "attribute_search" && item?.allow === false
                        )}
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
                        <th scope="col">Size PriceMultiplier</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {attributes && attributes?.length > 0 ? (
                        attributes?.map((attribute, index) => (
                            <tr key={index}>
                                <th scope="row">{(attribute?._id).slice(0, 10)}...</th>


                                <td>{attribute?.name}</td>
                                <td>{attribute?.sizePriceMultiplier}%</td>

                                <td>{new Date(attribute?.createdAt).toLocaleString('vi-VN')}</td>

                                <td>{new Date(attribute?.updatedAt).toLocaleString('vi-VN')}</td>
                                <td style={{ width: '6%' }} className='text-center'>
                                    <button
                                        onClick={() => handleSwitchPageEdit(attribute)}
                                        type="button"
                                        className="btn btn-outline-primary"
                                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                            (item) => item?.action === "attribute_edit" && item?.allow === false
                                        )}
                                    >

                                        Edit
                                    </button>
                                </td>
                                <td style={{ width: '6%' }} className='text-center'>
                                    <button
                                        onClick={() => handleDeleteDiscount(attribute?._id)}
                                        type="button"
                                        className="btn btn-outline-danger"
                                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                            (item) => item?.action === "attribute_delete" && item?.allow === false
                                        )}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : <p>Không có thuộc tính nào</p>}

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
            <AddAttribute show={showAddModal} close={() => setShowAddModal(false)} />
            <EditAttribute show={showEdit} close={() => setShowEdit(false)} data={selectedAttribute} />
        </div>
    )
}
