// "use client"; 
// import {useEffect,useState} from 'react'
// import { useRouter } from 'next/navigation';


// const Events = () => {

//   const [availableEvents, setAvailableEvents] = useState([]);

//   const router = useRouter();

  
//   useEffect(() => {
//     const fetchSchools = async () => {
//       try {
//         const response = await fetch('/api/getvalues',{
//             method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({}),
//         }); // Replace with your actual API endpoint
//         const data = await response.json();
//         setAvailableEvents(data?.events);
//       } catch (error) {
//         console.error('Error fetching schools:', error);
//       }
//     };

//     fetchSchools();
//   }, []); 

  

//   const handleEventClick = (event) => {
//     router.push(`/events/${event._id}`); 
//   };
//   return (
//     <div className="w-full mx-6">
//       <div className="h-[600px] w-full overflow-auto rounded-lg border border-gray-300  dark:border-gray-700">
//         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//           <thead>
//             <tr className='bg-blue-900 dark:bg-gray-800'>
//               <th className="px-4 py-4 text-left text-3xl font-bold text-white dark:text-white">
//                 Event Title
//               </th>
//               <th className="px-4 py-4 text-left text-3xl font-bold text-white dark:text-white">
//                 Date
//               </th>
//               <th className="px-4 py-4 text-left text-3xl font-bold text-white dark:text-white">
//                 Time
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
//             {availableEvents.length>0 && availableEvents.map((event) => (
//               <tr key={event.id} onClick={() => handleEventClick(event)} className="cursor-pointer">
//                 <td className="px-4 py-4 text-2xl text-blue-900 font-bold hover:underline dark:text-cyan-400">
//                   {event.title}
//                 </td>
//                 <td className="px-4 py-4 text-2xl text-gray-900 dark:text-gray-100">{event.date}</td>
//                 <td className="px-4 py-4 text-2xl text-gray-900 dark:text-gray-100">{event.time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Events;
"use client"; 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define a type for the event data
type Event = {
  _id: string;
  title: string;
  date: string;
  time: string;
};

const Events = () => {
  const [availableEvents, setAvailableEvents] = useState<Event[]>([]); // Type your state
  const router = useRouter();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/getvalues', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();
        setAvailableEvents(data?.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchSchools();
  }, []);

  const handleEventClick = (event: Event) => {
    router.push(`/events/${event._id}/category`); 
  };

  return (
    <div className="w-full mx-6 p-4 sm:p-2">
      <div className="h-[500px] md:h-[600px] w-full overflow-auto rounded-lg border border-gray-300 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className='bg-blue-900 dark:bg-gray-800'>
              <th className="px-4 py-4 text-center text-3xl font-bold text-white dark:text-white">
                Event Title
              </th>
              <th className="px-4 py-4 text-center text-3xl font-bold text-white dark:text-white">
                Date
              </th>
              <th className="px-4 py-4 text-center text-3xl font-bold text-white dark:text-white">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900 text-center">
            {availableEvents.length > 0 && availableEvents.map((event) => (
              <tr key={event._id} onClick={() => handleEventClick(event)} className="cursor-pointer">
                <td className="px-4 py-4 text-2xl text-blue-900 font-bold hover:underline dark:text-cyan-400">
                  {event.title}
                </td>
                <td className="px-4 py-4 text-2xl text-gray-900 dark:text-gray-100">{event.date}</td>
                <td className="px-4 py-4 text-2xl text-gray-900 dark:text-gray-100">{event.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
