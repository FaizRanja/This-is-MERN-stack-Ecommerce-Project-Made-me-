import React from 'react'
import {Link}from 'react-router-dom'
import { Rating } from '@mui/material'


const ProductCard = ({product}) => {
  const options = {
    size:"medium",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,

}
  return (
 <Link className='prductCard' to={`/product/${product._id}`}>
 <img src={product.images[0].url} alt={product.name} />
 <p>{product.name}</p>
 <div>
<Rating {...options} /> <span className='rewies' >({product.numOfReviews}Rewies)</span>
 </div>
 <span> $ {product.price}</span>
 </Link>
  )
}

export default ProductCard
