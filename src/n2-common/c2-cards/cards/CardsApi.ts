import {CardsStateType} from "../../../n1-main/m2-bll/reducers/Cards-reducer";
import {instance} from "../../../n1-main/m3-bll/instance";


export type CardsParamsType = {
    cardsPack_id: string
    cardAnswer?: string,
    cardQuestion?: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?: number,
    pageCount?: number

}

export const CardsApi = {
    getCards(params: CardsParamsType) {
        return instance.get(`/cards/card`,
            {params})
            .then(res => res.data)
    },
    addCard(cardsPack_id: string, question?: string, answer?: string) {
        return instance.post(`/cards/card`, {
            card: {
                cardsPack_id, question, answer,
            }
        })
            .then(res => res.data)
    },
    updateCard(id: string) {
        return instance.put('/cards/card', {card: {_id: id, question: '2+2', answer: '4'}})
            .then(res => res.data)
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
            .then(res => res.data)
    }
}