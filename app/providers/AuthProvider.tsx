import { PropsWithChildren, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthToken } from 'store/thunks/authThunks';
import { RootState } from 'types';
import { AppDispatch } from '../../pages/login';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(checkAuthToken())
  }, [dispatch])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    )
  }

  return <>
    {children}
  </>
}