import Layout from './modules/Layout'
import Home from './modules/Home'
import About from './modules/About'
import NoPage from './modules/NoPage'
import Public from './modules/Public'
import Private from './modules/Private'
import Login from './modules/Login'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import AuthService from './services/auth.service'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="public" element={<Public />} />
        <Route path="private" element={<Private />} />
        <Route path="login" element={<Login />} onLogin={AuthService.login} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  )

}

export default App
