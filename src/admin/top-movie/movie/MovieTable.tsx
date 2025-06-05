import { useQuery } from "@tanstack/react-query";
import {
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { lazy, useState, type FC } from "react";
import { HiOutlineSearch } from "react-icons/hi";

import { getData } from "@/core/request";
import PaginationCompoment from "@/helpers/compoments/PaginationCompoment";
import { useDebounce } from "@/helpers/hook";
import type { MovieItem } from "@/helpers/models";
import type { MovieOtherDataProps } from "@/core/models";

const LoadingCompoment = lazy(() => import("@/compoments/loading/Loading2"));

const MovieTable: FC<MovieOtherDataProps> = ({ formik }) => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearchTerm = useDebounce(search, 300);

  const { isPending, data } = useQuery({
    queryKey: [`MOVIE_TABLE_${page}_${debouncedSearchTerm}`],
    queryFn: () =>
      getData(`movies/?page=${page}&search=${debouncedSearchTerm}`),
  });

  if (isPending) return <LoadingCompoment />;

  const handSearch = (text: string) => {
    setSearch(text);
    setPage(1);
  };

  const handleChooseMovie = (id: number) => {
    formik.setFieldValue("movie", String(id));
  };
  return (
    <>
      <div className="flex justify-start items-center my-4">
        <div className="max-w-xl me-4">
          <TextInput
            // ref={inputRefs}
            id="search"
            type="text"
            icon={HiOutlineSearch}
            placeholder="Tìm phim"
            onChange={(e) => handSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto max-h-[400px]">
        <Table hoverable>
          <TableHead>
            <TableRow>
              <TableHeadCell className="text-center"></TableHeadCell>
              <TableHeadCell className="text-center">STT</TableHeadCell>
              <TableHeadCell className="text-center min-w-[200px]">
                Chủ để{" "}
              </TableHeadCell>

              <TableHeadCell className="text-center min-w-[200px]">
                Ảnh Nền
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {!isPending && data && data?.results.length > 0 ? (
              <>
                {data?.results.map((item: MovieItem, index: number) => (
                  <TableRow
                    key={item.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="p-4">
                      <Radio
                        name="movie"
                        onClick={() => handleChooseMovie(item.id)}
                        className="ring-0 focus:ring-0 hover:ring-0"
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-sm text-gray-900 dark:text-white text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-center">{item.title}</TableCell>

                    <TableCell>
                      <div className="flex justify-center items-center">
                        <img
                          src={item.image ? String(item.image) : ""}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                          loading="lazy"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell
                  colSpan={21}
                  className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"
                >
                  {isPending ? (
                    <LoadingCompoment />
                  ) : (
                    <span>Không có dữ liệu</span>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!isPending && (
        <PaginationCompoment
          currentPage={page}
          setPage={setPage}
          totalPage={data?.total_pages ? Number(data?.total_pages) : 1}
        />
      )}
    </>
  );
};

export default MovieTable;
