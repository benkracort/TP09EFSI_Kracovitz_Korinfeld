import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarAlbumes } from '../services/albumesApi'

export default function Home() {
    const [albumes, setAlbumes] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleBusqueda = async () => {
        if (busqueda.trim() === '') {
            return
        }

        try {
            setCargando(true)
            setError(null)

            const resultados = await buscarAlbumes(busqueda)

            setAlbumes(resultados)
        } catch (error) {
            console.error(error)
            setError('No fue posible obtener la información.')
        } finally {
            setCargando(false)
        }
    }

    return (
        <>
            <h1>Buscador de álbumes</h1>

            <input
                type="text"
                className="buscador"
                placeholder="Buscar un álbum o artista..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <button onClick={handleBusqueda}>
                Buscar
            </button>

            {cargando && <p>Cargando información...</p>}

            {error && <p>{error}</p>}

            {!cargando && !error && albumes.length === 0 && (
                <p>No encontramos resultados.</p>
            )}

            {!cargando && !error && albumes.length > 0 && (
                <div>
                    {albumes.map((album) => (
                        <div
                            key={album.id}
                            onClick={() => navigate(`/album/${album.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={album.images[0]?.url}
                                alt={album.name}
                            />

                            <h2>{album.name}</h2>

                            <p>{album.artists[0]?.name}</p>

                            <p>{album.release_date}</p>

                            <p>{album.total_tracks} canciones</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}