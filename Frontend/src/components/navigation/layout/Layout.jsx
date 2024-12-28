import React from 'react';
import Header from '../header/Header';
import SideBars from '../../navigation/sidebar/SideBars';


function Layout({ children }) {
  return (
    <div className="flex bg-white dark:bg-gray-900">
      <SideBars />
      <div className="flex flex-col flex-grow p-4 gap-5 overflow-auto">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;