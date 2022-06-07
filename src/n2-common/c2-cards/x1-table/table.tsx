import s from './table.module.css'

export const Table = () => {
    return<div className={s.table}>
        <div>Question</div>
        <div>Answer</div>
        <div>Last Updated</div>
        <div>Grade</div>
        <div>Actions</div>
    </div>
}