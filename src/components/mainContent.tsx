import { Tally3 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useFilter } from "./filterContext"
import axios from 'axios'
import BookCard from './BookCard'

const mainContent = () => {
  const { searchQuery,selectedCategory,minPrice, maxPrice, keyword} = useFilter()
  const [products, setProducts] = useState<any[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [currentPage,setCurrentPage] = useState<number>(1)
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const itemsPerPage = 12;


  useEffect(()=> {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`
    if(keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`
    }
    axios.get(url).then((res) => {
      setProducts(res.data.products)
    }).catch((error) => {
      console.log("Error during fetching",error)
    })
  },[currentPage,keyword])

  const getFilteredProducts = () => {
    let filteredProducts = products
    if(selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory)
    }
    if(minPrice) {
      filteredProducts = filteredProducts.filter((product) => product.price >= minPrice)
    }
    if(maxPrice) {
      filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice)

    }

    if(searchQuery) {
      filteredProducts = filteredProducts.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    switch(filter) {
      case "cheap":
        return filteredProducts.sort((a,b) => a.price - b.price)
      case "expensive":
        return filteredProducts.sort((a,b) => b.price - a.price)
      case "popular":
        return filteredProducts.sort((a,b) => b.rating - a.rating)
        default:
          return filteredProducts
    }
  }
  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage)


  const getPaginationButtons = () => {
    const buttons: number[] = []
    let startPage = Math.max(1,currentPage - 2)
    let endPage = Math.min(totalPages,currentPage + 2)
    if(currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1))
    }
    if(currentPage + 2 > totalPages ) {
      startPage = Math.min(1, startPage - (currentPage - 2 - totalPages))
    }
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page)
    }
    return buttons;
  }
  const filteredProducts = getFilteredProducts()
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <section className='xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5'>
      <div className='mb-5'>
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <div className="relative mb-5 mt-5">
            <button className='border px-4 py-2 rounded-full flex items-center' onClick={(e)=> setDropdownOpen(!dropdownOpen)}>
              <Tally3 className='mr-2' />
              {filter === "all" ? "Filter" : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40" ><button className='block px-4 py-2 w-full text-left hover:bg-gray-200' onClick={()=> setFilter("cheap")}>Cheap</button>
              <button className='block px-4 py-2 w-full text-left hover:bg-gray-200' onClick={()=> setFilter("expensive")}>Expensive</button>
              <button className='block px-4 py-2 w-full text-left hover:bg-gray-200' onClick={()=> setFilter("popular")}>Popular</button></div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 sm:Grid-cols-3 md:grid-cols-4 gap-5">
          { filteredProducts && filteredProducts.map((product) => (
            <BookCard key={product.id} product={product} /> 
          )
          )}
        </div>
        {/* previous  */}
        <div className='flex flex-col sm:flex-row justify-evenly items-center mt-5'>
          <button className='border px-4 py-2 rounded-full' onClick={()=> setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <button className='border px-4 py-2 rounded-full' onClick={()=> setCurrentPage(currentPage + 1)} disabled={filteredProducts.length < itemsPerPage}>Next</button>
          </div>
          {/* pages */}
          <div className='flex flex-wrap justify-center'>
            {getPaginationButtons().map((page) => (
              <button key={page} className={`border px-4 py-2 rounded-full ${currentPage === page ? 'bg-black text-white' : ''}`} onClick={()=> handlePageChange(page)}>{page}</button>
            ))}
          </div>

      </div>
    </section>
  )
}

export default mainContent
