import { Outlet } from "react-router-dom";

import HeaderLayout from "./Header";
import FooterLayout from "./Footer";
import { ListProviderProvider } from "@/stores/ListProvider";
import TopicLayout from "./header/Topic";

const MasterLayout = () => {
  return (
    <ListProviderProvider>
      <div className="bg-[#1f2029]">
        <HeaderLayout />
        <TopicLayout />
        <div>
          <Outlet />
        </div>
        <div>
          <FooterLayout />
        </div>
      </div>
    </ListProviderProvider>
  );
};

export default MasterLayout;
