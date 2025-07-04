import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'
import Pagination from '../../../../components/Pagination'
import { getAllReceipt } from '../../../../services/ReceiptService'
import { initDataReceipt, switchPage } from '../../../../redux/Receipt/receiptsSlice'
import { getAllSupplier } from '../../../../services/SupplierService'
import { initDataSupplier } from '../../../../redux/Supplier/suppliersSlice'
import AddReceipt from './AddReceipt'
import { initDataProduct } from '../../../../redux/Products/productsSlice'
import { getAllProduct } from '../../../../services/ProductService'
import { useRoleDetail } from '../../../../until/function'
export default function Receipt() {
    const dispatch = useDispatch()
    const suppliers = useSelector(state => state?.suppliers.data)
    const receipts = useSelector(state => state?.receipts.data)
    const page = useSelector(state => state?.receipts?.page)
    const totalPage = useSelector(state => state?.receipts?.totalPage)
    const totalReceipt = useSelector(state => state?.receipts?.totalReceipt)
    const limit = useSelector(state => state?.receipts?.limit)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const [displayTextSearch, setDisplayTextSearch] = useState('idReceipt')
    const [searchCriteria, setSearchCriteria] = useState({
        idReceipt: '',
        supplier: ''
    })
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const idRole = isAuthenticated && userData?.dataLogin?.idRole


    useEffect(() => {
        const fetchData = async () => {

            try {
                let query = `page=${page}&limit=${limit}`
                if (searchCriteria.idReceipt != "") {
                    query += `&idReceipt=${searchCriteria.idReceipt}`
                }
                if (searchCriteria.supplier != "") {
                    query += `&supplier=${searchCriteria.supplier}`
                }
                console.log(query)


                const [responseReceipt, responseSupplier, responseProduct] = await Promise.all([
                    await getAllReceipt(query),
                    await getAllSupplier(),
                    await getAllProduct()
                ])
                if (responseReceipt && responseReceipt.status == 200) {
                    dispatch(initDataReceipt(responseReceipt))
                }
                if (responseSupplier && responseSupplier.status == 200) {
                    dispatch(initDataSupplier(responseSupplier))
                }
                if (responseProduct && responseProduct.status == 200) {
                    dispatch(initDataProduct(responseProduct))
                }
            }
            catch (error) {
                console.log("Fail when get receipt to display")
            }
        }
        fetchData()
    }, [page, limit, searchCriteria])
    const { data: roleDetails, isLoading: isRoleDetailsLoading, isError: isRoleDetailsError, error: roleDetailsError } = useRoleDetail(idRole)
    const isDisplayPageReceipt = roleDetails?.permissions?.some(item =>
        item.action.toLowerCase().includes('receipt') && item.allow === true
    )

    const handleSwitchPageEdit = (data) => {
        // setShowEdit(true)
        // setSelectedSupplier(data)
    }

    const handlePagination = (page) => {
        dispatch(switchPage(page))
    }


    // handle delete product
    const handleDeleteCategory = async (id) => {
        // const response = await deleteSupplier(id)
        // if (response && response?.status === 200) {
        //     dispatch(deleteSupplierRedux(id))
        //     if (suppliers?.length === 1 && page > 1) {
        //         dispatch(switchPage(page - 1))
        //     }
        // }
    }

    const handleChangeSearchSelect = (e) => {
        setSearchCriteria({
            idReceipt: '',
            supplier: ''
        })
        setDisplayTextSearch(e.target.value)
    }
    return (
        <div className='px-4 py-2 bg-white product'>
            {isDisplayPageReceipt ? (
                <Fragment>

                    <div className='d-flex justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <h3>Receipt</h3>
                            <h6 className='ms-3'>({totalReceipt} receipt found)</h6>
                            {!isRoleDetailsLoading ? (
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    type="button"
                                    className="btn btn-outline-success ms-3"
                                    disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                        (item) => item?.action === "receipt_add" && item?.allow === false
                                    )}
                                >
                                    Tạo phiếu nhập
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
                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                            (item) => item?.action === "receipt_search" && item?.allow === false
                        )}
                    >
                        <option value="idReceipt" selected>Tìm kiếm theo Id</option>
                        <option value="supplier">Tìm kiếm theo nhà cung cấp</option>
                    </select>
        
        
                    {displayTextSearch === 'idReceipt' && (
                        <div class="input-group mb-3 mt-1">
                            <button class="btn btn-outline-secondary" disabled type="button" id="button-addon1">Tìm kiếm theo {displayTextSearch}</button>
                            <input
                                type="text"
                                class="form-control"
                                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                    (item) => item?.action === "receipt_search" && item?.allow === false
                                )}
                                name={displayTextSearch}
                                value={searchCriteria[`${displayTextSearch}`]}
                                onChange={(e) => handleChangeInput(e, setSearchCriteria)}
                            />
                        </div>
                    )}
        
                    {displayTextSearch == 'supplier' && (
                        <div>
                            <select
                                name={displayTextSearch}
                                value={searchCriteria[`${displayTextSearch}`]}
                                class="form-select"
                                onChange={(e) => handleChangeInput(e, setSearchCriteria)}
                            >
                                <option value="">Chọn nhà cung cấp</option>
                                {suppliers && suppliers?.length > 0 ? (
                                    suppliers?.map((supplier, index) => (
                                        <option key={index} value={supplier._id}>{supplier.name}</option>
                                    )
                                    )) :
                                    <option value="" selected>Không tồn tại nhà cung cấp</option>
                                }
                            </select>
                        </div>
                    )}
        
        
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">User</th>
                                <th scope="col">Supplier</th>
                                <th scope="col">TotalPrice</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Updated At</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts && receipts?.length > 0 ? (
                                receipts?.map((receipt, index) => (
                                    <tr key={index}>
                                        <th scope="row">{(receipt?._id).slice(0, 10)}...</th>
                                        <td>{receipt?.user?.name}</td>
                                        <td>{receipt?.supplier?.name}</td>
                                        <td>{receipt?.totalPrice}</td>
                                        <td>{new Date(receipt?.createdAt).toLocaleString('vi-VN')}</td>
                                        <td>{new Date(receipt?.updatedAt).toLocaleString('vi-VN')}</td>
                                        <td style={{ width: '6%' }} className='text-center'>
                                            <button
                                                onClick={() => handleSwitchPageEdit(receipt)}
                                                type="button"
                                                className="btn btn-outline-primary"
                                                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                                    (item) => item?.action === "receipt_edit" && item?.allow === false
                                                )}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td style={{ width: '6%' }} className='text-center'>
                                            <button
                                                onClick={() => handleDeleteCategory(receipt._id)}
                                                type="button"
                                                className="btn btn-outline-danger"
                                                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                                    (item) => item?.action === "receipt_delete" && item?.allow === false
                                                )}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : <p>Không có phiếu nhập nào</p>}
        
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
        
                    <AddReceipt show={showAddModal} close={() => setShowAddModal(false)} />
                    {/* <EditSupplier show={showEdit} close={() => setShowEdit(false)} data={selectedSupplier} /> */}
                </Fragment>
            ) : ""}
        </div>
    )
}
