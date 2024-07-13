const HeaderSupport = () => {
    return (
        <div>
            <div className="container mt-1 mb-1">
                <ul class="nav header_support">
                    <li class="nav-item border-end">
                        <a class="nav-link fw-bold" aria-current="page" href="#">Cam kết</a>
                    </li>
                    <li class="nav-item d-flex align-items-center text-primary border-end">
                        <i class="bi bi-check-circle-fill"></i>
                        <a class="nav-link" href="#">100% hàng thật</a>
                    </li>
                    <li class="nav-item d-flex align-items-center border-end">
                        <i class="bi bi-arrow-repeat text-primary"></i>
                        <a class="nav-link " href="#">Hoàn 200% nếu hàng giả</a>
                    </li>
                    <li class="nav-item d-flex align-items-center border-end">
                        <i class="bi bi-truck fw-bold text-primary"></i>
                        <a class="nav-link" href="">Giao nhanh 24h</a>
                    </li>
                    <li class="nav-item d-flex align-items-center">
                        <i class="bi bi-rocket-takeoff text-primary"></i>
                        <a class="nav-link" href="">Giá siêu rẻ</a>
                    </li>
                </ul>
            </div>
            <div class="border-top border-gray"></div>
        </div>
    )
}
export default HeaderSupport