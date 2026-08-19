const CLAVE_FAVORITOS = 'albumesFavoritos'

export const obtenerFavoritos = () => {
    const favoritos = localStorage.getItem(CLAVE_FAVORITOS)

    return favoritos ? JSON.parse(favoritos) : []
}

export const agregarFavorito = (album) => {
    const favoritos = obtenerFavoritos()

    const yaExiste = favoritos.some(
        (favorito) => favorito.id === album.id
    )

    if (yaExiste) {
        return favoritos
    }

    const nuevosFavoritos = [...favoritos, album]

    localStorage.setItem(
        CLAVE_FAVORITOS,
        JSON.stringify(nuevosFavoritos)
    )

    return nuevosFavoritos
}

export const quitarFavorito = (id) => {
    const favoritos = obtenerFavoritos()

    const nuevosFavoritos = favoritos.filter(
        (favorito) => favorito.id !== id
    )

    localStorage.setItem(
        CLAVE_FAVORITOS,
        JSON.stringify(nuevosFavoritos)
    )

    return nuevosFavoritos
}