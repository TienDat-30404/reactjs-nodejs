import React from 'react'
import Header from '../components/Header/Header'
export default function SearchLayout({children}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
