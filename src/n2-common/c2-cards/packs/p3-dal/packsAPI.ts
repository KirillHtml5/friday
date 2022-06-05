import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const PacksAPI = {
    getPacks: async ({packName, min, max, sortPacks, page, pageCount}: RequestModel) => {
        const response = await instance.get<GetDataType>('cards/pack', {
            params: {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
            }
        })
        return response.data
    }
}

export type GetDataType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
    // error: string
}

export type PackType = {
    cardsCount: number
    created: string
    deckCover: string // not used
    grade: number
    more_id: string // not used
    name: string
    path: string // not used
    private: boolean
    rating: number
    shots: number // not used
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number // not used
    _id: string
}

export type RequestModel = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
}