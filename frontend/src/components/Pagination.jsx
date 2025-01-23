import React from 'react'
import { visiblePagination } from '../until/function'
export default function Pagination({ totalPage, handlePagination, page, visiblePagination }) {
    return (
        <div>
            <ul class="pagination d-flex justify-content-center">
                <li style={{ cursor: 'pointer' }} onClick={() => handlePagination(page - 1)} class={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <a class="page-link">Previous</a>
                </li>

                {visiblePagination(page, totalPage).map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={`page-item ${page === pageNumber ? "active" : ""}`}
                        onClick={() => handlePagination(pageNumber)}
                    >
                        <button className="page-link">{pageNumber}</button>
                    </li>
                ))}

                <li style={{ cursor: 'pointer' }} class={`page-item ${page === totalPage ? "disabled" : ""}`}>
                    <button onClick={() => handlePagination(page + 1)}
                        class="page-link">Next</button>
                </li>
            </ul>
        </div>
    )
}
