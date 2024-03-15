import React, { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import { AuthContext } from './context/AuthContext'

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Header />
      <Home />
      <Footer />
    </AuthContext.Provider>
  )
}

export default App
