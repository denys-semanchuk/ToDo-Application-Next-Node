import { PropsWithChildren, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthToken } from 'store/thunks/authThunks';
import { RootState } from '../../types';
import { AppDispatch } from '../../pages/login';
import { useLoadTasks } from 'hooks/useLoadTasks';
import { useRouter } from 'next/router';

export const AppProvider = memo(({ children }: PropsWithChildren) => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.auth)
  const router = useRouter();

  useLoadTasks()

  useEffect(() => {
    dispatch(checkAuthToken())
  }, [])

  // Disable animations on page transitions for better performance
  const handleRouteChange = () => {
    if ('scrollTo' in window) {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
});

AppProvider.displayName = 'AppProvider';