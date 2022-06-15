import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

function StoreLayout() {
    const { storeName, productId } = useParams();
    console.log(storeName, productId)
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default StoreLayout