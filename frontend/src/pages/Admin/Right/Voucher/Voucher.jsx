import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'
import Pagination from '../../../../components/Pagination'
import { deleteVoucher, getAllVoucher } from '../../../../services/VoucherService'
import { deleteVoucherReduxAdmin, initDataVoucher, switchPage } from '../../../../redux/Voucher/vouchersSlice'


export default function Voucher() {
    const dispatch = useDispatch()
    const vouchers = useSelector(state => state?.vouchers?.data)
    const page = useSelector(state => state?.vouchers?.page)
    const totalPage = useSelector(state => state?.vouchers?.totalPage)
    const totalVoucher = useSelector(state => state?.vouchers?.totalVoucher)
    const limit = useSelector(state => state?.vouchers?.limit)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedAttribute, setSelectedAttribute] = useState(null);

    const [displayTextSearch, setDisplayTextSearch] = useState('idVoucher')
    const [searchCriteria, setSearchCriteria] = useState({
        idVoucher: '',
        status: ''
    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                let query = `page=${page}&limit=${limit}`
                if (searchCriteria.idVoucher != "") {
                    query += `&idVoucher=${searchCriteria.idVoucher}`
                }
                if (searchCriteria.status != "") {
                    query += `&status=${searchCriteria.status}`
                }


                const response = await getAllVoucher(query)
                console.log(response)
                if (response && response?.status === 200) {
                    dispatch(initDataVoucher(response))
                }
            }
            catch (error) {
                console.log("Fail when get voucher to display")
            }
        }
        fetchData()
    }, [page, limit, displayTextSearch, searchCriteria]);
    const handleSwitchPageEdit = (data) => {
        // setShowEdit(true)
        // setSelectedAttribute(data)
    }

    const handlePagination = (page) => {
        console.log(page)
        dispatch(switchPage(page))
    }


    // handle delete product
    const handleDeleteVoucher = async (id) => {
        const response = await deleteVoucher(id)
        if (response && response?.status === 200) {
            dispatch(deleteVoucherReduxAdmin(id))
            if (vouchers?.length === 1 && page > 1) {
                dispatch(switchPage(page - 1))
            }
        }
    }

    const handleChangeSearchSelect = (e) => {
        setSearchCriteria({
            idVoucher: '',
            status : 1
        })
        setDisplayTextSearch(e.target.value)
    }
    return (
        <div className='px-4 py-2 bg-white product'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center'>
                    <h3>Voucher</h3>
                    <h6 className='ms-3'>({totalVoucher} voucher found)</h6>
                    <button onClick={() => setShowAddModal(true)} type="button" className="btn btn-outline-success ms-3">Tạo voucher</button>
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
            >
                <option value="idVoucher" selected>Tìm kiếm theo Id</option>
                <option value="status">Tìm kiếm theo trạng thái</option>
            </select>


            {displayTextSearch === 'idVoucher' && (
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

            {displayTextSearch === 'status' && (
                <select
                    name={displayTextSearch}
                    value={searchCriteria[`${displayTextSearch}`]}
                    onChange={(e) => handleChangeInput(e, setSearchCriteria)}
                    className="form-select mt-2"
                >
                    <option value="1">Được sử dụng</option>
                    <option value="0">Hết hạn sử dụng</option>
                </select>
            )}





            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">User</th>
                        <th scope="col">Discount Voucher</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created At</th>
                        <th scope="col">End Day</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {vouchers && vouchers?.length > 0 ? (
                        vouchers?.map((voucher, index) => (
                            <tr key={index}>
                                <th scope="row">{(voucher?._id).slice(0, 10)}...</th>


                                <td>{voucher?.user?.name}</td>
                                <td>{voucher?.discountVoucher}%</td>
                                <td>{voucher?.description}</td>
                                <td>{voucher?.status}</td>

                                <td>{new Date(voucher?.createdAt).toLocaleString('vi-VN')}</td>
                                <td>{new Date(voucher?.endDate).toLocaleString('vi-VN')}</td>

                                <td>{new Date(voucher?.updatedAt).toLocaleString('vi-VN')}</td>
                                <td style={{ width: '5%' }} className='text-center'>
                                    <button
                                        onClick={() => handleSwitchPageEdit(voucher)}
                                        type="button"
                                        className="btn btn-outline-primary">
                                        Edit
                                    </button>
                                </td>
                                <td style={{ width: '6%' }} className='text-center'>
                                    <button onClick={() => handleDeleteVoucher(voucher?._id)} type="button" className="btn btn-outline-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : <p>Không có voucher nào</p>}

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
            {/* <AddAttribute show={showAddModal} close={() => setShowAddModal(false)} />
            <EditAttribute show={showEdit} close={() => setShowEdit(false)} data={selectedAttribute} /> */}
        </div>
    )
}
