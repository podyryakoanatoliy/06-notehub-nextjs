import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
interface PaginationProps {
  totalPage: number;
  currentPage: number;
  changePage: (page: number) => void;
}
export default function Pagination({
  totalPage,
  currentPage,
  changePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPage}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={(selectedItem) => changePage(selectedItem.selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
