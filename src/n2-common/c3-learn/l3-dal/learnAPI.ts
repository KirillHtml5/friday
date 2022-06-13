import {instance} from "../../../n1-main/m3-bll/instance";


export const learnAPI = {
    getCards: async (cardsPack_id: string) => {
        const res = await instance.get<CardsGetType>('/cards/card', {
            params: {
                cardsPack_id
            }
        })
        return res.data
    },
}

type CardsGetType = {
    cards: Cards[]
    cardsTotalCount: number
    packUserId: string
}
export type Cards = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}