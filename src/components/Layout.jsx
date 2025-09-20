import React from 'react';
import { Outlet } from 'react-router-dom';

import SideBar from './SideBar';

export default function Layout() {
    return (
        <>
            <SideBar />
            <main>
                <Outlet />
            </main>

        </>
    );
}

