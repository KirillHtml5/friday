import React, {useEffect, useState} from 'react';
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useNavigate, useParams} from "react-router-dom";
import s from './LearnPage.module.css';
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import {CardType} from "../l3-dal/learnAPI";
import {useDispatch, useSelector} from "react-redux";
import {getCards} from "../l2-bll/learnReducer";
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
    const [grade, setGrade] = useState<number>()
    const [card, setCard] = useState({} as CardType);
    const packs = useSelector<ReduxRootType, PackType[]>(state => state.packs.cardPacks)
    const cards = useSelector<ReduxRootType, CardType[]>(state => state.learn.cards)

    const closeLearnMode = () => navigate(-1)
    const showAnswer = () => {
        setIsAnswered(true)
    }
    const onNextClickHandler = () => {
        // grade && dispatch(updatedGrade(grade, card._id))
        setCard(getCard(cards))
        setIsAnswered(false)
    }

    const namePack = packs.find(el => el._id === packId)?.name

    useEffect(() => {
        if (packId) {
            dispatch(getCards(packId))
        }
    }, [packId, dispatch])

    useEffect(() => {
        cards.length > 0 && setCard(getCard(cards))
    }, [card, cards])

    return (
        <div className={s.container}>
            <h2 className={s.title}>LEARN "{namePack}"</h2>

            <div className={s.questBlock}>
                <div>
                    <span>Question: </span>"{card?.question}"
                </div>
                {isAnswered &&
                    <div>
                        <span>Answer: </span>"{card?.answer}"
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