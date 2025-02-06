import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '../../../pages/login'
import { RootState } from 'types'
import { logoutThunk } from 'store/thunks/authThunks'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const handleLogout = async () => {
    await dispatch(logoutThunk())
    router.push('/login')
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-3xl font-bold text-indigo-600"><Link href='/'>TaskMaster</Link></h1>
            </div>
          </div>

          {isAuthenticated && (
            <nav className="flex ml-auto">
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
              <Link href='/about'
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >About</Link>
            </nav>
          )}

          <div className="flex items-center">
            {isAuthenticated ? (
              <Menu as="div" className="ml-3 relative">
                <Menu.Button className="flex items-center p-2 rounded-full hover:bg-gray-100">
                  <UserCircleIcon className="h-8 w-8 text-gray-600" />
                  <span className="ml-2 text-sm font-medium text-gray-700">
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
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
                  className="text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}