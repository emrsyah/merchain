import React from 'react'
import { useParams } from 'react-router-dom';

function StoreItem() {
    const { productId } = useParams();

  return (
    <div>{productId}</div>
  )
}

export default StoreItem