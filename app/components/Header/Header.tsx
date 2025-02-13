import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '../../../pages/login'
import { RootState } from '../../../types'
import { logoutThunk } from 'store/thunks/authThunks'
import { UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await dispatch(logoutThunk())
    router.push('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">
                <Link href='/'>TaskMaster</Link>
              </h1>
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>

          <div className="hidden sm:flex sm:items-center sm:ml-6">
            {isAuthenticated && (
              <nav className="flex space-x-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/tasks"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Tasks
                </Link>
                <Link
                  href='/about'
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
              </nav>
            )}

            <div className="ml-4">
              {isAuthenticated ? (
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center p-2 rounded-full hover:bg-gray-100">
                    <UserCircleIcon className="h-8 w-8 text-gray-600" />
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">
                      {user?.username}
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-indigo-600 text-white px-3 py-2 text-sm rounded-md hover:bg-indigo-700"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          {isAuthenticated && (
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/tasks"
                className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tasks
              </Link>
              <Link
                href="/about"
                className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
              >
                Sign out
              </button>
            </div>
          )}
          {!isAuthenticated && (
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/login"
                className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block w-full text-center bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}