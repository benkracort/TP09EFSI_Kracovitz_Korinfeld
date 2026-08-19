import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { obtenerAlbum } from '../services/albumesApi'

export default function Album() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [album, setAlbum] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const cargarAlbum = async () => {
            try {
                setCargando(true)
                setError(null)

                const resultado = await obtenerAlbum(id)

                setAlbum(resultado)
            } catch (error) {
                console.error(error)
                setError('No fue posible obtener la información del álbum.')
            } finally {
                setCargando(false)
            }
        }

        cargarAlbum()
    }, [id])

    const obtenerDuracionTotal = () => {
        const duracionTotal = album.tracks.items.reduce(
            (total, cancion) => total + cancion.duration_ms,
            0
        )

        return convertirDuracion(duracionTotal)
    }

    const convertirDuracion = (milisegundos) => {
        const segundos = Math.floor(milisegundos / 1000)
        const minutos = Math.floor(segundos / 60)
        const segundosRestantes = segundos % 60

        return `${minutos}:${segundosRestantes
            .toString()
            .padStart(2, '0')}`
    }

    if (cargando) {
        return <p>Cargando álbum...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!album) {
        return <p>No se encontró el álbum.</p>
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>
                Volver
            </button>

            <img
                src={album.images[0]?.url}
                alt={album.name}
            />

            <h1>{album.name}</h1>

            <h2>{album.artists[0]?.name}</h2>

            <p>
                Fecha de lanzamiento: {album.release_date}
            </p>

            <p>
                Tipo: {album.album_type}
            </p>

            <p>
                {album.total_tracks} canciones
            </p>

            <p>
                Duración: {obtenerDuracionTotal()}
            </p>

            {album.external_urls?.spotify && (
                <a
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Abrir en Spotify
                </a>
            )}

            <h2>Tracklist</h2>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tema</th>
                        <th>Duración</th>
                    </tr>
                </thead>

                <tbody>
                    {album.tracks.items.map((cancion) => (
                        <tr key={cancion.id}>
                            <td>{cancion.track_number}</td>

                            <td>{cancion.name}</td>

                            <td>
                                {convertirDuracion(cancion.duration_ms)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}