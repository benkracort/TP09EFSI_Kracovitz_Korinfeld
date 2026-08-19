import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Album from './pages/Album'
import Favoritos from './pages/Favoritos'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/favoritos" element={<Favoritos />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    )
}

export default App