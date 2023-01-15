import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router } from 'react-router-dom'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <Toaster />
      {children}
    </Router>
  )
}
