import FirstMain from "./components/FirstMain/FirstMain"
import Login from "./components/FirstMain/Login";
import Join from "./components/FirstMain/Join";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const Maini = () => { 
    return (
    <Router>
        <Routes>
            <Route path="/" element={<FirstMain />} />
            <Route path="/login" element={<Login />} />
             <Route path="/join" element={<Join />} />
        </Routes>
    </Router>
            )
}
export default Maini;