import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../types'

export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/tasks')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    )
  }

  return !isAuthenticated ? <>{children}</> : null
}