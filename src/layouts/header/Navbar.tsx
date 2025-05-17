import type { CategoryItem, CountryItem, TopicItem } from "@/helpers/models";
import { useListProvider } from "@/stores/ListProvider";
import { Navbar, Button, TextInput } from "flowbite-react";

// import { HiOutlineSearch , HiOutlineUser } from "react-icons/hi";
// import { FaCaretDown } from "react-icons/fa";

const NavBarLayout = () => {
  const { dataCategory, dataCountry, dataTopic } = useListProvider();

  return (
    <>
      <Navbar fluid style={{ backgroundColor: "transparent" }}>
        <div className="flex justify-between items-center w-full">
          <div className="flex-1">
            <div className="flex justify-center items-center">
              <img
                src="https://images.seeklogo.com/logo-png/22/2/garuda-pancasila-logo-png_seeklogo-229617.png"
                className="mr-3 h-6 sm:h-9 opacity-100"
                alt="Flowbite React Logo"
              />
              {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Flowbite
              </span> */}
              <div className="max-w-xl ps-5">
                <TextInput
                  id="email4"
                  type="email"
                  // icon={HiOutlineSearch}
                  placeholder="Tìm kiếm phim , diễn viên"
                />
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <div className="grid grid-cols-4 gap-10 text-white ">
              <div className="flex justify-center items-center cursor-pointer group relative">
                <span className="text-white hover:text-amber-400 pe-1">
                  {" "}
                  Chủ đề
                </span>
                <>
                  <svg
                    className="w-[15px] h-[15px] text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[500px] bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                  <div className="grid grid-cols-4 p-2">
                    {Array.isArray(dataTopic) &&
                      dataTopic.map((item: TopicItem) => (
                        <div
                          className="p-3 rounded-xl hover:text-amber-300 hover:bg-gray-700 text-center text-sm"
                          key={item.id}
                        >
                          {item.title}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center cursor-pointer group relative">
                <span className="text-white hover:text-amber-400 pe-1">
                  {" "}
                  Thể loại
                </span>
                <>
                  <svg
                    className="w-[15px] h-[15px] text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[500px] bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                  <div className="grid grid-cols-4 p-2">
                    {Array.isArray(dataCategory) &&
                      dataCategory.map((item: CategoryItem) => (
                        <div
                          className="p-3 rounded-xl hover:text-amber-300 hover:bg-gray-700 text-center text-sm"
                          key={item.id}
                        >
                          {item.name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center cursor-pointer group relative ">
                <span className="text-white hover:text-amber-400 pe-1">
                  {" "}
                  Quốc gia
                </span>
                <>
                  <svg
                    className="w-[15px] h-[15px] text-gray-800 dark:text-white "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[100px] bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                  <div className="grid grid-cols-1 p-2">
                    {Array.isArray(dataCountry) &&
                      dataCountry.map((item: CountryItem) => (
                        <div
                          className="p-3 rounded-xl hover:text-amber-300 hover:bg-gray-700 text-center text-sm"
                          key={item.id}
                        >
                          {item.name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center cursor-pointer">
                <span className="text-white hover:text-amber-400 pe-1">
                  {" "}
                  Diễn viên
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-end items-center">
              <Button pill color="light">
                <svg
                  className="w-[20px] h-[20px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                    clipRule="evenodd"
                  />
                </svg>
                Thành viên
              </Button>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default NavBarLayout;
