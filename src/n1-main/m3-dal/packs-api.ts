import axios from "axios"

const BASE_URL = "http://localhost:7542/2.0/" //"https://neko-back.herokuapp.com/2.0"

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export const packsApi = {
    getPacks(params: QueryParamsPacksType) {
        return instance.get<ResponsePacksType>("/cards/pack", {params})
    },
    createPack(cardsPack: CreateCardPackType) {
        return instance.post<{ newCardsPack: CardPackType }>("/cards/pack", {cardsPack})
    },
    deletePack(id: string) {
        return instance.delete<{ deletedCardsPack: CardPackType }>("cards/pack", {
            params: {
                id
            }
        })
    },
    updatePack(cardsPack: {name: string, _id: string}) {
        return instance.put<{ updatedCardsPack: CardPackType }>("/cards/pack", {cardsPack})
    }
}

type QueryParamsPacksType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number
    page?: number
    pageCount?: number
    user_id?: string
}

type ResponsePacksType = {
    cardPacks: Array<CardPackType>
    cardPacksTotalCount: 14 // количество колод
    maxCardsCount: 4
    minCardsCount: 0
    page: 1 // выбранная страница
    pageCount: 4 // количество элементов на странице

}
export type CardPackType = {
    _id: string
    user_id: string
    name: string
    path: string // папка
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: "pack" | "folder" // ещё будет "folder" (папка)
    created: string
    updated: string
    __v: number
}

type CreateCardPackType = {
    name?: string // если не отправить будет таким
    path?: string // если не отправить будет такой
    grade?: number // не обязателен
    shots?: number // не обязателен
    rating?: number // не обязателен
    deckCover?: string // не обязателен
    private?: boolean // если не отправить будет такой
    type?: "pack" | "folder" // если не отправить будет таким
}
