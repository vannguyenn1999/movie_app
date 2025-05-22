import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { HiOutlineLogout, HiFilm } from "react-icons/hi";

import { useAuth } from "@/core/Auth";

const HeaderProfile = () => {
  const { auth, logout } = useAuth();

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
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 p-2 cursor-pointer me-5 rounded-full bg-gray-300 ring-0 focus:ring-0">
          <span className="sr-only">Thông tin cá nhân</span>
          <img
            className="w-8 h-8 rounded-full"
            src={auth?.user?.image}
            alt="user photo"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link to={"/admin/movie"}>
              <button
                type="button"
                className="flex items-center cursor-pointer w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                <HiFilm />
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
              <HiOutlineLogout />
              Đăng xuất
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default HeaderProfile;
