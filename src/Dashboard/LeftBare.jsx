import React from 'react';
import { SidebarWithSearch } from '../Components/RightSidebar/NavbarPc';

const LeftBare = () => {
    return (
        <div>
            <div className='hidden lg:flex'>
               <SidebarWithSearch/>
            </div>
        </div>
    );
};

export default LeftBare;