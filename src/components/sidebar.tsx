import React, { useEffect, useState } from 'react'
import { useFilter } from './filterContext'

interface Product {
    category: string,
}
interface FetchResponse {
    products: Product[]
}


const sidebar = () => {
    const [categories,setCategories] = useState<string[]>([])
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "fashion",
        "trend",
        "shoes",
        "shirt",
    ])
    const {searchQuery,setSearchQuery,selectedCategory,setSelectedCategory,minPrice,setMinPrice,maxPrice,setMaxPrice,keyword,setKeyword} = useFilter()

    useEffect(()=> {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://dummyjson.com/products")
                const data:FetchResponse = await res.json()
                const uniqueCategories = Array.from(new Set(data.products.map((product) => product.category)))
                setCategories(uniqueCategories)
            } catch (error) {
                console.log("Error during fetching",error)
            }
        }
        fetchCategories()
    },[])

    const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseInt(value) : undefined)

    }
    const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseInt(value) : undefined)

    }
    const handleRadioChangeCategories = (category: string ) => {
        setSelectedCategory(category)
    }
    const handleKeyword = (keyword: string) => {
        setKeyword(keyword)
    }
    const handleClear = () => {
        setSearchQuery('')
        setSelectedCategory('')
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setKeyword('')

    }
  return (
    <div className='w-64 p-5 h-screen'>
        <h1 className='text-2xl font-bold mb-10 mt-4'>React Store</h1>
        <section>
            <input type="text" className='border-2 rounded px-2 sm:mb-0' placeholder='Search a product' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </section>
        <div className="flex justify-center items-center">
            <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full" onChange={handleMinPrice} value={minPrice} placeholder='Min' />
            <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full" onChange={handleMaxPrice} value={maxPrice} placeholder="Max" />
        </div>
        {/* CATEGOGIES SECTION */}
      <div className="mb-">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
        <section>
        {categories && categories.map((category,index) => (
            <label key={index} className='block mb-2'>
                <input type="radio" name="category" value={category}  onChange={() => handleRadioChangeCategories(category)} className='mr-2 w-[16px] h-[16px]' checked={selectedCategory === category} />
                {category.toUpperCase().slice(0,1) + category.slice(1)}
            </label>
        ))}
        </section>
        {/* KEYWORDS SECTION */}
        <div className='mb-5'>
            <h2 className='text-xl font-semibold mb-3 '> Keywords</h2>
            <div>
                <section>
                    {keywords && keywords.map((keyword,index) => (
                        <button key={index} className='block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200 focus:bg-gray-300' onClick={() => handleKeyword(keyword)}>
                            {keyword.toUpperCase().slice(0,1) + keyword.slice(1)}
                        </button>
                    ))}
                </section>
            </div>
        </div>
        <button onClick={handleClear} className='w-full mb-[4rem] py-2 bg-black text-white rounded mt-5 '>
            Clear Filters
        </button>
      </div>
    </div>
  )
}

export default sidebar
