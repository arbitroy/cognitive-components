'use client'
import React, { useState, FormEvent } from 'react'

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred.')
      }
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center
                        justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg
                            shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold
                               text-center mb-6">
          Register
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-2 text-sm
                                          font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border
                                       border-gray-300 rounded-md
                                       focus:outline-none focus:ring-2
                                       focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm
                                          font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border
                                       border-gray-300 rounded-md
                                       focus:outline-none focus:ring-2
                                       focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm
                                          font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border
                                       border-gray-300 rounded-md
                                       focus:outline-none focus:ring-2
                                       focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium
                                          text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border
                                       border-gray-300 rounded-md
                                       focus:outline-none focus:ring-2
                                       focus:ring-indigo-500"
              placeholder="Confirm your password"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600
                                       border-gray-300 rounded"
            />
            <label className="ml-2 text-sm
                                          text-gray-600">
              I agree to the terms and conditions
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white
                                       bg-indigo-500 rounded-md
                                       hover:bg-indigo-600 focus:outline-none
                                       focus:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}