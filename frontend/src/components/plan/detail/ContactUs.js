import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { init } from '@emailjs/browser';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Item from '../child/Item';

export const ContactUs = ({ setOpen,friends,setFriends }) => {
    init("Zaq8JxcEXp4jBv4uF");
    const form = useRef();
    const [userEmail, setUserEmail] = useState();
    const [userList, setUserList] = useState([]);
    const [userId, setUserId] = useState();
    const { register, handleSubmit } = useForm();
    const planId = 19;


    // share 테이블에 planid, userid 저장
    const saveShare = async (uId,userName) => {
        console.log('db 저장중');
        let req = {};
        try {
            req = { shareId:0, planId: planId, userId: uId}
            await axios.post("/share", req);
            console.log('DB 저장 완료!!');
            // friends 추가
            const tmp = [...friends];
            tmp.push(userName);
            setFriends(tmp);
        } catch (err) {
            console.log(err);
        }
    };

    const sendEmail = (userId,userName) => {
        emailjs.sendForm('service_nr57om8', 'template_bjrvuzb', form.current, 'Zaq8JxcEXp4jBv4uF')
            .then((result) => {
                console.log(result.text);
                console.log('메일 보내기 완료');
                alert('메일 보내기 완료');
                setOpen(false);
                saveShare(userId,userName);
            }, (error) => {
                console.log(error.text);
            });
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();

        await axios.get("/users/info/" + data.user_email).then((res) => {
            let info = res.data;
            console.log(info.userId);
            setUserId(info.userId);
            sendEmail(info.userId,info.userName);
        }).catch(err => {
            console.log(err);
            alert('회원이 아닙니다. 다시 작성해주세요.');
            setUserEmail('');
        });
    };

    const handleKeyPress = async (e) => {
        const keyword = e.target.value;
        setUserEmail(keyword);
        await axios.get(`/users/list/${keyword}`).then((res) => {
            console.log(res.data);
            let uList = [];
            res.data.map((user,index) => {
                let user1 = {name:user.userName, email:user.email};
                console.log(user1);
                uList.push(user1);
            })
            setUserList(uList);
        }).catch(err => {
            console.log(err);
            setUserList([]);
        });
      };

    const url = 'http://localhost:3000/planDetail/' + planId;
    const loginUser = "김중재";

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
                <input type="hidden" defaultValue={loginUser} {...register("from_name")} />
                <input type="hidden" defaultValue={url} {...register("message")} />
                <label>Email</label>
                <input type="email" {...register("user_email")} onChange={(e) => handleKeyPress(e) } />
                <input type="submit" value="초대" />
            </form>
            <Item>
                {userList.map((user, index) => (
                    <>
                        <p key={index}>{user.email}</p> 
                        <hr></hr>
                    </>
                ))}
            </Item>
        </>
    );
};