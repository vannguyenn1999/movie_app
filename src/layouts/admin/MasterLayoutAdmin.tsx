import { Outlet } from "react-router-dom";

import SidebarLayout from "./SideBar";
import { ListProviderProviderAdmin } from "@/stores/ListProviderAdmin";

const MasterLayoutAdmin = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarLayout />
      <ListProviderProviderAdmin>
        <div className="flex-1 mx-auto p-5 min-h-screen bg-gray-100">
          <Outlet />
        </div>
      </ListProviderProviderAdmin>
    </div>
  );
};

export default MasterLayoutAdmin;
