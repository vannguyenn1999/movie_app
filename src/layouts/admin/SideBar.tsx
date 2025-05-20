import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import { FaPhotoVideo, FaUserTie, FaGlobeAsia, FaFolder, FaTags } from "react-icons/fa";

import { Link , useLocation } from "react-router-dom";

const SidebarLayout = () => {
    const location = useLocation()
    return (
        <>
            <Sidebar aria-label="Sidebar with logo branding example" >
                <SidebarLogo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
                    Flowbite
                </SidebarLogo>
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem
                            as={Link}
                            to="/admin/movie"
                            active={location.pathname === '/admin/movie'}
                            icon={FaPhotoVideo}
                            className="my-1.5"
                        >
                            Phim
                        </SidebarItem>
                        <SidebarItem
                            as={Link}
                            to="/admin/actor"
                            active={location.pathname === '/admin/actor'}
                            icon={FaUserTie}
                            className="mb-1.5"
                        >
                            Diễn Viên
                        </SidebarItem>

                        <SidebarItem
                            as={Link}
                            to="/admin/category"
                            active={location.pathname === '/admin/category'}
                            icon={FaFolder}
                            className="my-1.5"
                        >
                            Thể Loại
                        </SidebarItem>

                        <SidebarItem
                            as={Link}
                            to="/admin/topic"
                            active={location.pathname === '/admin/topic'}
                            icon={FaTags}
                            className="my-1.5"
                        >
                            Chủ đề
                        </SidebarItem>

                        <SidebarItem
                            as={Link}
                            to="/admin/country"
                            active={location.pathname === '/admin/country'}
                            icon={FaGlobeAsia}
                            className="my-1.5"
                        >
                            Quốc gia
                        </SidebarItem>

                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </>
    )
}

export default SidebarLayout;