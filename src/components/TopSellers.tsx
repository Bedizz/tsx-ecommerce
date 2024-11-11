import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Author {
    name: string,
    isFollowing: boolean,
    image: string,
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get("https://randomuser.me/api/?results=5")
            setAuthors(res.data.results)
            console.log(authors)
        } catch (error) {
            console.log("error during fetching",error)
        }
    }
    fetchData()
  },[])
    return (

    <div className='bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded'>
       <h2 className='text-xl font-bold'>Top Sellers</h2>
      <ul>
        {authors && authors.map((author,index) => (
            <li key={index} className='flex items-center justify-between mb-4'>
                <img src={author.picture.medium} alt={author.name} className='w-[25%] h-[25%] justify-center rounded-full' />
                <span className='ml-4'>{author.name.first} {author.name.last} </span>
            </li>
        )
        )}
      </ul>
    </div>
  )

}


export default TopSellers
