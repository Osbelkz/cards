import axios from "axios"

// const BASE_URL = "https://neko-back.herokuapp.com/2.0"
const BASE_URL = "http://localhost:7542/2.0"

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export const cardsApi = {
    getPack(params: QueryParamsCardsType) {
        return instance.get<ResponsePacksType>("/cards/card", {params})
    },
    createCard(card: CreateCardType) {
        return instance.post<{ newCard: CardType }>("/cards/card", {card})
    },
    deleteCard(id: string) {
        return instance.delete<{ deletedCard: CardType }>("/cards/card", {params: {id}})
    },
    updateCard(card: UpdateCardType) {
        return instance.put<{ updatedCard: CardType }>("/cards/card", {card})
    }
}

type QueryParamsCardsType = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    sortCards?: string
    min?: number
    max?: number
    page?: number
    pageCount?: number
    user_id?: string

}

type ResponsePacksType = {
    "cards": CardType[],
    "cardsTotalCount": number,
    "minGrade": number,
    "maxGrade": number,
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
    "token": string,
    "tokenDeathTime": number

}
export type CardType = {
    _id: string
    user_id: string
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    "type": "card"
    created: string
    updated: string
    __v: number
    more_id: string
    cardsPack_id: string,
    answer: string,
    question: string,
    comments: string,
}

export type CreateCardType = {
    cardsPack_id?: string
    question?: string // если не отправить будет таким
    answer?: string // если не отправить будет таким
    grade?: number // 0..5, не обязателен
    shots?: number // не обязателен
    rating?: number // не обязателен
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
    type?: "card"
}
export type UpdateCardType = {
    question?: string,
    answer?: string,
    _id: string
}
