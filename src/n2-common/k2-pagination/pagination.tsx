import c from './page.module.css'
import {useDispatch} from "react-redux";
import {createPages} from "./pagesCreator";
import React from "react";

export type PaginationType = {
    currentPage: number | undefined
    totalCount: number | undefined
    pageCount: number | undefined
    setCurrentPage: (page: number) => void
}

export const Pagination: React.FC<PaginationType> = (props) => {
    // получить данные со стейта
    // const currentPage = useSelector<ReduxRootType, number>(state => state.packs.page)
    // const totalCount = useSelector<ReduxRootType, number>(state => state.packs.cardPacksTotalCount)
    // const pageCount = useSelector<ReduxRootType, number>(state => state.packs.pageCount)
    const {currentPage, totalCount, pageCount, setCurrentPage} = props
    const dispatch = useDispatch<any>()

    const pagesCount = Math.ceil(totalCount / pageCount)


    let pages: Array<number> = []

    createPages(pages, pagesCount, currentPage)


    return (
        <div className={c.pages}>
            {pages.map((page, index) => <span
                key={index}
                className={currentPage === page ? c.currentPage : c.page}
                onClick={() => {
                    dispatch(setCurrentPage(page))
                }}
            >{page}</span>)}
        </div>
    )
}