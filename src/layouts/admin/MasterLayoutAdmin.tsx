import { Outlet } from "react-router-dom";

import SidebarLayout from "./SideBar"

const MasterLayoutAdmin = () => {
    return (
        <div className="flex h-auto">
            <SidebarLayout />
            <div className="flex-1 p-10 h-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default MasterLayoutAdmin