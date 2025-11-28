"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
// import { BallTriangle } from "react-loader-spinner";
// import Alert from "@mui/material/Alert";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleChange = useDebouncedCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(evt.target.value);
      setPage(1);
    },
    1000
  );
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  console.log(data);
  const handleCloseModal = () => setOpenModal(!openModal);
  if (isLoading) return <p>Loading...</p>;

  if (error || !data) return <p>Some error..</p>;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {data !== undefined && data?.totalPages > 1 && (
          <Pagination
            totalPage={data.totalPages}
            currentPage={page}
            changePage={(pg) => setPage(pg)}
          />
        )}
        <button className={css.button} onClick={() => setOpenModal(!openModal)}>
          Create note +
        </button>
        {openModal && (
          <Modal onClose={handleCloseModal}>
            {" "}
            <NoteForm closeModal={handleCloseModal} />{" "}
          </Modal>
        )}
      </header>
      {data !== undefined && <NoteList notes={data.notes} />}
    </div>
  );
}
