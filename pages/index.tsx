'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from 'types'

export default function RedirectPage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push('/tasks')
      } else {
        router.push('/dashboard')
      }
    }
  }, [isAuthenticated, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return null
}