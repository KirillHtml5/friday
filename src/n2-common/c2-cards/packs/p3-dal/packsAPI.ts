import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const PacksAPI = {
    getPacks: async ({packName, min, max, sortPacks, page, pageCount, user_id}: GetPacksParamsType) => {
        const response = await instance.get<GetDataType>('cards/pack', {
            params: {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
                user_id,
            }
        })
        return response.data
    },
    addPack: async (title: string) => {
        const response = await instance.post('cards/pack', {
            cardsPack: {
                name: title,
            }
        })
        return response.data
    },
    deletePack: async (id: string) => {
        const response = await instance.delete('cards/pack', {
            params: {id}
        })
        return response.data
    },
    updatePack: async (_id: string, name: string) => {
        const response = await instance.put('cards/pack', {
            cardsPack: {
                _id,
                name,
            }
        })
        return response.data
    },
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
export type GetPacksParamsType = {
    packName?: string // optional
    min?: number // optional
    max?: number // optional
    sortPacks?: string // optional
    page?: number // optional
    pageCount?: number // optional

    user_id?: string // optional
}