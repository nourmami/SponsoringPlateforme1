import Routes from '~/core/routes'
import Navbar from '~/core/Navbar'
import Footer from '~/core/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
