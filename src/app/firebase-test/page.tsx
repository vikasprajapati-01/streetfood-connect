'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/firebase'

export default function FirebaseTest() {
  const { user } = useAuth()
  const [status, setStatus] = useState('Testing...')
  const [error, setError] = useState('')

  useEffect(() => {
    const testFirestore = async () => {
      try {
        if (!user) {
          setStatus('Not authenticated - please log in first')
          return
        }

        setStatus('Testing Firestore connection...')
        
        // Test reading from a collection
        const testCollection = collection(db, 'test')
        const snapshot = await getDocs(testCollection)
        
        setStatus(`✅ Success! Can read from Firestore. Found ${snapshot.size} documents in test collection.`)
        
        // Test writing to Firestore
        try {
          await addDoc(collection(db, 'test'), {
            message: 'Test message',
            timestamp: new Date(),
            userId: user.uid
          })
          setStatus(prev => prev + ' ✅ Can also write to Firestore!')
        } catch (writeError: any) {
          setStatus(prev => prev + ` ⚠️ Can read but cannot write: ${writeError.message}`)
        }
        
      } catch (err: any) {
        setError(`❌ Firebase Error: ${err.message}`)
        setStatus('Failed to connect to Firestore')
      }
    }

    testFirestore()
  }, [user])

  if (!user) {
    return (
      <div className="p-6 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">Authentication Required</h3>
        <p className="text-yellow-700">Please log in to test Firestore connection.</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Firebase Connection Test</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">User: {user.email}</p>
        <p className="text-sm text-gray-600">UID: {user.uid}</p>
        <p className={`text-sm ${error ? 'text-red-600' : 'text-green-600'}`}>
          Status: {status}
        </p>
        {error && (
          <p className="text-sm text-red-600">
            Error: {error}
          </p>
        )}
      </div>
    </div>
  )
}
