import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '../../../pages/login'
import { RootState } from 'types'
import { logoutThunk } from 'store/thunks/authThunks'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export const AuthHeader = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)

  const handleLogout = async () => {
    await dispatch(logoutThunk())
    router.push('/login')
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">TodoApp</h1>
            </div>
          </div>
          
          <div className="flex items-center">
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
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  )
}