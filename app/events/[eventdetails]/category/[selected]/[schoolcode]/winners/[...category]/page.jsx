

// import mongoose, { connect } from 'mongoose';
// import { School } from '../../../../../../../../models/schoolSchema';
// import { Participant } from '../../../../../../../../models/participantSchema';
// import {Event} from '../../../../../../../../models/eventsSchema'

// const TopPositions = ({ positions }) => {


//     if (!positions || positions.length === 0) {
//       return <div>No top participants available.</div>;
//     }
  
//     return (
//       <div className="flex justify-center space-x-14 mt-10 pb-14">
//       {positions.map((position, index) => (
//         <div key={index} className="flex flex-col items-center transition-transform transform hover:scale-105">
//           <div className={`w-36 h-36 rounded-full ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'} flex items-center justify-center text-white text-5xl font-bold shadow-lg`}>
//             {index + 1}
//           </div>
//           <h3 className="mt-4 text-lg font-semibold text-gray-800">{position.names}</h3>
//           <p className="text-sm text-gray-600">Score: {position.score}</p>
//         </div>
//       ))}
//     </div>
//     );
//   };


// export default async function Price({ params }) {
//   await connect(process.env.MONGO_URI);
  
//   let { eventdetails, schoolcode, category } = params;
//   category = decodeURIComponent(category);


//   try {
//     // Fetch the schools that participated in this event and category
//     const event = await Event.findById(eventdetails)
//     const eventName = event.title || ''
 
//     const schools = await School.find({
//       'eventsParticipated.eventName': eventName,
//       'eventsParticipated.category': category
//     }).lean();


//     // Extract participants and scores for the event
//     let participantsData = [];
//     for (let school of schools) {
//       const event = school.eventsParticipated.find(event => event.eventName === eventName && event.category === category);

//       if (event) {
//         const participants = await Participant.find({ 
//           schoolId: school._id,
//           eventId: eventName,
//           category: category
//         }).lean();
        
//         participants.forEach(participant => {
//           participantsData.push({
//             names: participant.names,
//             score: event.score // Use the score from the school's event
//           });
//         });
//       }
//     }
   

//     // Sort participants based on score in descending order
//     participantsData.sort((a, b) => b.score - a.score);

//     // Get the top 3 participants
//     const topParticipants = participantsData.slice(0, 3);

//     return (
//       <div className="container mx-auto p-6 h-screen md:h-[800px] bg-gray-100 rounded-lg shadow-md">
//         <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Top 3 Students</h1>
//         <TopPositions positions={topParticipants} />
//       </div>
//     );
//   } catch (error) {
//     console.error('Error fetching top participants:', error);
//     return <div>Error loading top participants.</div>;
//   }
// }

import mongoose, { connect } from 'mongoose';
import { School } from '../../../../../../../../models/schoolSchema';
import { Participant } from '../../../../../../../../models/participantSchema';
import {Event} from '../../../../../../../../models/eventsSchema'

const TopPositions = ({ positions }) => {
  if (!positions || positions.length === 0) {
    return <div>No top participants available.</div>;
  }

  return (
    <div className="flex justify-center space-x-14 mt-10 pb-14">
      {positions.map((position, index) => {
        return(
        <div key={index} className="flex flex-col items-center transition-transform transform hover:scale-105">
          <div className={`w-36 h-36 rounded-full ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'} flex items-center justify-center text-white text-5xl font-bold shadow-lg`}>
             {Object.keys(positions).length === 3 ? index + 1 :(index == 2 ? index : index === 3 ? index : index+1)} {/* Display the rank instead of index */}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">{position.names}</h3>
          <p className="text-sm text-gray-600">Score: {position.score}</p>
        </div>
      )})}
    </div>
  );
};

export default async function Price({ params }) {
  await connect(process.env.MONGO_URI);
  
  let { eventdetails, schoolcode, category } = params;
  category = decodeURIComponent(category);

  try {
    // Fetch the schools that participated in this event and category
    const event = await Event.findById(eventdetails)
    const eventName = event.title || ''
 
    const schools = await School.find({
      'eventsParticipated.eventName': eventName,
      'eventsParticipated.category': category
    }).lean();

    // Extract participants and scores for the event
    let participantsData = [];
    for (let school of schools) {
      const event = school.eventsParticipated.find(event => event.eventName === eventName && event.category === category);

      if (event) {
        const participants = await Participant.find({ 
          schoolId: school._id,
          eventId: eventName,
          category: category
        }).lean();
        
        participants.forEach(participant => {
          participantsData.push({
            names: participant.names,
            score: event.score // Use the score from the school's event
          });
        });
      }
    }
   

    // Sort participants based on score in descending order
    participantsData.sort((a, b) => b.score - a.score);

    // Group participants by score
    const groupedParticipants = {};
    participantsData.forEach(participant => {
      if (!groupedParticipants[participant.score]) {
        groupedParticipants[participant.score] = [];
      }
      groupedParticipants[participant.score].push(participant);
    });

    // Create a ranked list
    const rankedParticipants = [];
    let rank = 1;

    for (const score in groupedParticipants) {
      const participantsAtScore = groupedParticipants[score];
      rankedParticipants.push({
        rank,
        participants: participantsAtScore
      });
       // Increase rank by the number of participants at this score
       rank += participantsAtScore.length;
    }
    

    // Get the top participants (up to 3 ranks)
    const topParticipants = rankedParticipants.slice(0, 3).flatMap(group => 
      group.participants.map(participant => ({
        ...participant,
        rank: group.rank // Attach the rank to each participant
      }))
    );

    topParticipants.reverse()

    return (
      <div className="container mx-auto p-6 h-screen md:h-[800px] bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Top Participants</h1>
        <TopPositions positions={topParticipants} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching top participants:', error);
    return <div>Error loading top participants.</div>;
  }
}

