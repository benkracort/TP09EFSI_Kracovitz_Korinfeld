import axios from 'axios'

const TOKEN = 'BQB9ghL1p6Q-1yoFvwLR1h3tX5qtoi5MhGJJIHvT7RpBSn4HP72qTwoMJuyoB2HCkTYlM80xAC06Db9eVaB9L2tDCi42Qo2EqoOteVSLDsUW77xV4xuRfReh3C3_3ErexNmyf--rif_N'

export const spotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        Authorization: `Bearer ${TOKEN}`
    }
})