import React from 'react'; 
import { Route, Redirect, Navigate } from 'react-router-dom';
import axios from 'axios';
import Detail from './Detail';
import Main from '../../main/Main';

const PrivateRoutePlan = () => {
  console.log('여기 들어와?');
    const isShare = async () => {
      try{
        // console.log(routeId);
        const res = await axios({
            method: "get",
            // url: `/share/${planId}/${userId}`,    
            url: `/share/19/2`,    
            baseURL: "http://localhost:8080",
            timeout: 2000,
        });
        console.log('공유된건지 : ', res.data);
        if(res.data.length > 0){
          return true;
        } else{
          return false;
        }
      } catch{
          console.log('share 에러발생');
          return false;
      }
    };

    return isShare() ? <Detail /> : <Main />;
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /login page
      // <Route
      //   {...rest}
      //   render={(props) => (isShare() ? <Component {...props} /> : <Navigate to="/login" />)}
      // />
    
};
  
  export default PrivateRoutePlan;