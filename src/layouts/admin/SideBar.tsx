import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import {
  FaPhotoVideo,
  FaUserTie,
  FaGlobeAsia,
  FaFolder,
  FaTags,
  FaHome,
  FaThList,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

const SidebarLayout = () => {
  const location = useLocation();
  return (
    <div className="rounded-none">
      <Sidebar
        aria-label="Sidebar with logo branding example"
        className="min-h-screen rounded-none"
      >
        <SidebarLogo
          href="#"
          // img={import.meta.env.VITE_REACT_APP_IMG_HEADER}
          img="/vite.svg"
          imgAlt="Flowbite logo"
        >
          Web Phim
        </SidebarLogo>
        <SidebarItems>
          <SidebarItemGroup>
            <Link to="/admin/phim">
              <SidebarItem
                active={location.pathname === "/admin/phim"}
                icon={FaPhotoVideo}
                className="my-1.5"
              >
                Phim
              </SidebarItem>
            </Link>
            <Link to="/admin/dien-vien">
              <SidebarItem
                active={location.pathname === "/admin/dien-vien"}
                icon={FaUserTie}
                className="mb-1.5"
              >
                Diễn Viên
              </SidebarItem>
            </Link>

            <Link to="/admin/the-loai">
              <SidebarItem
                active={location.pathname === "/admin/the-loai"}
                icon={FaFolder}
                className="my-1.5"
              >
                Thể Loại
              </SidebarItem>
            </Link>

            <Link to="/admin/chu-de">
              <SidebarItem
                active={location.pathname === "/admin/chu-de"}
                icon={FaTags}
                className="my-1.5"
              >
                Chủ đề
              </SidebarItem>
            </Link>

            <Link to="/admin/quoc-gia">
              <SidebarItem
                active={location.pathname === "/admin/quoc-gia"}
                icon={FaGlobeAsia}
                className="my-1.5"
              >
                Quốc gia
              </SidebarItem>
            </Link>

            <Link to="/admin/top-phim">
              <SidebarItem
                active={location.pathname === "/admin/top-phim"}
                icon={FaThList}
                className="my-1.5"
              >
                Top phim
              </SidebarItem>
            </Link>

            <Link to="/">
              <SidebarItem icon={FaHome} className="my-1.5">
                Trang phim
              </SidebarItem>
            </Link>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
};

export default SidebarLayout;
