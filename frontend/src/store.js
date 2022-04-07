import { useSelector } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const saveSendData = (data) => {
    console.log('data 도착 :', data);
    return {
        type: 'setSendData',
        payload: data,
    }
};

export const loginCheck = (uId) => {
    console.log('로그인한 아이디 : ', uId);
    return {
        type: '로그인 성공',
        payload: {
                isLogin: true,
                userId: uId
        }
    }
};

export const logOutCheck = () => {
    console.log('로그아웃!');
    return {
        type: '로그인 실패',
    }
};

// let tmp = {};

// function reducer1(state = tmp,action){
//     const newState = {...state};
//     console.log('newState 들어가기전:',newState);
//     if(action.type === 'setSendData'){
//         console.log('!!!!!!!!!!!!!! : ',action.payload.sendData);
//         newState = {...action.payload.sendData};
//         console.log('newState 들어간 후:',newState);
//         return newState;
//     } else{
//         return newState;
//     }
// }

const info = {
    userInfo: {
        isLogin: false,
        userId: ''
    },
    sendData: {
        startDate: "2022-04-04",
        endDate: "2022-04-06",
        routes: [
            {
                routeId: 0,
                routeDate: "2022-04-04",
                startPlace: {},
                endPlace: {},
                day: 1,
                order:[],
            }
        ],
    },
};

function reducer(state = info, action) {
    const newInfo = { ...state };
    console.log('reducer 들어옴 뉴인포!!! ', newInfo);
    if (action.type === '로그인 성공') {
        console.log('로그인 성공 ', action.payload);
        return {
            ...state,
            userInfo: action.payload,
        };
        // newInfo.userInfo.isLogin = true;
        // console.log('로그인 성공 ', action.payload.userId);
        // newInfo.userInfo.userId = action.payload.userId;
        // return newInfo;
    } else if (action.type === '로그인 실패') {
        newInfo.userInfo.isLogin = false;
        newInfo.userInfo.userId = '';
        return newInfo;
    } else if (action.type === 'setSendData') {
        return {
            ...state,
            sendData: action.payload,
        };
    } else {
        return newInfo;
    }
}

const store = createStore(reducer, composeWithDevTools());

export default store;