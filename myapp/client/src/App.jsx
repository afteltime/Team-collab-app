import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx';
import Login from './components/Login.jsx'
import CreateTeam from './components/Create-team.jsx'
import Register from "./components/Register.jsx";
import KanbanBoard from "./components/KanbanBoard.jsx";
import Calendar from "./components/Calendar/Calendar.jsx";


function App() {
    return (
        <>
            <Header />
            <div>

            </div>
            <Routes>
                <Route path='/' element={<div>Main-page</div>} />
                <Route path='/create' element={<CreateTeam />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/kanban" element={<KanbanBoard />} />
                <Route path="/calendar" element={<Calendar />} />


            </Routes>
        </>
    );
}

export default App;