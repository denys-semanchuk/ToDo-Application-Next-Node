'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from 'store/thunks/authThunks'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { store } from './../app/store/index';
import { GuestGuard } from 'components/GuestGuard/GuestGuard'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});


export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await dispatch(loginThunk(values)).unwrap()
        if (result.user) {
          router.push('/tasks')
        }
      } catch (err) {
        formik.setFieldError('email', 'Invalid credentials')
        console.error('Login failed:', err)
      }
    },
  })

  return (
    <GuestGuard>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="mb-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>

            {(error || formik.errors.password) && (
              <div className="text-red-500 text-sm text-center mt-2">
                {error || formik.errors.password}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link href="/register" className="text-indigo-600 hover:text-indigo-500">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>