import axios from "axios";
import {CardsStateType} from "../../n1-main/m2-bll/reducers/Cards-reducer";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export type CardsApiType = {
    cardsPack_id: string
    cardAnswer?: string,
    cardQuestion: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?: number,
    pageCount?: number

}

export const CardsApi = {
    getCards(cardsPack_id: string,/* params: CardsApiType*/) {
        return instance.get<CardsStateType>(`/cards/card?cardsPack_id=${cardsPack_id}`)
            .then(res => res.data)
    },
    addCard(cardsPack_id: string) {
        return instance.post(`/cards/card`, {
            card: {
                cardsPack_id, question: '1+1', answer: '2'
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