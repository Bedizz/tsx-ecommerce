import React from 'react'
import { Link } from 'react-router-dom'

interface BookCardProps {
    product: any
}

const BookCard: React.FC<BookCardProps> = ({product}) => {
  return (
    <div className='border p-4 rounded'>
     <Link to={`/product/${product.id}`}>
     <img src={product.thumbnail} alt={product.name} className='w-full h-32 object-cover mb-2' />
     <h2 className='font-bold'>{product.title}</h2></Link>
    </div>
  )
}

export default BookCard
