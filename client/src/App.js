import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home'
import Login from './components/login/Login'
import FadeIn from './components/effect/FadeIn';
import {PATH, role} from './constant/constant'

function App() {
  const role = useSelector(state => state.changeRole.role);
  return (
    <div className="root-page">
      <FadeIn>
        <Router>
          <Routes>
            <Route exact path={PATH.HOME} element={<Home role={role}/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
          </Routes>
        </Router>
      </FadeIn>
    </div>
  );
}

export default App;
