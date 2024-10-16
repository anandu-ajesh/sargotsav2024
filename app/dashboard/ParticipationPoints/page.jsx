'use client'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import toast from "react-hot-toast";

export default function ParticipationForm() {
    const [selectedSchool, setSelectedSchool] = useState([]);
    const [availableSchools, setAvailableSchools] = useState([]);
    const [availableEvents, setAvailableEvents] = useState([]);
    const [event, setEvent] = useState("");
    const [category, setCategory] = useState("");


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

                setAvailableSchools(data?.schools.map(school => ({
                    value: school.schoolName,
                    label: school.schoolName
                })));
                setAvailableEvents(data?.events);
            } catch (error) {
                console.error("Error fetching schools:", error);
            }
        };

        fetchSchools();
    }, []);

    const handleSchoolChange = (selectedOptions) => {
        setSelectedSchool(selectedOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            if(!selectedSchool || !event || !category ){
                toast.error('please fill the fields!')
                return
            }
            const schools = selectedSchool.map((school)=> school.value)

            const response = await fetch('/api/participationpoints', {
                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({schools, event, category}),
            })

            const data = await response.json()

            console.log(data)

            if(data?.message === "Participation updated successfully"){
                toast.success("Participation Confirmed")
            }else{
                toast.error(data?.message)
            }
        }catch(error){
            console.log(error)
            toast.error('something went wrong')
        }
    }

    return (
        <div className="flex flex-col h-screen md:h-full items-center justify-center">
            <div className="m-6 text-3xl font-bold">Add Participation</div>
            <form onSubmit={handleSubmit} className="w-[350px] sm:w-[600px] rounded border bg-white p-4 shadow-md">
                <div className="mb-4">
                    <label htmlFor="event" className="mb-2 block font-semibold text-gray-700">
                        Select Event
                    </label>
                    <select id="event" value={event}
                        onChange={(e) => setEvent(e.target.value)} className="w-full rounded-lg border border-gray-300 p-2">
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
                    <label htmlFor="category" className="mb-2 block font-semibold text-gray-700">
                        Select Category
                    </label>
                    <select id="category" value={category}
                        onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-gray-300 p-2">
                        <option value="">Select a Category</option>
                        <option value="Category 1">Category 1</option>
                        <option value="Category 2">Category 2</option>
                        <option value="Category 3">Category 3</option>
                        <option value="Category 4">Category 4</option>
                        <option value="Common">Common</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="text-md block font-bold text-black">Select Schools</label>
                    <Select
                        isMulti
                        name="schools"
                        value={selectedSchool}
                        onChange={handleSchoolChange}
                        options={availableSchools}
                        className="basic-multi-select px-3 py-2"
                        classNamePrefix="select"
                    />
                </div>

            
                <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Add 
                </button>
            </form>
        </div>
    )
}
