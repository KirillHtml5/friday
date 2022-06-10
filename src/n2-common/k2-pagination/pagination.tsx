import c from './page.module.css'
import {useDispatch, useSelector} from "react-redux";

import {ReduxRootType} from "../../n1-main/m2-bll/store/ReduxStore";
import {createPages} from "./pagesCreator";
import {setCurrentPage} from '../c2-cards/packs/p2-bll/packsReducer';

export const Pagination = () => {
    // получить данные со стейта
    const currentPage = useSelector<ReduxRootType, number>(state => state.packs.page)
    const totalCount = useSelector<ReduxRootType, number>(state => state.packs.cardPacksTotalCount)
    const pageCount = useSelector<ReduxRootType, number>(state => state.packs.pageCount)
    const dispatch = useDispatch()

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