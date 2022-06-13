export const initialLearnState = {
    cards: [] as Cards[],
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 0,
    packUserId: '',
}

export const LearnReducer = (state = initialLearnState, action: any): InitialLearnType => {
    switch (action.type) {
        default:
            return state
    }

}

type InitialLearnType = typeof initialLearnState
type Cards = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number
    shots: number
    user_id: string,
    created: string,
    updated: string,
    _id: string,
}

