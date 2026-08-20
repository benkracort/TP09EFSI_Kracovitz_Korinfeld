import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscarAlbumes } from '../services/albumesApi'
import {
    obtenerFavoritos,
    agregarFavorito,
    quitarFavorito
} from '../services/favoritos'

export default function Home() {
    const [albumes, setAlbumes] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(null)
    const [favoritos, setFavoritos] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        setFavoritos(obtenerFavoritos())
    }, [])

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

    const handleAgregarFavorito = (album) => {
        const nuevosFavoritos = agregarFavorito(album)

        setFavoritos(nuevosFavoritos)
    }

    const handleQuitarFavorito = (id) => {
        const nuevosFavoritos = quitarFavorito(id)

        setFavoritos(nuevosFavoritos)
    }

    const esFavorito = (id) => {
        return favoritos.some(
            (favorito) => favorito.id === id
        )
    }

    return (
        <section className='home'>
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

            {cargando && <p className="mensaje">Cargando información...</p>}

            {error && <p className="mensaje error">{error}</p>}

            {!cargando && !error && albumes.length === 0 && (
                <p className="mensaje">No encontramos resultados.</p>
            )}

            {!cargando && !error && albumes.length > 0 && (
                <section>
                    <h2>Resultados</h2>

                    <div className="albumes-grid">
                        {albumes.map((album) => (
                            <div className="album-card" key={album.id}>
                                <div
                                    onClick={() =>
                                        navigate(`/album/${album.id}`)
                                    }
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={album.images[0]?.url}
                                        alt={album.name}
                                    />

                                    <h2>{album.name}</h2>

                                    <p>
                                        {album.artists[0]?.name}
                                    </p>

                                    <p>
                                        {album.release_date}
                                    </p>

                                    <p>
                                        {album.total_tracks} canciones
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        esFavorito(album.id)
                                            ? handleQuitarFavorito(album.id)
                                            : handleAgregarFavorito(album)
                                    }
                                >
                                    {esFavorito(album.id)
                                        ? 'Quitar de favoritos'
                                        : 'Agregar a favoritos'}
                                </button>

                            </div>
                        ))}
                    </div>
                </section>
            )}
        </section>
    )
}