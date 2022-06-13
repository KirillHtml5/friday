import React, {useEffect, useState} from 'react';
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useNavigate, useParams} from "react-router-dom";
import s from './LearnPage.module.css';
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import {Cards} from "../l3-dal/learnAPI";
import {useDispatch, useSelector} from "react-redux";
import {getCards} from "../l2-bll/learnReducer";
import {ReduxRootType} from "../../../n1-main/m2-bll/store/ReduxStore";

export const LearnPage = () => {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    let {id} = useParams()
    const [isAnswered, setIsAnswered] = useState<boolean>(false)
    const showAnswer = () => {
        setIsAnswered(!isAnswered)
    }
    const [raiting, setRaiting] = useState<number>(5)
    const dispatch = useDispatch<any>()
    const cards = useSelector<ReduxRootType, Cards[]>(state => state.learn.cards)

    useEffect(() => {
        if (!id) {
            id = '1'
        }
        dispatch(getCards(id))
    }, [])

    return (
        <div className={s.container}>
            <h2>LEARN CARDS</h2>
            <div className={s.questBlock}>
                <div>{cards[0]?.question}</div>
                {isAnswered && <div>{cards[0]?.answer}</div>}
            </div>
            {isAnswered && <div className={s.grade}>
                <span className={s.title}>Rate youself:</span>
                <div className={s.checkboxBlock}>
                    <SuperCheckbox checked={raiting === 1} onClick={() => setRaiting(1)}>Did not know</SuperCheckbox>
                    <SuperCheckbox checked={raiting === 2} onClick={() => setRaiting(2)}>Forgot</SuperCheckbox>
                    <SuperCheckbox checked={raiting === 3} onClick={() => setRaiting(3)}>A lot of
                        thought</SuperCheckbox>
                    <SuperCheckbox checked={raiting === 4} onClick={() => setRaiting(4)}>Confused</SuperCheckbox>
                    <SuperCheckbox checked={raiting === 5} onClick={() => setRaiting(5)}>Knew answer</SuperCheckbox>
                </div>
            </div>}
            <div className={s.buttonsBlock}>
                <SuperButton onClick={goBack}>
                    Cancel
                </SuperButton>
                {!isAnswered && <SuperButton onClick={showAnswer}>
                    Show answer
                </SuperButton>}
                {isAnswered && <SuperButton onClick={showAnswer}>
                    Next
                </SuperButton>}
            </div>
        </div>
    );
};