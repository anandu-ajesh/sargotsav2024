// import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import Events from '@/components/Events'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="w-full">
        <div className="w-full space-y-2 pb-4 pt-4 md:space-y-5">
          <h1 className="text-3xl mx-6 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-cyan-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Events
          </h1>
        </div>
        <div className="flex justify-center w-full">
          <Events/>
        </div>
      </div>
    </>
  )
}
