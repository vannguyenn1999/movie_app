import { Outlet } from "react-router-dom";

import FooterLayout from "./Footer";
import { ListProviderProvider } from "@/stores/ListProvider";
import HeaderLayout from "./Header";

const MasterLayout = () => {
  return (
    <ListProviderProvider>
      <div className="bg-[#1f2029] relative">
        <div className="fixed top-0 z-60 w-full">
          <HeaderLayout />
        </div>

        <div>
          <Outlet />
        </div>
        <>
          <FooterLayout />
        </>
      </div>
    </ListProviderProvider>
  );
};

export default MasterLayout;
