// pages/admin.js
"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Admin = () => {
  const [schoolName, setSchoolName] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [schoolLoc, setSchoolLoc] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');


  const router = useRouter();

  const handleAddSchool = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/schools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ schoolName, schoolCode, schoolLoc }),
    });
    const { message } = await response.json()
    
    if (message === "school Added") {
      toast.success("School Added Successfully")
    }
    else {
      toast.error("Something Went wrong")
    }
    setSchoolName('');
    setSchoolCode('');
    setSchoolLoc('');
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventTitle, eventDate, eventTime }),
    });
    const data = await response.json()

    if (data?.message === "Event Added") {
      toast.success("Event Added Successfully")
    }
    else{
      toast.error("Something Went wrong")
    }
    setEventTitle('');
    setEventDate('');
    setEventTime('');
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: categoryName }),
    });
    setCategoryName('');
  };

  const handleUpdatePointsClick = () => {
    router.push('/dashboard/UpdatePoints'); // Navigate to the update points page
  };
  const handleParticipationPoints = () => {
    router.push('/dashboard/ParticipationPoints'); // Navigate to the update points page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-bold mb-6 dark:text-black">Admin Page</h1>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-2 m-2 rounded hover:bg-blue-600 transition duration-200"
            onClick={handleParticipationPoints}
          >
            Participation 
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-2 rounded hover:bg-blue-600 transition duration-200"
            onClick={handleUpdatePointsClick}
          >
            Update Points
          </button>
        </div>
      </div>


      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Add School</h2>
        <form onSubmit={handleAddSchool}>
          <input
            type="text"
            placeholder="School Name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full mb-4 dark:text-black"
          />
          <input
            type="text"
            placeholder="School Code"
            value={schoolCode}
            onChange={(e) => setSchoolCode(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full mb-4  dark:text-black"
          />
          <input
            type="text"
            placeholder="School Adress"
            value={schoolLoc}
            onChange={(e) => setSchoolLoc(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full mb-4  dark:text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add School
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Event</h2>
        <form onSubmit={handleAddEvent}>
          <input
            type="text"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full mb-4  dark:text-black"
          />
          <input
            type="text"
            placeholder="Event Date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full mb-4  dark:text-black"
          />
          <input
            type="text"
            placeholder="Event Time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full mb-4  dark:text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Event
          </button>
        </form>
      </div>

      {/* <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
        <form onSubmit={handleAddCategory}>
          <input
            type="text"
            placeholder="Category Id"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Category
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default Admin;
