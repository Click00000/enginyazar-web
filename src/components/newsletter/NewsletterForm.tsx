'use client'
import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('subscribing')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error: unknown) {
      setStatus('error')
    }    
  }

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2">Güncel Haberler İçin Abone Olun</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email adresiniz"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button 
          type="submit"
          disabled={status === 'subscribing'}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {status === 'subscribing' ? 'Gönderiliyor...' : 'Abone Ol'}
        </button>
      </form>
      {status === 'success' && (
        <p className="text-green-400 mt-2">Başarıyla abone oldunuz!</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 mt-2">Bir hata oluştu, lütfen tekrar deneyin.</p>
      )}
    </div>
  )
}
