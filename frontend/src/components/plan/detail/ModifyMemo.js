import React, { useRef } from 'react';
import {Button} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from 'axios';

const ModifyMemo = ({dList, day, memo, setMemoState, setMemo}) => {
    const form = useRef();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log(data.memo_content);
        console.log(dList[day]);
        let req = {};
        try{
            req = {memo:data.memo_content};
            await axios.patch(`/route/memo/${dList[day].routeId}`,req);
            console.log("메모 수정 완료!!");
            setMemo(data.memo_content);
            dList[day].memo = data.memo_content;
            console.log(dList[day]);
            setMemoState(true);
        } catch(e){
            console.log(e);
        }
    };

    return (
        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <textarea defaultValue={memo} {...register("memo_content")}></textarea>
                <Button type="submit" variant="contained">완료</Button>
        </form>
    );
};

export default ModifyMemo;
