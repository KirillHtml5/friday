import React, {useEffect} from 'react';
import {PacksTable} from "./packs/PacksTable";
import {useDispatch} from "react-redux";
import {PacksAPI} from "../p3-dal/packsAPI";
import {setPacks} from "../p2-bll/packsReducer";

export const PacksPage = () => {
    const dispatch = useDispatch<any>()

    const getPacks = async () => {
        const res = await PacksAPI.getPacks()
        dispatch(setPacks(res))
    }

    useEffect(() => {
        getPacks()
    }, [])

    return (
        <div style={{margin: "0 auto"}}>
            <PacksTable/>
        </div>
    );
};