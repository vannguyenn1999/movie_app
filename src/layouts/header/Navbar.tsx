import {
  Navbar,
  Button,
  TextInput
} from "flowbite-react";

import { HiOutlineSearch , HiOutlineUser } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";

const NavBarLayout = () => {
  return (
    <>
      <Navbar
        fluid
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex-1">
            <div className="flex justify-center items-center">
              <img
                src="https://images.seeklogo.com/logo-png/32/1/shopee-logo-png_seeklogo-326282.png"
                className="mr-3 h-6 sm:h-9 opacity-100"
                alt="Flowbite React Logo"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Flowbite
              </span>
              <div className="max-w-xl ps-5">
                <TextInput id="email4" type="email" icon={HiOutlineSearch } placeholder="Tìm kiếm phim , diễn viên" />
              </div>
            </div>
          </div> 

          <div className="shrink-0">
            <div className="grid grid-cols-4 gap-10 text-white ">
              <div className="flex justify-center items-center cursor-pointer group relative">
                <span className="text-white hover:text-amber-400 pe-1"> Chủ đề</span>
                  <FaCaretDown />
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[300px] bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                  <ul>
                    <li className="px-4 py-2 hover:bg-amber-400 hover:text-black cursor-pointer">Option 1</li>
                    <li className="px-4 py-2 hover:bg-amber-400 hover:text-black cursor-pointer">Option 2</li>
                    <li className="px-4 py-2 hover:bg-amber-400 hover:text-black cursor-pointer">Option 3</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center items-center cursor-pointer text-white hover:text-amber-400">
                <span className=" pe-1"> Thể loại</span>
                <FaCaretDown />              
              </div>


              <div className="cursor-pointer ">
                <span className="text-white hover:text-amber-400"> Diễn viên</span>
              </div>

              <div className="flex justify-center items-center cursor-pointer">
                <span className="text-white hover:text-amber-400 pe-1"> Quốc gia</span>
                <FaCaretDown />
              </div>
            </div>
          </div>

          <div className="flex-1">
           <div className="flex justify-end items-center">
              <Button pill color='light'>
                <HiOutlineUser className="mr-2 h-5 w-5" />Thành viên
              </Button>
            </div>
          </div>
        </div>
      
      </Navbar>
    </>
  );
};

export default NavBarLayout;
