"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa"; // Importing icons
import toast from "react-hot-toast";

const UserTable = () => {
  const searchParams = useSearchParams();
  const [availableSchools, setAvailableSchools] = useState([]);
  const [event, setEvent] = useState("");
  const [category, setCategory] = useState("");
  const [participants, setParticipants] = useState({});
  const [editing, setEditing] = useState({});
  const [actionInputs, setActionInputs] = useState({});

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

      if (data?.schools && Array.isArray(data.schools)) {
        const eventParam = searchParams.get("event");
        const categoryParam = searchParams.get("category");

        // Filter schools that have participated in the specified event and category
        const filteredSchools = data.schools.filter((school) =>
          school.eventsParticipated.some(
            (event) =>
              event.eventName === eventParam && event.category === categoryParam
          )
        );

        // Map through the filtered schools to calculate total points
        const schoolsWithPoints = filteredSchools.map((school) => {
          const totalPoints = school.eventsParticipated.reduce((acc, event) => {
            return event.eventName === eventParam && event.category === categoryParam
              ? acc + event.score
              : acc;
          }, 0);
          return { ...school, totalPoints };
        });

        const sortedSchools = schoolsWithPoints.sort(
          (a, b) => b.totalPoints - a.totalPoints
        );

        const res = await fetch("/api/getparticipants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId: eventParam, category: categoryParam }),
        });

        const data2 = await res.json();

      

        const participantsArray = Array.isArray(data2.participants) ? data2.participants : [];


      // Map participants to the respective schools
      const schoolsWithParticipants = sortedSchools.map((school) => {
        const schoolParticipants = participantsArray.find(
          (participant) => participant.schoolId === school._id
        );
        return {
          ...school,
          participants: schoolParticipants ? schoolParticipants.names : [],
        };
      });

      setAvailableSchools(schoolsWithParticipants);
      } else {
        console.error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [searchParams]);
  

  useEffect(() => {
    const eventParam = searchParams.get("event");
    const categoryParam = searchParams.get("category");

    if (eventParam && categoryParam) {
      setEvent(eventParam);
      setCategory(categoryParam);
    }
  }, [searchParams]);

  const handleInputChange = (index, value) => {
    setActionInputs((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleEditParticipants = (index) => {
    setEditing((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAddParticipant = (index, e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const newParticipant = e.target.value.trim();
      setParticipants((prev) => ({
        ...prev,
        [index]: [...(prev[index] || []), newParticipant],
      }));
      e.target.value = ""; // Clear input field
    }
  };

  const handleRemoveParticipant = (index, participant) => {
    setParticipants((prev) => ({
      ...prev,
      [index]: prev[index].filter((p) => p !== participant),
    }));
  };

  const handleSubmit = async (index) => {
    const school = availableSchools[index];
    const eventObj = school.eventsParticipated.find(
      (item) => item.eventName === event && item.category === category
    );
    const participantsList = participants[index] || eventObj.participants;

    const schoolId = school._id;

    try {
      const response = await fetch("/api/updatepoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schoolId,
          eventId: eventObj.eventName,
          category: eventObj.category,
          participants: participantsList,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json()

  

      toast .success("Update successful");
      setEditing((prev) => ({ ...prev, [index]: false }));
    } catch (error) {
      console.error("Error updating school:", error);
    }finally{
      fetchSchools()
    }
  };

  const updateScore = async (index, action) => {
    try {
      const school = availableSchools[index];
      const points = parseInt(actionInputs[index], 10);
      const eventObj = school.eventsParticipated.find(
        (item) => item.eventName === event && item.category === category
      );

      if (!eventObj) {
        toast.error("Event not found");
        return;
      }

      const response = await fetch("/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schoolId: school._id,
          points,
          action,
          eventName: eventObj.eventName,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.message === "Score updated successfully") {
        toast.success("Score updated");
      } else {
        toast.error("Score not updated");
      }

      setAvailableSchools((prev) => prev.map((s, i) =>
        i === index
          ? {
              ...s,
              totalPoints: s.eventsParticipated.reduce(
                (acc, evt) =>
                  evt.eventName === event && evt.category === category
                    ? acc + evt.score
                    : acc,
                0
              ),
            }
          : s
      ));
    } catch (error) {
      console.error(error);
      toast.error("Error updating score");
    }finally{
      setActionInputs((prev) => ({
        ...prev,
        [index]: 0,
      }));
      fetchSchools()
    }
  };

  return (
    <div className="max-w-full mx-auto p-4 m-20">
      <h1 className="text-4xl font-bold pb-8">
        {event && category ? `${event} / ${category}` : ""}
      </h1>
      <table className="min-w-full border-collapse block md:table mx-auto text-center">
        {/* Table Headers */}
        <thead className="block md:table-header-group">
          <tr className="block md:table-row">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left md:text-center block md:table-cell">School Name</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left md:text-center block md:table-cell">School Code</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left md:text-center block md:table-cell">Points</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left md:text-center block md:table-cell">Participants</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left md:text-center block md:table-cell">Actions</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className="block md:table-row-group">
  {availableSchools.map((school, index) => (
    <tr key={school._id} className={`${index % 2 === 0 ? "bg-gray-300" : "bg-white"} border border-grey-500 md:border-none block md:table-row`}>
      <td className="p-2 md:border md:border-grey-500 text-left md:text-center block md:table-cell">{school.schoolName}</td>
      <td className="p-2 md:border md:border-grey-500 text-left md:text-center block md:table-cell">{school.schoolCode}</td>
      <td className="p-2 md:border md:border-grey-500 text-left md:text-center block md:table-cell">{school.totalPoints}</td>
      <td className="p-2 md:border md:border-grey-500 text-left md:text-center block items-center justify-center md:table-cell">
        {editing[index] ? (
          <div>
            {participants[index]?.map((participant, pIndex) => (
              <span className="bg-blue-500 text-white mb-2 mr-2 px-2 py-1 rounded-lg inline-block" key={pIndex}>
                {participant}
                <button onClick={() => handleRemoveParticipant(index, participant)}>&times;</button>
              </span>
            ))}
            <div className="flex gap-2">
              <input
              type="text"
              onKeyDown={(e) => handleAddParticipant(index, e)}
              placeholder="Add participant"
              className="border-2 rounded p-2 w-full"
            />
            <button onClick={() => handleSubmit(index)}><FaCheck /></button>
            <button onClick={() => handleEditParticipants(index)}><FaTimes /></button></div>

          </div>
        ) : (
          <div className="">
            <span>{school.participants.length > 0 ? school.participants.join(", ") : "No participants"}</span>
            <button className="ml-2" onClick={() => handleEditParticipants(index)}><FaPencilAlt /></button>
          </div>
        )}
      </td>
      <td className="p-2 md:border md:border-grey-500 text-left md:text-center flex justify-center items-center">
        <input
          type="number"
          value={actionInputs[index] || ""}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
        <div className="flex justify-center space-x-2 ml-2">
          <button className="bg-green-500 text-white px-2 py-1 rounded-lg inline-block" onClick={() => updateScore(index, "bonus")}>Bonus</button>
          <button className="bg-red-500 text-white px-2 py-1 rounded-lg inline-block" onClick={() => updateScore(index, "minus")}>Minus</button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default UserTable;