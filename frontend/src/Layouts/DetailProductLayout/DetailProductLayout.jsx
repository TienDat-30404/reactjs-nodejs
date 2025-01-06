import React from 'react'
import Detail from '../../pages/DetailProduct/DetailProduct'
import Header from '../components/Header/Header'
export default function DetailProductLayout({children}) {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}
