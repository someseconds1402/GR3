import React, {useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home'
import Login from './components/login/Login'
import FadeIn from './components/effect/FadeIn';
import NotFoundPage from './components/notfoundpage/NotFoundPage';
import {PATH, role} from './constant/constant';
import SubscreenComponents from './components/subscreen/SubscreenComponents';

function App() {
  const role = useSelector(state => state.changeRole.role);
  // console.log(1);
  useEffect(()=>{
    // console.log(1);
    if(!localStorage.getItem('menuItemOrder')){
      localStorage.setItem('menuItemOrder', 0);
    }
    if(!localStorage.getItem('role')){
      localStorage.setItem('role', 2);
    }
    // epidemic display 
    // localStorage.setItem('epidemicDisplay_selectedProvinceId', 24);
    // localStorage.setItem('epidemicDisplay_selectedDate', '2022-7-18');
    // console.log(localStorage.getItem('epidemicDisplay_selectedDate'));
    // console.log(localStorage);
  }, []);
  return (
    <React.StrictMode>
      <div className="root-page">
        <FadeIn>
          <Router>
            <Routes>
              <Route exact path={PATH.HOME} element={<Home role={role}/>}/>
              <Route path={PATH.LOGIN} element={<Login/>}/>
              
              <Route path={PATH.LOGIN} element={<Login/>}/>
              <Route path={PATH.ACCOUNT_MANAGE} element={<SubscreenComponents.ADMIN.AccManage/>}/>
              <Route path={PATH.DB_MODYFY} element={<SubscreenComponents.EXPERT.DbModify/>}/>
              <Route path={PATH.DISTRIBUTION_ANALYSE} element={<SubscreenComponents.EXPERT.DistributionAnalyse/>}/>
              <Route path={PATH.EPIDEMIC_ANALYSE} element={<SubscreenComponents.EXPERT.EpidemicAnalyse/>}/>
              <Route path={PATH.SUPPLIES_ANALYSE} element={<SubscreenComponents.EXPERT.SupplyAnalyse/>}/>
              <Route path={PATH.DISTRIBUTION_DISPLAY} element={<SubscreenComponents.GUEST.DistributionDisplay/>}/>
              <Route path={PATH.EPIDEMIC_DISPLAY} element={<SubscreenComponents.GUEST.EpidemicDisplay/>}/>
              <Route path={PATH.SUPPLIES_DISPLAY} element={<SubscreenComponents.GUEST.SuppliesDisplay/>}/>

              <Route path={PATH.NOT_FOUND} element={<NotFoundPage/>}/>
            
            </Routes>
          </Router>
        </FadeIn>
      </div>
    </React.StrictMode>

  );
}

export default App;
