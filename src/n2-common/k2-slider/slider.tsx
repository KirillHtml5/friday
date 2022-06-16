/* eslint-disable no-param-reassign */
import React, {useCallback, useEffect, useRef, FC} from 'react';
import s from './slider.module.css';

type PropsType = {
    min: number;
    max: number;
    valueArray: number[];
    setValueArray: (value: number[]) => void
};

export const Slider: FC<PropsType> = (
    {
        min, max, valueArray, setValueArray
    }) => {

    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<any>(null);

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max],
    );

    useEffect(() => {

        const minPercent = getPercent(valueArray[0]);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }

    }, [valueArray[0], getPercent]);

    useEffect(() => {

        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(valueArray[1]);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }

    }, [valueArray[1], getPercent]);


    return (
        <div className={s.container}>
            <input
                type="range"
                min={min}
                max={max}
                value={valueArray[0]}
                onChange={event => {
                    const value = Math.min(+event.target.value, valueArray[1] - 1);
                    setValueArray([value, valueArray[1]]);
                    minValRef.current = value;

                }}
                className={`${s.thumb} ${s['thumb--zindex-3']} ${
                    valueArray[0] > max - 100 ? s['thumb--zindex-5'] : ''
                }`}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={valueArray[1]}
                onChange={event => {
                    const value = Math.max(+event.target.value, valueArray[0] + 1);
                    setValueArray([valueArray[0], value])
                    maxValRef.current = value;
                }}
                className={`${s.thumb} ${s['thumb--zindex-4']}`}
            />

            <div className={s.slider}>
                <div className={s.slider__track}/>
                <div ref={range} className={s.slider__range}/>
                <div className={s['slider__left-value']}>{valueArray[0]}</div>
                <div className={s['slider__right-value']}>{valueArray[1]}</div>
            </div>
        </div>
    );
};