import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './auth'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface">
        <span className="material-symbols-outlined text-primary text-[32px] animate-pulse">hourglass_empty</span>
        <span className="ml-2 font-body-md text-body-md text-on-surface-variant">Memuat sesi...</span>
      </div>
    )
  }

  if (!user) {
    navigate('/login', { replace: true, state: { from: location } })
    return null
  }

  return children
}
