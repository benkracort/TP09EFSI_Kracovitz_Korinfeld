import { spotifyApi } from './api'

export const buscarAlbumes = async (busqueda) => {
    const response = await spotifyApi.get('/search', {
        params: {
            q: busqueda,
            type: 'album',
            limit: 10
        }
    })

    return response.data.albums.items
}

export const obtenerAlbum = async (id) => {
    const response = await spotifyApi.get(`/albums/${id}`)

    return response.data
}   