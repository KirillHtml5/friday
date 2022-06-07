
const initState={
    page:1,
    pageCount:5,
    totalCount:400
}

export const reducerPag=(state= initState, action: setCurrentPageType)=>{
    switch (action.type){
        case "SET-CURRENT-PAGE":
            return {
                ...state,
                page: action.page
            }
        default:
            return state
    }

}

export const setCurrentPage=(page: number)=>({type:"SET-CURRENT-PAGE", page})

export type setCurrentPageType= ReturnType <typeof setCurrentPage>