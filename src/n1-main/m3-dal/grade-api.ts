import axios from "axios"


// const BASE_URL = "https://neko-back.herokuapp.com/2.0"
const BASE_URL = "http://localhost:7542/2.0"

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export const cardsApi = {
    updateCard(grade: GradeType) {
        return instance.put<{ updatedGrade: UpdateGrade }>("/cards/grade", {grade})
    }
}

export type GradeType = {
    grade:number
    card_id: string
}

export type UpdateGrade = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shot: number
}