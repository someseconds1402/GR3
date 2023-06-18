import React, {useState, useEffect} from 'react'
import FadeIn from '../effect/FadeIn'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { logoutAction } from '../../store/reducer/changeRoleSlice';
import {sidebarMenu, role, PATH, SCREEN_PATH} from './../../constant/constant';

const MenuItem = (props) =>{
    // console.log(props);
    return (
        <li className="no-underline flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer" onClick={props.func}>
            <h5 className="">{props.title}</h5>
        </li>
    )
}

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rootRole = localStorage.getItem('role');

    const goToLogin = ()=>{
        console.log(123456);
        if(rootRole != role.GUEST) {
            dispatch(logoutAction());
            localStorage.setItem('isLoggedIn', false);
            localStorage.setItem('role', role.GUEST);
        }
        navigate(PATH.LOGIN);
    }

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
                            sidebarMenu[rootRole].map(e=><MenuItem title={e} func={
                                // (NavigationSidebar[rootRole][sidebarMenu[rootRole].indexOf(e)])(navigate)
                                ()=>{
                                    const menuItemOrder = sidebarMenu[rootRole].indexOf(e);
                                    localStorage.setItem('menuItemOrder', menuItemOrder);
                                    navigate(SCREEN_PATH[rootRole][menuItemOrder]);
                                }
                            }/>)
                        }
                    </ul>
                    <ul className="space-y-2 text-lg absolute bottom-9">
                        {
                            rootRole!=role.GUEST ? <MenuItem title="Đăng xuất" func={goToLogin}/> : <MenuItem title="Đăng nhập" func={goToLogin}/>
                        }
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar