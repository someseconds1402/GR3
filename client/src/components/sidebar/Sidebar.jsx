import React, {useState, useEffect} from 'react'
import FadeIn from '../effect/FadeIn'
import {menuItems, role} from './../../constant/constant'
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const rootRole = useSelector(state => state.Role.role);

    return (
        <div>
            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 relative">
                    <ul className="space-y-2 text-lg"> 
                        <li className="no-underline flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">
                            <span className="">Dashboard</span>
                        </li>
                        <li className="no-underline flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">
                            <span className="">Kanban</span>
                        </li>
                        <li className="no-underline flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">
                            <span className="">Inbox</span>
                        </li>
                        <li className="no-underline flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">
                            <span className="">Users</span>
                        </li>
                    </ul>
                    <ul className="space-y-2 text-lg absolute bottom-9">
                        <li className="no-underline flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">
                                <span className="">Đăng nhập</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar