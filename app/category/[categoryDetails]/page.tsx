

"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// Define types for school and events
type Event = {
  category: string;
  score: number;
};

type School = {
  schoolName: string;
  eventsParticipated: Event[];
};

const CategoryDetails = () => {
  const params = useParams();
  let { categoryDetails } = params;

  // Ensure categoryDetails is a string before decoding
  if (Array.isArray(categoryDetails)) {
    categoryDetails = categoryDetails[0];
  }
  categoryDetails = decodeURIComponent(categoryDetails);
  
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`/api/getvalues`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}) // Include any relevant data here
        });
        const data = await response.json();
        setSchools(data?.schools);
      } catch (error) {
        console.error('Failed to fetch schools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [categoryDetails]);

  const categorySchools = schools.filter((school) => {
    return school.eventsParticipated.some((event) => event.category === categoryDetails);
  });

  const schoolPoints = categorySchools.map((school) => {
    const totalPoints = school.eventsParticipated.reduce((acc, event) => {
      if (event.category === categoryDetails) {
        return acc + event.score;
      }
      return acc;
    }, 0);
    return { schoolName: school.schoolName, totalPoints };
  });

  // Sort schoolPoints by totalPoints in descending order
  const sortedSchoolPoints = schoolPoints.sort((a, b) => b.totalPoints - a.totalPoints);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-[600px] overflow-auto rounded-lg border border-gray-300 dark:border-gray-700 my-5 mx-10">
      <table className="min-w-full divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr className="bg-blue-900 dark:bg-gray-800">
            <th className="text-3xl py-4 text-center font-bold text-white dark:text-white">
              School Name
            </th>
            <th className="text-3xl py-4 text-center font-bold text-white dark:text-white">
              Total Points
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {sortedSchoolPoints.map((schoolPoint) => (
            <tr key={schoolPoint.schoolName}>
              <td className="py-4 text-center align-middle text-2xl font-bold text-blue-900 dark:text-cyan-400">
                {schoolPoint.schoolName}
              </td>
              <td className="py-4 text-center align-middle text-2xl text-gray-900 dark:text-gray-100">
                {schoolPoint.totalPoints}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryDetails;
