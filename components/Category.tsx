import Link from 'next/link'

const categories = [
  {
    id: 1,
    name: 'Category 1',
    link: '/category/Category 1',
  },
  {
    id: 2,
    name: 'Category 2',
    link: '/category/Category 2',
  },
  {
    id: 3,
    name: 'Category 3',
    link: '/category/Category 3',
  },
  {
    id: 4,
    name: 'Category 4',
    link: '/category/Category 4',
  },
  {
    id: 5,
    name: 'Common',
    link: '/category/Common',
  },
  // Add more categories as needed
]

const CategoriesPage = () => {
  return (
    <div className="h-[500px] md:h-[600px] w-full overflow-auto rounded-lg border border-gray-300 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr className="bg-blue-900 dark:bg-gray-800">
            <th className="text-3xl  py-4 text-center font-bold text-white dark:text-white">
              Category No
            </th>
            <th className="text-3xl  py-4 text-center font-bold text-white dark:text-white">
              Category Name
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-4 py-4 text-center align-middle text-2xl text-gray-900 dark:text-gray-100">
                {category.id}
              </td>
              <td className="px-4 py-2 text-center align-middle text-2xl font-bold text-gray-900 dark:text-gray-100">
                <Link href={category.link} className="text-blue-900 hover:underline dark:text-cyan-400">
                  {category.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesPage
