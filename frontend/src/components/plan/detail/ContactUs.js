import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { init } from '@emailjs/browser';
import axios from 'axios';
import { useForm } from "react-hook-form";

export const ContactUs = ({ setOpen }) => {
    init("Zaq8JxcEXp4jBv4uF");
    const form = useRef();
    const [userEmail, setUserEmail] = useState();
    const [userId, setUserId] = useState();
    const { register, handleSubmit } = useForm();
    const planId = 19;


    // share 테이블에 planid, userid 저장
    const saveShare = async (uId) => {
        console.log('db 저장중');
        let req = {};
        try {
            req = { shareId:0, planId: planId, userId: uId }
            await axios.post("/share", req);
            console.log('DB 저장 완료!!');
        } catch (err) {
            console.log(err);
        }
    };

    const sendEmail = (userId) => {
        emailjs.sendForm('service_nr57om8', 'template_bjrvuzb', form.current, 'Zaq8JxcEXp4jBv4uF')
            .then((result) => {
                console.log(result.text);
                console.log('메일 보내기 완료');
                alert('메일 보내기 완료');
                setOpen(false);
                saveShare(userId);
            }, (error) => {
                console.log(error.text);
            });
    };

    // const searchEmail = async (e) => {
    //     try {
    //         let keyword = e;
    //         console.log(keyword);
    //         const response = await axios({
    //           method: "get",
    //           url: `/api/users/${keyword}`,
    //           baseURL: "http://localhost:8080",
    //           timeout: 2000,
    //         });
    //     } catch(err) {
    //         console.log(err);
    //     }
    // };

    const onSubmit = async (data, e) => {
        e.preventDefault();

        await axios.get("/users/info/" + data.user_email).then((res) => {
            let uId = res.data.userId;
            console.log(res.data.userId);
            setUserId(uId);
            sendEmail(uId);
        }).catch(err => {
            console.log(err);
            alert('회원이 아닙니다. 다시 작성해주세요.');
            setUserEmail('');
        });

    };

    const url = 'http://localhost:3000/planDetail/' + planId;

    /*
        초대 누르면 회원인지 먼저 파악
        1. 회원이면 이메일 보내고 share 디비에도 저장
        2. 회원 아니면 다시 입력하라고 alert 해줌.

        초대된 사람들 아이콘으로 표시하기. or uesr_name 표시하기.
        share 디비랑 user 디비 조인해서  
    */

    return (
        <>
            <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" defaultValue="김중재" {...register("from_name")} />
                <input type="hidden" defaultValue={url} {...register("message")} />
                <label>Email</label>
                <input type="email" {...register("user_email")} defaultValue={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                <input type="submit" value="초대" />
            </form>
        </>
    );
};