import { BrowserRouter, Route, Routes } from "react-router"
import App from "../localstrorage/App";
import App2 from "../Jsonoperation/App2";
import Todolist from "../todolist/todo";
const Path = () => {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />} />
                <Route path="/about" element={<App2 />} />
                  <Route path="/Todolist" element={<Todolist/>} />
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default Path;