// hooks/useBooks.ts
import { useEffect, useState } from "react";
import axios from "axios";
import type { Book } from "../types/Book";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Book[]>(`${import.meta.env.VITE_APP_API_URL}/api/book`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("Gagal memuat produk");
        setLoading(false);
      });
  }, []);

  return { books, loading, error };
};

export default useBooks;
