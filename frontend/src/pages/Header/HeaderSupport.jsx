const HeaderSupport = () => {
    return (
        <div className="container mt-1 mb-1">
            <ul
                className="nav header_support">
                <li className="nav-item border-end">
                    <a className="nav-link fw-bold" aria-current="page" href="#">Cam kết</a>
                </li>
                <li className="nav-item d-flex align-items-center text-primary border-end">
                    <i className="bi bi-check-circle-fill"></i>
                    <a className="nav-link" href="#">100% hàng thật</a>
                </li>
                <li className="nav-item d-flex align-items-center border-end">
                    <i className="bi bi-arrow-repeat text-primary"></i>
                    <a className="nav-link " href="#">Hoàn 200% nếu hàng giả</a>
                </li>
                <li className="nav-item d-flex align-items-center border-end">
                    <i className="bi bi-truck fw-bold text-primary"></i>
                    <a className="nav-link" href="">Giao nhanh 24h</a>
                </li>
                <li className="nav-item d-flex align-items-center">
                    <i className="bi bi-rocket-takeoff text-primary"></i>
                    <a className="nav-link" href="">Giá siêu rẻ</a>
                </li>
            </ul>
            <div
                className="border-top border-gray"></div>
        </div>
    )
}
export default HeaderSupport