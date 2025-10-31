import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`${isCollapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
}
