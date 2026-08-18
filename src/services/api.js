import axios from 'axios'

const TOKEN = 'BQAOhi-1jLuYy9vB5g3fYPpDimnmhTG52Ith1YVlUMAIFbJfmMlD6lJzmJDRKpTZTdR1YAniQGx-TRLL-nBfoEkrM2VuLDidzVJN_VdpR8dZz-uHB2AIjHBbJbTVH7amp51YiVoJi-lu'

export const spotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        Authorization: `Bearer ${TOKEN}`
    }
})