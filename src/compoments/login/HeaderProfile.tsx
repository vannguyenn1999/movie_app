import { Avatar, ListGroup, ListGroupItem, Popover } from "flowbite-react";
import { HiFilm, HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { useAuth } from "@/core/Auth";

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
    <>
      <Popover
        aria-labelledby="default-popover"
        trigger="hover"
        content={
          <div className="flex justify-center ">
            <ListGroup className="w-48 p-2">
              <Link to={"/admin/phim"}>
                <ListGroupItem className="cursor-pointer" icon={HiFilm}>
                  Quản lý
                </ListGroupItem>
              </Link>
              <div onClick={handleLogout}>
                <ListGroupItem
                  className="cursor-pointer"
                  icon={HiOutlineLogout}
                >
                  Đăng xuất
                </ListGroupItem>
              </div>
            </ListGroup>
          </div>
        }
      >
        <Avatar
          img="https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
          alt="avatar of Jese"
          rounded
        />
      </Popover>
    </>
  );
};

export default HeaderProfile;
