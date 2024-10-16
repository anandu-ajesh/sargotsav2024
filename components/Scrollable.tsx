'use client'
import { useEffect, useState } from "react";

// Define TypeScript types for the structure
interface Event {
    score: number; // Adjust according to actual data structure
}

interface School {
    schoolCode: string;
    schoolName: string;
    eventsParticipated: Event[];
    totalPoints?: number; // Optional since we calculate it later
}

const TailwindInfo = () => {
    const [availableSchools, setAvailableSchools] = useState<School[]>([]); // Set type for availableSchools

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

                // Ensure the response contains the 'schools' key and it is an array
                if (data?.schools && Array.isArray(data.schools)) {
                    // Calculate total points for each school based on eventsParticipated
                    const schoolsWithPoints = data.schools.map((school: School) => {
                        const totalPoints = school.eventsParticipated.reduce((acc, event) => acc + event.score, 0);
                        return { ...school, totalPoints }; // Add totalPoints field to each school
                    });

                    // Sort schools by total points in descending order
                    const sortedSchools = schoolsWithPoints.sort((a, b) => b.totalPoints! - a.totalPoints!);

                    setAvailableSchools(sortedSchools);
                } else {
                    console.error('Invalid data format');
                }
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);

    return (
        <div className="h-[500px] w-full m-2 overflow-auto rounded-lg border border-gray-300 dark:border-gray-300 ">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="">
                    <tr className="bg-blue-900 dark:bg-gray-800 ">
                        <th className="px-4 py-4 text-center text-3xl font-bold text-white dark:text-white">Rank</th>
                        <th className="px-4 py-4 text-center text-3xl font-bold text-white dark:text-white">School Code</th>
                        <th className="px-4 py-4 text-center text-3xl font-bold text-white dark:text-white">School Name</th>
                        <th className="px-4 py-4 text-center text-3xl font-bold text-white dark:text-white">Total Points</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-600 text-center">
                    {availableSchools.length > 0 ? (
                        availableSchools.map((item, index) => (
                            <tr key={item.schoolCode}>
                                <td className="px-4 py-4 text-2xl text-gray-900 dark:text-gray-100">{index + 1}</td>
                                <td className="px-4 py-4 text-2xl text-gray-900 dark:text-gray-100">{item.schoolCode}</td>
                                <td className="px-4 font-bold py-4 text-2xl text-blue-900 dark:text-cyan-400">{item.schoolName}</td>
                                <td className="px-4 py-4 text-2xl text-gray-900 dark:text-gray-100">{item.totalPoints}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-4 py-4 text-center text-2xl text-gray-500 dark:text-gray-400">
                                No schools available or no data found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TailwindInfo;

