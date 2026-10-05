import './index.css';
import Navbar from './components/layout/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar/Sidebar';

function App() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default App;