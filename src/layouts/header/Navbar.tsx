import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
// import Link from "next/link";

const styleNavbar = { color: "#ffffff" };

const NavBarLayout = () => {
  return (
    <>
      <Navbar
        fluid
        rounded
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <NavbarBrand href="https://flowbite-react.com">
          <img
            src="https://images.seeklogo.com/logo-png/32/1/shopee-logo-png_seeklogo-326282.png"
            className="mr-3 h-6 sm:h-9 opacity-100"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite React
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse className="text-white">
          <NavbarLink href="#" style={styleNavbar}>
            Chủ để
          </NavbarLink>
          <NavbarLink href="#" style={styleNavbar}>
            Thể loại
          </NavbarLink>
          <NavbarLink href="#" style={styleNavbar}>
            Quốc gia
          </NavbarLink>
          <NavbarLink href="#" style={styleNavbar}>
            Diễn viên
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </>
  );
};

export default NavBarLayout;
