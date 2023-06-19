import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { role, SCREEN_PATH } from '../constant/constant'

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate(SCREEN_PATH[localStorage.getItem('role')][0]);
  });

  return (
    <></>
  )
}

export default Home;
