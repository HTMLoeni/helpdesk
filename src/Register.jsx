import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from './auth'
import { MdPersonAdd } from 'react-icons/md'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signUp(email, password)
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err.message || 'Gagal mendaftar. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-low p-space-lg">
          <div className="text-center mb-space-xl">
            <MdPersonAdd size={48} className="block mx-auto mb-3 text-primary" />
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Daftar Akun</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Buat akun admin LAPOR-DAERAH</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                placeholder="email@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>

          <p className="text-center mt-space-xl font-body-sm text-body-sm text-on-surface-variant">
            Sudah punya akun? <Link to="/login" className="text-primary font-semibold hover:underline">Masuk di sini</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
