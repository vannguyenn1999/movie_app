import { Navbar, TextInput } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import type { CategoryItem, CountryItem, TopicItem } from "@/helpers/models";
import { useListProvider } from "@/stores/ListProvider";
import LoginCompoment from "@/compoments/login/LoginCompoment";
import { useAuth } from "@/core/Auth";
import HeaderProfile from "@/compoments/login/HeaderProfile";

const HeaderLayout = () => {
  const inputRefs = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { dataCategory, dataCountry, dataTopic } = useListProvider();
  const { auth } = useAuth();

  console.log("auth", auth);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/tim-kiem/${inputRefs?.current?.value}`);
  };

  return (
    <>
      <Navbar fluid style={{ backgroundColor: "transparent" }}>
        <div className="flex justify-between items-center w-full">
          <div className="flex-1">
            <div className="flex justify-center items-center">
              <Link to={"/home"}>
                <img
                  src={import.meta.env.VITE_REACT_APP_IMG_HEADER}
                  className="mr-3 h-6 sm:h-9 opacity-100"
                  alt="Flowbite React Logo"
                />
              </Link>
              {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Flowbite
              </span> */}
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="max-w-xl ps-5">
                  <TextInput
                    ref={inputRefs}
                    id="search"
                    type="text"
                    icon={HiOutlineSearch}
                    placeholder="Tìm kiếm phim , diễn viên"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="shrink-0">
            <div className="grid grid-cols-4 gap-10 text-white ">
              <div className="flex justify-center items-center cursor-pointer group relative">
                <span className="text-white hover:text-amber-400 pe-1">
                  {" "}
                  Chủ đề
                </span>
                <FaCaretDown />
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[500px] bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                  <div className="grid grid-cols-4 p-2">
                    {Array.isArray(dataTopic) &&
                      dataTopic.map((item: TopicItem) => (
                        <Link to={`/chu-de/${item.slug}`} key={item.id}>
                          <div className="p-3 rounded-xl hover:text-amber-300 hover:bg-gray-700 text-center text-sm">
                            {item.title}
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center cursor-pointer group relative">
                <span className="text-white hover:text-amber-400 pe-1">
                  {" "}
                  Thể loại
                </span>
                <FaCaretDown />
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[500px] bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                  <div className="grid grid-cols-4 p-2">
                    {Array.isArray(dataCategory) &&
                      dataCategory.map((item: CategoryItem) => (
                        <Link to={`/the-loai/${item.slug}`} key={item.id}>
                          <div className="p-3 rounded-xl hover:text-amber-300 hover:bg-gray-700 text-center text-sm">
                            {item.name}
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center cursor-pointer group relative ">
                <span className="text-white hover:text-amber-400 pe-1">
                  {" "}
                  Quốc gia
                </span>
                <FaCaretDown />
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[100px] bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                  <div className="grid grid-cols-1 p-2">
                    {Array.isArray(dataCountry) &&
                      dataCountry.map((item: CountryItem) => (
                        <Link to={`/quoc-gia/${item.slug}`} key={item.id}>
                          <div className="p-3 rounded-xl hover:text-amber-300 hover:bg-gray-700 text-center text-sm">
                            {item.name}
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>

              <Link to={"/dien-vien"}>
                <div className="flex justify-center items-center cursor-pointer">
                  <span className="text-white hover:text-amber-400 pe-1">
                    {" "}
                    Diễn viên
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-end items-center">
              {/* <Button pill color="light">
                <HiOutlineUser />
                Thành viên
              </Button> */}
              {auth ? <HeaderProfile /> : <LoginCompoment />}
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default HeaderLayout;
