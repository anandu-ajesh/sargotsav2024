// 'use client'

// import React from 'react'
// import { useRouter, useParams } from 'next/navigation'


// function page() {

//     const router = useRouter()
//     const {eventdetails} = useParams()

//   return (
//     <div className='w-full'>
//       <p>Categories</p>
//       <div className="w-full flex justify-between">
//         <button onClick={()=>router.push(`/events/${eventdetails}/category/selected?category=Category 1`)} className="">Category 1</button>
//         <button onClick={()=>router.push(`/events/${eventdetails}/category/selected?category=Category 2`)} className="">Category 2</button>
//         <button onClick={()=>router.push(`/events/${eventdetails}/category/selected?category=Category 3`)} className="">Category 3</button>
//         <button onClick={()=>router.push(`/events/${eventdetails}/category/selected?category=Category 4`)} className="">Category 4</button>
//       </div>
//     </div>
//   )
// }

// export default page
'use client'

import React from 'react'
import { useRouter, useParams } from 'next/navigation'

function Page() {
  const router = useRouter()
  const { eventdetails } = useParams()

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Select a Category</h1>
      <div className="w-full max-w-2xl flex justify-between m-4 p-6">
        <button
          onClick={() => router.push(`/events/${eventdetails}/category/selected?category=Category 1`)}
          className="px-8  py-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Category 1
        </button>
        <button
          onClick={() => router.push(`/events/${eventdetails}/category/selected?category=Category 2`)}
          className="px-8  py-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Category 2
        </button>
        <button
          onClick={() => router.push(`/events/${eventdetails}/category/selected?category=Category 3`)}
          className="px-8  py-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
        >
          Category 3
        </button>
        <button
          onClick={() => router.push(`/events/${eventdetails}/category/selected?category=Category 4`)}
          className="px-8  py-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Category 4
        </button>
      </div>
    </div>
  )
}

export default Page
