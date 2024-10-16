// 'use client'

// import { useState, useEffect } from 'react'

// const SchoolsList = () => {

//   const [schools, setSchools] = useState([])

//   useEffect(()=>{
//     async function  fetchSchools(){
//         const res = await fetch('/api/getvalues', {
//           method: 'POST',
//           headers: {
//             'Content-type': 'application/json',
//           },
//           body: JSON.stringify({

//           })
//         })
//         const data = await res.json()
      
//         setSchools(data.schools ? data?.schools : [])
//     }
//     fetchSchools()
//   },[])
//   return (
//     <div className="h-[550px] w-full overflow-auto rounded-lg border border-gray-300 dark:border-gray-700 ">
//       <table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-700">
//         <thead>
//           <tr className="bg-blue-900 dark:bg-gray-800">
//             <th className="px-4 py-4 text-left text-3xl font-bold text-white dark:text-white">
//               School Name
//             </th>
//             <th className="px-4 py-4 text-left text-3xl font-bold text-white dark:text-white">
//               School Code
//             </th>
//             <th className="px-4 py-4 text-left text-3xl font-bold text-white dark:text-white">
//               Location
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
//           {schools.length > 0 && schools.map((school) => (
//             <tr key={school._id}>
//               <td className="px-4 py-4 text-2xl text-gray-900 dark:text-gray-100">
//                 <p className="text-blue-900 dark:text-cyan-400  font-bold text-2xl p-4">
//                   {school.schoolName}
//                 </p>
//               </td>
//               <td className="px-4 py-4 text-2xl text-gray-900 dark:text-gray-100">{school.schoolCode}</td>
//               <td className="px-4 py-4 text-2xl text-gray-900 dark:text-gray-100">
//                 {school.schoolLoc}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default SchoolsList
'use client'

import { useState, useEffect } from 'react';

// Define the School type based on the data structure
type School = {
  _id: string;
  schoolName: string;
  schoolCode: string;
  schoolLoc: string;
};

const SchoolsList = () => {
  // Set the initial type of schools state to an array of School type
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    async function fetchSchools() {
      const res = await fetch('/api/getvalues', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      // Ensure proper type checking
      setSchools(data.schools ? data.schools : []);
    }
    fetchSchools();
  }, []);

  return (
    <div className="h-[520px] md:h-[600px] w-full overflow-auto rounded-lg border border-gray-300 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr className="bg-blue-900 dark:bg-gray-800">
            <th className="px-4 py-4 text-center text-3xl font-bold text-white dark:text-white">
              School Name
            </th>
            <th className="px-4 py-4 text-center text-3xl font-bold text-white dark:text-white">
              School Code
            </th>
            <th className="px-4 py-4 text-center text-3xl font-bold text-white dark:text-white">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900 text-center">
          {schools.length > 0 &&
            schools.map((school) => (
              <tr key={school._id}>
                <td className="px-4 py-3 text-2xl text-gray-900 dark:text-gray-100">
                  <p className="text-blue-900 dark:text-cyan-400 font-bold text-2xl p-4">
                    {school.schoolName}
                  </p>
                </td>
                <td className="px-4 py-3 text-2xl text-gray-900 dark:text-gray-100">
                  {school.schoolCode}
                </td>
                <td className="px-4 py-3 text-2xl text-gray-900 dark:text-gray-100">
                  {school.schoolLoc}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolsList;
