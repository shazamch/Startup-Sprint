import React from 'react';
import { DashBoardIcon,  MealsIcon, MenusIcon, ParticipantsIcon, OrdersIcon, PersIcon, ReviewsIcon, UmsIcon, VendorsIcon, ChatIcon, RequestIcon } from '../../../assets/customIcons/sidebarIcons/SidebarIcons';

const allSidebarItems = [
  { to: "/dashboard", icon: <DashBoardIcon/>, label: "Home", permission: "Home" },
  { to: "/startups", icon: <OrdersIcon/>, label: "Startups", permission: "Startups" },
  {
    to: "/myprofile",
    icon: <ParticipantsIcon />,
    label: "My Profile",
    hasSubmenu: true,
    permission: "MyProfile",
    subItems: [
      { to: "/myprofile", label: "My Profile" },
      { to: "/mystartups", label: "Startups" },
      { to: "/myinvestments", label: "Investments" },
    ],
  },
  { to: "/chat", icon: <ChatIcon/>, label: "Chat", permission: "Chat" },
  { to: "/requests", icon: <RequestIcon/>, label: "Requets", permission: "Requets" },
  // { to: "/meals", icon: <MealsIcon/>, label: "Meals", permission: "Meals" },
  // { to: "/menus", icon: <MenusIcon/>, label: "Menus", permission: "Menus" },
  // { to: "/vendors", icon: <VendorsIcon/>, label: "Vendors", permission: "Vendors" },
  // { to: "/analytics", icon: <AnalyticsIcon />, label: "Analytics", permission: "Analytics" },
  // { to: "/reviews", icon: <ReviewsIcon/>, label: "Reviews", permission: "Reviews" },
  // { to: "/ums", icon: <UmsIcon/>, label: "UMS", permission: "UMS" },
  // { to: "/pers", icon: <PersIcon/>, label: "PERS", permission: "PERS" },
];


// Filter sidebar items based on permissions
const getFilteredSidebarItems = (permissions) => {
  if (permissions.includes("All")) return allSidebarItems;
  return allSidebarItems.filter(item => permissions.includes(item.permission));
};

// SidebarItems Component
const SidebarItems = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userPermissions = user?.Permissions || [];
  const sidebarItems = getFilteredSidebarItems(userPermissions);
  return allSidebarItems
};

export default SidebarItems;
