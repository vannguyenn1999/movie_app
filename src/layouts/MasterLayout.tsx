import { Outlet } from "react-router-dom";

import HeaderLayout from "./Header";
import FooterLayout from "./Footer";

const MasterLayout = () => {
  return (
    <>
      <HeaderLayout />
      <div>
        <Outlet />
      </div>
      <>
        <FooterLayout />
      </>
    </>
  );
};

export default MasterLayout;
