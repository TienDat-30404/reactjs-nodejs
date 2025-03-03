import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'

import Pagination from '../../../../components/Pagination'

import { deleteRole, getAllRole } from '../../../../services/RoleService'
import { deleteRoleRedux, initDataRole, switchPage } from '../../../../redux/Role/rolesSlice'
import AddRole from './AddRole'
import UpdateRole from './UpdateRole'
import { toast } from 'react-toastify'
import { useRoleDetail } from '../../../../until/function'
export default function Role() {
    const dispatch = useDispatch()
    const roles = useSelector(state => state?.roles?.roles)
    const page = useSelector(state => state?.roles?.page)
    const totalPage = useSelector(state => state?.roles?.totalPage)
    const totalRole = useSelector(state => state?.roles?.totalRole)
    const limit = useSelector(state => state?.roles?.limit)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedRole, setSelectedRole] = useState(null);

    const [displayTextSearch, setDisplayTextSearch] = useState('idRole')
    const [searchCriteria, setSearchCriteria] = useState({
        idRole: '',
        name: ''
    })
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const idRole = isAuthenticated && userData?.dataLogin?.idRole



    useEffect(() => {
        const fetchData = async () => {
            try {
                let query = `page=${page}&limit=${limit}`
                if (searchCriteria.idRole != "") {
                    query += `&idRole=${searchCriteria.idRole}`
                }
                if (searchCriteria.name != "") {
                    query += `&name=${searchCriteria.name}`
                }


                const response = await getAllRole(query)
                console.log(response)
                if (response && response?.status === 200) {
                    dispatch(initDataRole(response))
                }

            }
            catch (error) {
                console.log("Fail when get role", error)
            }
        }
        fetchData()
    }, [page, limit, displayTextSearch, searchCriteria]);
    const { data: roleDetails, isLoading: isRoleDetailsLoading, isError: isRoleDetailsError, error: roleDetailsError } = useRoleDetail(idRole)
    const isDisplayPageRole = roleDetails?.permissions?.some(item =>
        item.action.toLowerCase().includes('role') && item.allow === true
    )
    const handleSwitchPageEdit = (data) => {
        setShowEdit(true)
        setSelectedRole(data)
    }

    const handlePagination = (page) => {
        dispatch(switchPage(page))
    }


    // handle delete product
    const handleDeleteRole = async (id) => {
        const response = await deleteRole(id)
        if (response && response?.status === 200) {
            console.log(response)
            console.log(id)
            dispatch(deleteRoleRedux(id))
            if (roles?.length === 1 && page > 1) {
                dispatch(switchPage(page - 1))
            }
        }
        if (response && response.status === 400) {
            console.log(response)
            toast.error(response.message)
        }


    }

    const handleChangeSearchSelect = (e) => {
        setSearchCriteria({
            idRole: '',
            name: ''
        })
        setDisplayTextSearch(e.target.value)
    }
    return (
        <div className='px-4 py-2 bg-white product'>
            {isDisplayPageRole ? (
                <Fragment>

                    <div className='d-flex justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <h3>Role</h3>
                            <h6 className='ms-3'>({totalRole} role found)</h6>
                            {!isRoleDetailsLoading ? (
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    type="button"
                                    className="btn btn-outline-success ms-3"
                                    disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                        (item) => item?.action === "role_add" && item?.allow === false
                                    )}
                                >
                                    Create Role
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
                            (item) => item?.action === "role_search" && item?.allow === false
                        )}
                    >
                        <option value="idRole" selected>Tìm kiếm theo Id</option>
                        <option value="name">Tìm kiếm theo tên</option>
                    </select>
        
        
                    {displayTextSearch && (
                        <div class="input-group mb-3 mt-1">
                            <button class="btn btn-outline-secondary" disabled type="button" id="button-addon1">Tìm kiếm theo {displayTextSearch}</button>
                            <input
                                type="text"
                                class="form-control"
                                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                    (item) => item?.action === "role_search" && item?.allow === false
                                )}
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
                            {roles && roles?.length > 0 ? (
                                roles?.map((role, index) => (
                                    <tr key={index}>
                                        <th scope="row">{(role?._id).slice(0, 10)}...</th>
        
        
                                        <td>{role?.name}</td>
        
                                        <td>{new Date(role?.createdAt).toLocaleString('vi-VN')}</td>
                                        <td>{new Date(role?.updatedAt).toLocaleString('vi-VN')}</td>
        
                                        <td style={{ width: '6%' }} className='text-center'>
                                            <button
                                                onClick={() => handleSwitchPageEdit(role)}
                                                type="button"
                                                className="btn btn-outline-primary"
                                                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                                    (item) => item?.action === "role_edit" && item?.allow === false
                                                )}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td style={{ width: '6%' }} className='text-center'>
                                            <button
                                                onClick={() => handleDeleteRole(role?._id)}
                                                type="button"
                                                className="btn btn-outline-danger"
                                                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                                    (item) => item?.action === "role_delete" && item?.allow === false
                                                )}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : <p>Không có quyền nào tồn tại trong hệ thống</p>}
        
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
                    <AddRole show={showAddModal} close={() => setShowAddModal(false)} />
                    <UpdateRole show={showEdit} close={() => setShowEdit(false)} data={selectedRole} />
                </Fragment>
            ) : ""}
        </div>
    )
}
