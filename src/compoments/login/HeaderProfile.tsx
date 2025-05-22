import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { HiOutlineLogout, HiFilm } from "react-icons/hi";

import { useAuth } from "@/core/Auth";
import { Avatar } from "flowbite-react";

const HeaderProfile = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    try {
      return Swal.fire({
        title: `<h4 style='color:#27b7de'> Bạn có muốn đăng xuất không ?</h4>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4da8ff",
        cancelButtonColor: "#d33",
        confirmButtonText: `Có`,
        cancelButtonText: `Không`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          logout();
          window.location.reload();
        }
      });
    } catch (error) {
      console.log("handleLogout error : ", error);
      toast.error("Đăng xuất thất bại !");
    }
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 cursor-pointer me-5 rounded-full ring-0 focus:ring-0 hover: ring-0 focus:outline-none ">
        <span className="sr-only">Thông tin cá nhân</span>
        <Avatar
          img="https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
          alt="avatar of Jese"
          rounded
        />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link to={"/admin/phim"}>
              <button
                type="button"
                className="flex items-center cursor-pointer w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                <HiFilm className="me-1 text-md" />
                Quản lý
              </button>
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleLogout}
              type="button"
              className="flex items-center cursor-pointer w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <HiOutlineLogout className="me-1 text-md" />
              Đăng xuất
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default HeaderProfile;
