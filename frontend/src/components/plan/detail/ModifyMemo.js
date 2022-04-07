import React, { useRef } from 'react';
import { Stack, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from 'axios';

const ModifyMemo = ({ dList, day, memo, setMemoState, setMemo }) => {
    const form = useRef();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        let req = {};
        try {
            req = { memo: data.memo_content };
            await axios.patch(`/route/memo/${dList[day].routeId}`, req);
            setMemo(data.memo_content);
            dList[day].memo = data.memo_content;
            setMemoState(true);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1} >

                <p>메모장</p>
                <TextField
                    id="outlined-multiline-static"
                    //   label="메모장"
                    multiline
                    rows={4}
                    defaultValue={memo}
                    {...register("memo_content")}
                /> <br />
                {/* <textarea defaultValue={memo} {...register("memo_content")}></textarea> <br/> */}
                <Button type="submit" variant="contained">완료</Button>
            </Stack>
        </form>
    );
};

export default ModifyMemo;
