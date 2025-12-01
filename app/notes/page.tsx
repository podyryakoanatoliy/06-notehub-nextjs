import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params?: { query?: string; id?: string };
};

const Notes = async ({ params }: Props) => {
  const query = params?.query ?? "";
  const id = params?.id ?? "1";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", query, id],
    queryFn: () => fetchNotes(query, Number(id)),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Notes;
