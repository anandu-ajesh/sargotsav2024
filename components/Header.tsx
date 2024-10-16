'use client'
import siteMetadata from '@/data/siteMetadata'
import Logo from '@/data/logo1.png'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


const Header = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  let headerClass = 'flex items-center w-full bg-blue-950 dark:bg-gray-950 justify-between '
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50 '
  }

  return (
    <header className={headerClass}>
      <div className="m-2 flex w-full items-center justify-between  dark:bg-gray-950">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between p-2">
            <div className=" flex justify-center items-center mr-3 h-12 w-12 sm:h-20 sm:w-20">
              <Image
                src={Logo} // Path to your image
                alt="Logo"
                className="object-contain"
              />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-3xl font-bold text-white  sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
        <div className="m-4 flex items-center space-x-4 leading-5 sm:space-x-6">
          <div className="text-white font-extrabold text-2xl">
            <h1>KOLLAM SAHODAYA</h1>
          </div>
          <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
            {session && (
              <p
                onClick={() => router.push('/dashboard')}
                className="block cursor-pointer font-medium text-white hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              >
                DASHBOARD
              </p>
            )}
            {session ? (
              <p
                onClick={() => signOut({ callbackUrl: '/' })}
                className="block cursor-pointer font-medium text-white hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              >
                LOGOUT
              </p>
            ) : (
              <Link
                href={'/sign-in'}
                className="block font-medium text-white hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              ><div className="bg-white rounded-md text-blue-900 p-2">LOGIN</div>
                
              </Link>
            )}
          </div>
          {/* <SearchButton /> */}
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
