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
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}