import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const loginCheck = (uId) => {
    console.log('로그인한 아이디 : ', uId);
    return {
        type : '로그인 성공',
        payload : {userId : uId}
    }
};

export const logOutCheck = () => {
    console.log('로그아웃!');
    return {
        type : '로그인 실패',
    }
};

let userInfo = {
    isLogin : false,
    userId : '',
};

function reducer(state=userInfo,action){
    const newInfo = {...state};
    if(action.type === '로그인 성공'){
        newInfo.isLogin = true;
        newInfo.userId = action.payload.userId;
        return newInfo;
    }else if(action.type === '로그인 실패'){
        newInfo.isLogin = false;
        newInfo.userId = '';
        return newInfo;
    }else{
        return newInfo;
    }
}

const store = createStore(reducer,composeWithDevTools());

export default store;