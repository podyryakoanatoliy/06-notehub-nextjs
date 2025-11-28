import type { Note } from "@/types/note";
import axios from "axios";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export type NoteListResponse = {
  notes: Note[];
  totalPages: number;
};

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const fetchNotes = async (
  query: string,
  page: number
): Promise<NoteListResponse> => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
    params: {
      ...(query !== "" && { search: query }),
      page,
      perPage: 12,
    },
  };
  // await delay(2000);
  const { data } = await axios.get<NoteListResponse>("/notes", options);
  return data;
};

export const createNote = async (newNote: FormValues): Promise<Note> => {
  const options = {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${myKey}`,
    },
  };
  console.log("newnote", newNote);

  const { data } = await axios.post<Note>(`/notes`, newNote, options);
  console.log("object", data);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const options = {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };
  const { data } = await axios.delete<Note>(`/notes/${id}`, options);
  return data;
};

export const fetchNoteById = async (id: string) => {
  const options = {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };
  const { data } = await axios.get<Note>(`/notes/${id}`, options);
  return data;
};
