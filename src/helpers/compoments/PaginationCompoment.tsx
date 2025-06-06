/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pagination } from "flowbite-react";
import { type FC } from "react";

type PaginationProps = {
  currentPage?: number;
  setPage: (page: number) => void;
  totalPage: number;
};
const PaginationCompoment: FC<PaginationProps> = ({
  currentPage,
  setPage,
  totalPage,
}) => {
  //   const [page, setPageState] = useState<number>(currentPage || 1);
  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setPage(Number(e.currentTarget.page.value));
  //   };

  const onPageChange = (page: number) => {
    setPage(page);
  };
  return (
    // <form action="" onSubmit={handleSubmit}>
    //   <div className="flex justify-end items-center mt-4">
    //     <TextInput
    //       id="page"
    //       type="number"
    //       value={page}
    //       onChange={(e) => setPageState(Number(e.target.value))}
    //       required
    //       className="max-h-[30px] max-w-[50px] me-2 appearance-none"
    //       style={{ MozAppearance: "textfield" }}
    //     />
    //     / {totalPage}
    //   </div>
    // </form>

    <div className="flex justify-end items-center mt-4">
      <Pagination
        currentPage={currentPage || 1}
        totalPages={totalPage}
        onPageChange={onPageChange}
        showIcons
        previousLabel=""
        nextLabel=""
      />
    </div>
  );
};
export default PaginationCompoment;
