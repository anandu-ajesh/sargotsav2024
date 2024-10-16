import mongoose, { connect } from 'mongoose'
import {Event} from '../../../../../../../models/eventsSchema'
import {Participant} from '../../../../../../../models/participantSchema'
import {School} from '../../../../../../../models/schoolSchema'


const TopPositions = ({ positions }) => {

  console.log(positions.names)

  return (
    <div className="flex justify-center space-x-14 mt-10 p-20 ">
      <div className="flex flex-col items-center transition-transform transform hover:scale-105">
        <div className="w-36 h-36 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
          1
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-800">{positions[0].names.join(', ')}</h3>
      </div>
    </div>
  );
};

export default async function Home({params}) {
  await connect(process.env.MONGO_URI);
  const { eventdetails , schoolcode } = params;
  const schoolId = await School.findOne({schoolCode: schoolcode})
  const event = await Event.findById(eventdetails)
  const eventName = event.title || ''
  const participant = await Participant.find({eventId: eventName, schoolId: schoolId})

  return (
    <div className="container mx-auto p-6 h-screen md:h-[800px] bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Top 3 Students</h1>
      <TopPositions positions={participant} />
    </div>
  );
}
