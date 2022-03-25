import "./App.css";
import Main from "./component/Main";
import Ip from "./component/Ip";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import CustomAxios from './CustomAxios';

function App() {
  return (
    // <p> 이 기기의 ip 주소는 {ip}입니다.</p>
    <BrowserRouter>
      <Routes>
        <Route path="/"></Route>
        <Route path="/ip" element={<Ip />}></Route>
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
