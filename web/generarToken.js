process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import axios from 'axios'

const client_id = '858ad326884449fcbbb6180c081a64c1'
const client_secret = '157936cd148444e591f054ae667eba39'

const obtenerToken = async () => {
    try {
        const respuesta = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'client_credentials'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer
                        .from(`${client_id}:${client_secret}`)
                        .toString('base64')
                }
            }
        )

        console.log(respuesta.data.access_token)
    } catch (error) {
        console.log(error.response?.data || error.message)
    }
}

obtenerToken()