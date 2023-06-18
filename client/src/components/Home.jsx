import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { role, SCREEN_PATH } from '../constant/constant'
import FadeIn from './effect/FadeIn';
import Sidebar from './sidebar/Sidebar';

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate(SCREEN_PATH[localStorage.getItem('role')][localStorage.getItem('menuItemOrder')]);
  });

  return (
    <FadeIn>
      <Sidebar/>
      
    </FadeIn>
  )
}

export default Home;
