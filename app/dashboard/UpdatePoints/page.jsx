"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import toast from "react-hot-toast";

const UpdatePointsPage = () => {
  const router = useRouter(); 

  const [availableEvents, setAvailableEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("/api/getvalues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();

        setAvailableEvents(data?.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchSchools();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEvent && selectedCategory) {
     
      router.push(`/dashboard/UpdatePoints/data?event=${selectedEvent}&category=${selectedCategory}`);
    } else {
      toast.error("Please select an event and category.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Points</h1>
      <form className="m-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="event"
            className="block text-gray-700 font-semibold mb-2"
          >
            Select Event
          </label>
          <select
            id="event"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">Select an Event</option>
            {availableEvents.length > 0 &&
              availableEvents.map((event, index) => (
                <option key={index} value={event.title}>
                  {event.title}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-semibold mb-2"
          >
            Select Category
          </label>
          <select
            id="category"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            <option value="Category 3">Category 3</option>
            <option value="Category 4">Category 4</option>
            <option value="Common">Common</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full"
        >
          NEXT
        </button>
      </form>
    </div>
  );
};

export default UpdatePointsPage;
