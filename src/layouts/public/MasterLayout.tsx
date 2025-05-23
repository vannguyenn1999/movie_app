import { Outlet } from "react-router-dom";

import FooterLayout from "./Footer";
import HeaderLayout from "./Header";

const MasterLayout = () => {
  return (
    <>
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
    </>
  );
};

export default MasterLayout;
