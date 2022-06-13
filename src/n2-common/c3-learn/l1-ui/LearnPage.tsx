import React, {useState} from 'react';
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useNavigate} from "react-router-dom";
import s from './LearnPage.module.css';
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";

export const LearnPage = () => {
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const [isAnswered, setIsAnswered] = useState<boolean>(false)
    const showAnswer = () => {
        setIsAnswered(!isAnswered)
    }

    return (
        <div className={s.container}>
            <h2>LEARN PACK NAME</h2>
            <div className={s.questBlock}>
                <div>Question: Question араво алово авовлоаваом воаол оваол ол ололо о оолол о ллло?</div>
                {isAnswered && <div>Answer: Andk fjjk fjkdk djkfk jkd jkjdk jfk!</div>}
            </div>
            {isAnswered && <div className={s.grade}>
                <span className={s.title}>Rate youself:</span>
                <SuperCheckbox>Did not know</SuperCheckbox>
                <SuperCheckbox>Forgot</SuperCheckbox>
                <SuperCheckbox>A lot of thought</SuperCheckbox>
                <SuperCheckbox>Confused</SuperCheckbox>
                <SuperCheckbox>Knew answer</SuperCheckbox>
            </div>}
            <div className={s.buttonsBlock}>
                <SuperButton onClick={goBack}>
                    Cancel
                </SuperButton>
                <SuperButton onClick={showAnswer}>
                    Show answer
                </SuperButton>
            </div>
        </div>
    );
};