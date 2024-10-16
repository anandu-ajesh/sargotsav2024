import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Scrollable from '@/components/Scrollable'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div
        className=" bg-center bg-cover h-full"
        style={{
          // backgroundImage: `url('/static/images/bag2.jpeg')`, 
          // backgroundSize: '88%',

        }}
      >
        <div className="space-y-2 p-3 md:space-y-5">
          <h1 className="flex items-center justify-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Score Board
          </h1>
        </div>
        <div className="flex justify-center ">
          <Scrollable />
        </div>
        <div className="m-10 flex justify-center space-x-4">
          <Link href="/events" className="w-full max-w-xs">
            <button className="w-full rounded-lg bg-blue-600 py-4 text-lg font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400">
              Events
            </button>
          </Link>
          <Link href="/school" className="w-full max-w-xs">
            <button className="w-full rounded-lg bg-green-600 py-4 text-lg font-bold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-400">
              Schools
            </button>
          </Link>
          <Link href="/category" className="w-full max-w-xs">
            <button className="w-full rounded-lg bg-red-600 py-4 text-lg font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-400">
              Category
            </button>
          </Link>

        </div>
        <div className="flex justify-end m-6 font-mono text-black">
          Powered by  Techosa
        </div>
      </div>
    </>
  )
}
