import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './auth'
import { MdHourglassEmpty } from 'react-icons/md'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface">
        <MdHourglassEmpty size={32} className="animate-pulse text-primary" />
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
