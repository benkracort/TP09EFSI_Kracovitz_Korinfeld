import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    obtenerFavoritos,
    quitarFavorito
} from '../services/favoritos'

export default function Favoritos() {
    const [favoritos, setFavoritos] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        setFavoritos(obtenerFavoritos())
    }, [])

    const handleQuitarFavorito = (id) => {
        const nuevosFavoritos = quitarFavorito(id)

        setFavoritos(nuevosFavoritos)
    }

    return (
        <main className="favoritos">
            <h1>Mis favoritos</h1>

            {favoritos.length === 0 ? (
                <p className="mensaje-favoritos">
                    No tenés álbumes favoritos.
                </p>
            ) : (
                <div className="favoritos-grid">
                    {favoritos.map((album) => (
                        <div className="favorito-card" key={album.id}>

                            <div
                                className="favorito-info"
                                onClick={() =>
                                    navigate(`/album/${album.id}`)
                                }
                            >
                                <img
                                    src={album.images[0]?.url}
                                    alt={album.name}
                                />

                                <h2>{album.name}</h2>

                                <p>
                                    {album.artists[0]?.name}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    handleQuitarFavorito(album.id)
                                }
                            >
                                Quitar de favoritos
                            </button>

                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}