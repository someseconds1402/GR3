import React, {useState, useEffect} from 'react'
import FadeIn from '../effect/FadeIn'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { logoutAction } from '../../store/reducer/changeRoleSlice';
import {sidebarMenu, role, PATH, SCREEN_PATH} from './../../constant/constant';

const MenuItem = (props) =>{
    let className = "no-underline flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer ";
    let addedClass = props.className;
    if(addedClass && addedClass == 'selected') {
        className += ' dark:bg-gray-500';
    }
    return (
        <li className={className} onClick={props.func}>
            <h5 className="">{props.title}</h5>
        </li>
    )
}

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rootRole = localStorage.getItem('role');
    const menuItemOrder = localStorage.getItem('menuItemOrder');

    const logoutHandle = ()=>{
        dispatch(logoutAction());
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('role', role.GUEST);
        navigate(PATH.HOME);
    }
    
    const loginHandle = ()=>{
        navigate(PATH.LOGIN);
    }

    useEffect(()=>{
        const listItems = document.querySelectorAll('li'); 
        const menuItemOrder = localStorage.getItem('menuItemOrder');
        if(menuItemOrder < listItems.length){
            listItems[menuItemOrder].classList.add('dark:bg-gray-700');
        }
    });

    return (
        <div>
            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 relative">
                    <ul className="space-y-2 text-lg"> 
                        {
                            sidebarMenu[rootRole].map(
                                e=><MenuItem 
                                className={sidebarMenu[rootRole].indexOf(e) == menuItemOrder ? "selected" : ""} 
                                title={e} func={()=>{
                                    const menuItemOrder = sidebarMenu[rootRole].indexOf(e);
                                    localStorage.setItem('menuItemOrder', menuItemOrder);
                                    navigate(SCREEN_PATH[rootRole][menuItemOrder]);
                                }
                            }/>)
                        }
                    </ul>
                    <ul className="space-y-2 text-lg absolute bottom-9">
                        {
                            rootRole!=role.GUEST ? <MenuItem title="Đăng xuất" func={logoutHandle}/> : <MenuItem title="Đăng nhập" func={loginHandle}/>
                        }
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar