import { useSelector } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const saveSendData = (data) => {
    return {
        type: 'setSendData',
        payload: data,
    }
};

export const loginCheck = (uId,uName) => {
    return {
        type: '로그인 성공',
        payload: {
                isLogin: true,
                userId: uId,
                userName : uName,
        }
    }
};

export const logOutCheck = () => {
    return {
        type: '로그인 실패',
    }
};

const info = {
    userInfo: {
        isLogin: false,
        userId: '',
        userName: '', 
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
    if (action.type === '로그인 성공') {
        return {
            ...state,
            userInfo: action.payload,
        };
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