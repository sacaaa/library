import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Libraries from './pages/Libraries/Libraries'
import Books from './pages/Books/Books'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
            path="/libraries"
            element={
                <ProtectedRoute>
                    <Libraries />
                </ProtectedRoute>
            }
        />
        <Route
            path="/books"
            element={
                <ProtectedRoute>
                    <Books />
                </ProtectedRoute>
            }
        />
      </Routes>
    </Router>
  )
}

export default App