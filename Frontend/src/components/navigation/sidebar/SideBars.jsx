import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleSidebar } from '../../../redux/reducers/sidebarReducer';
import leftarrow from "../../../assets/sidebar collapse button.svg";
import mainLogo from '../../../assets/mainLogo.png';
import sidebarItems from './SidebarItems';
import { ExpandableIcon } from '../../../assets/customIcons/sidebarIcons/SidebarIcons';
import { useDarkMode } from '../../../context/DarkModeContext';

export default function SideBars() {

    const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
    const dispatch = useDispatch();
    const [isSubMenuExpanded, setisSubMenuExpanded] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Access dark mode state and toggle function from context
      const { isDarkMode, toggleDarkMode } = useDarkMode();

    const toggleSidebarState = () => {
        dispatch(toggleSidebar());
    };

    const toggleCustomersSection = () => {
        setisSubMenuExpanded((prev) => !prev);
    };

     useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (screenWidth <= 700 && !isCollapsed) {
            dispatch(toggleSidebar());
        }
    }, [screenWidth, dispatch, isCollapsed]);


    return (
        <div
            className={`flex flex-col justify-between bg-white dark:bg-gray-800 gap-2 h-screen transition-all duration-500 ease-in-out ${isCollapsed ? 'w-24' : 'w-64'} flex-shrink-0 overflow-x-hidden`}
        >

            {/* Logo and Collapse Button */}
            <div className="flex items-center justify-between p-5">
                <img src={mainLogo} alt="main Logo" height={62} width={96} className={`${isCollapsed ? 'w-0 h-0 opacity-0' : 'overflow-hidden'}  dark:"filter invert"`} />
                {isCollapsed ? (
                    <img src={mainLogo} alt="Collapsed Logo" className="h-10 hover:scale-110 cursor-pointer" onClick={toggleSidebarState} />
                ) : (
                    <svg
                        className="hover:scale-110 cursor-pointer text-[#1836b2] dark:text-[#e7c94d]"
                        width="21"
                        height="37"
                        viewBox="0 0 21 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={toggleSidebarState}
                        >
                        <path
                            d="M9.625 29.2916L3.5 18.4999L9.625 7.70825M16.625 29.2916L10.5 18.4999L16.625 7.70825"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>

            {/* Below menu */}
            <nav className={`px-5 flex-grow ${!isCollapsed && 'overflow-x-hidden'}`}>
                <ul className="flex flex-col gap-1.5 justify-center">
                    {sidebarItems().map(({ to, icon, label, hasSubmenu, subItems }) => (
                        <li key={to} className="flex flex-col gap-1.5">
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `flex font-medium p-1.5 rounded-lg relative gap-4 hover:bg-[#b8e2f9] ${isActive
                                    ? `text-[#1836b2] bg-[#b8e2f9] ${isCollapsed
                                        ? "before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:w-9 before:h-9 before:rounded-md before:transform before:-translate-x-1/2 before:-translate-y-1/2"
                                        : "before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#1836b2] before:rounded-l-md"
                                        }`
                                    : `text-gray-800 dark:text-white`
                                    } ${isCollapsed ? 'justify-center rounded-full' : ''}`
                                }
                                onClick={hasSubmenu ? toggleCustomersSection : undefined}
                                >
                                <div className="group flex relative">
                                    <span className="flex items-center justify-center">
                                    {/* Pass isActive to the icon */}
                                    {React.cloneElement(icon, { isActive: to === window.location.pathname })}
                                    </span>

                                    {isCollapsed && (
                                    <span className="group-hover:opacity-100 transition-opacity bg-[#b8e2f9] text-sm text-[#1836b2] rounded-md absolute left-full ml-5 px-2 py-1 opacity-0 z-50">
                                        {label}
                                    </span>
                                    )}
                                </div>

                                {!isCollapsed && (
                                    <div className="flex items-center justify-between w-full">
                                    <span>{label}</span>

                                    {hasSubmenu && !isCollapsed && <ExpandableIcon isExpanded={isSubMenuExpanded} />}
                                    </div>
                                )}
                            </NavLink>


                            {/* Render Submenus Dynamically */}
                            {hasSubmenu && isSubMenuExpanded && !isCollapsed && (
                                <ul className="flex flex-col gap-1.5 ml-10 list-none p-0 m-0">
                                    {subItems?.map(({ to: subTo, label: subLabel }) => (
                                        <li key={subTo}>
                                            <NavLink
                                                to={subTo}
                                                className={({ isActive }) =>
                                                    `hover:bg-[#ffe6e9] flex items-center font-medium p-1.5 text-sm transition-colors rounded ${isActive ? 'text-[#1836b2] bg-[#ffe6e9]' : 'text-gray-800 dark:text-white hover:text-[#1836b2]'
                                                    }`
                                                }
                                            >
                                                {subLabel}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            
        </div>

    );
}
