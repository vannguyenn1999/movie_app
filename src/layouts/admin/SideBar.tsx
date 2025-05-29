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
          img={import.meta.env.VITE_REACT_APP_IMG_HEADER}
          imgAlt="Flowbite logo"
        >
          Web Phim
        </SidebarLogo>
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem
              as={Link}
              to="/admin/phim"
              active={location.pathname === "/admin/phim"}
              icon={FaPhotoVideo}
              className="my-1.5"
            >
              Phim
            </SidebarItem>
            <SidebarItem
              as={Link}
              to="/admin/dien-vien"
              active={location.pathname === "/admin/dien-vien"}
              icon={FaUserTie}
              className="mb-1.5"
            >
              Diễn Viên
            </SidebarItem>

            <SidebarItem
              as={Link}
              to="/admin/the-loai"
              active={location.pathname === "/admin/the-loai"}
              icon={FaFolder}
              className="my-1.5"
            >
              Thể Loại
            </SidebarItem>

            <SidebarItem
              as={Link}
              to="/admin/chu-de"
              active={location.pathname === "/admin/chu-de"}
              icon={FaTags}
              className="my-1.5"
            >
              Chủ đề
            </SidebarItem>

            <SidebarItem
              as={Link}
              to="/admin/quoc-gia"
              active={location.pathname === "/admin/quoc-gia"}
              icon={FaGlobeAsia}
              className="my-1.5"
            >
              Quốc gia
            </SidebarItem>

            <SidebarItem as={Link} to="/" icon={FaHome} className="my-1.5">
              Trang phim
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
};

export default SidebarLayout;
