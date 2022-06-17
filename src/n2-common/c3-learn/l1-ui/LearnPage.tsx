import React, {useEffect, useState} from 'react';
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useNavigate, useParams} from "react-router-dom";
import s from './LearnPage.module.css';
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import {CardType} from "../l3-dal/learnAPI";
import {useDispatch, useSelector} from "react-redux";
import {getCards, setCurrentCard, updateGrade} from "../l2-bll/learnReducer";
import {ReduxRootType} from "../../../n1-main/m2-bll/store/ReduxStore";
import {PackType} from "../../c2-cards/packs/p3-dal/packsAPI";
import {getCard} from "../../../n3-utils/random";

const grades = [
    {title: 'Did not know', grade: 1},
    {title: 'Forgot', grade: 2},
    {title: 'A lot of thought', grade: 3},
    {title: 'Сonfused', grade: 4},
    {title: 'Knew the answer', grade: 5}
]

export const LearnPage = () => {
    let {packId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    const [isAnswered, setIsAnswered] = useState<boolean>(false)
    const [grade, setGrade] = useState<number | null>()
    const packs = useSelector<ReduxRootType, PackType[]>(state => state.packs.cardPacks)
    const cards = useSelector<ReduxRootType, CardType[]>(state => state.learn.cards)
    const currentCard = useSelector<ReduxRootType, CardType>(state => state.learn.currentCard)
    const isFetching = useSelector<ReduxRootType, boolean>(state => state.learn.isFetching)
    const namePack = packs.find(el => el._id === packId)?.name

    useEffect(() => {
        if (cards.length > 0)
            dispatch(setCurrentCard(getCard(cards)))
    }, [dispatch, cards])

    useEffect(() => {
        if (packId) {
            dispatch(getCards(packId))
        }
    }, [dispatch, packId]);

    const closeLearnMode = () => navigate(-1)
    const showAnswer = () => setIsAnswered(true)
    const onNextClickHandler = () => {
        if (grade) {
            dispatch(updateGrade(grade, currentCard._id))
        } else {
            dispatch(setCurrentCard(getCard(cards)))
        }
        setGrade(null)
        setIsAnswered(false)
    }

    return (
        <div className={s.container}>
            <h2 className={s.title}>LEARN "{namePack}"</h2>

            <div className={s.questBlock}>
                <div>
                    <span>Question: </span>"{isFetching ? "Loading..." : currentCard?.question}"
                </div>
                {isAnswered &&
                    <div>
                        <span>Answer: </span>"{currentCard?.answer}"
                    </div>}
            </div>

            {isAnswered &&
                <div className={s.grade}>
                    <span className={s.title}>Rate yourself:</span>
                    <div className={s.checkboxBlock}>
                        {grades.map((el, index) => (
                            <SuperCheckbox
                                key={index}
                                checked={grade === el.grade}
                                onClick={() => setGrade(el.grade)}
                            >
                                {el.title}
                            </SuperCheckbox>
                        ))}
                    </div>
                </div>}

            <div className={s.buttonsBlock}>
                <SuperButton onClick={closeLearnMode}>
                    Cancel
                </SuperButton>
                <SuperButton
                    onClick={isAnswered ? onNextClickHandler : showAnswer}
                >
                    {isAnswered ? 'Next' : 'Show answer'}
                </SuperButton>
            </div>
        </div>
    );
};