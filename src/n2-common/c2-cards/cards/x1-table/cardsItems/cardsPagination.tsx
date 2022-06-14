import {createPages} from "../../../../k2-pagination/pagesCreator";
import {ReduxRootType} from "../../../../../n1-main/m2-bll/store/ReduxStore";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentCardPage} from "../../../../../n1-main/m2-bll/reducers/Cards-reducer";
import c from '../../../../k2-pagination/page.module.css'


export const CardsPagination = () => {
    // получить данные со стейта
    const currentPage = useSelector<ReduxRootType, number>(state => state.cards.page)
    const totalCount = useSelector<ReduxRootType, number>(state => state.cards.cardsTotalCount)
    const pageCount = useSelector<ReduxRootType, number>(state => state.cards.pageCount)
    const dispatch = useDispatch();

    const pagesCount = Math.ceil(totalCount / pageCount)

    let pages: Array<number> = []

    createPages(pages,pagesCount,currentPage)


    return (
        <div className={c.pages}>
            {pages.map((page, index) => <span
                key={index}
                className={currentPage === page ? c.currentPage : c.page}
                onClick={() => {
                    dispatch(setCurrentCardPage(page))
                }}
            >{page}</span>)}
        </div>
    )
}