import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { role, PATH } from '../constant/constant'
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/reducer/changeRoleSlice';
import FadeIn from './effect/FadeIn';
import Sidebar from './sidebar/Sidebar';
import SubscreenComponents from './subscreen/SubscreenComponents'

const Home = (props) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (props.role === role.ADMIN) {
      setText('Admin');
    } else if (props.role === role.EXPERT) {
      setText('Expert');
    } else {
      setText('Guest');
    }
  }, [props.role]);

  const logout = ()=>{
    dispatch(logoutAction());
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('role', role.GUEST);
    navigate(PATH.LOGIN);
  }

  return (
    <FadeIn>
      <Sidebar/>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            
        </div>
      </div>
    </FadeIn>
  )
}

export default Home;
