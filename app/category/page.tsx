import CategoriesPage from '@/components/Category'



export default async function Page() {
  
  return (
    <div className="">
      <div className=" flex flex-col items-start text-left justify-start  divide-gray-200 dark:divide-gray-700 md:flex md:items-center md:justify-center m-4 md:divide-y-0">
        <div className="space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-cyan-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Category
          </h1>
        </div>
        <div className="w-full flex justify-center mt-10">
          <CategoriesPage/>
        </div>
      </div>
    </div>
  )
}
