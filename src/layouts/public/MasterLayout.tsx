import { Outlet } from "react-router-dom";
import { lazy } from "react";

const HeaderLayout = lazy(() => import("./Header"));
const FooterLayout = lazy(() => import("./Footer"));

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
