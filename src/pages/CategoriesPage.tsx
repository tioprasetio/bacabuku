import { Link, useParams } from "react-router";
import NavbarComponent from "../components/Navbar";
import { useDarkMode } from "../context/DarkMode";
import { useEffect, useState } from "react";
import useCategories from "../hook/useCategories";
import useBooks from "../hook/useBook";
import type { Book } from "../types/Book";
import CardBook from "../components/CardBook";
import SkeletonListProduct from "../components/skeleton/SkeletonListBook";

const CategoryPage = () => {
  const { isDarkMode } = useDarkMode();
  const { category } = useParams(); // Ambil kategori dari URL
  const decodedCategory = decodeURIComponent(category || ""); // Dekode jika ada spasi
  const { books, loading, error } = useBooks();
  const { categories } = useCategories(); // Ambil daftar kategori
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    let filtered = [...books];

    if (decodedCategory && categories.length > 0 && books.length > 0) {
      // Cari category_id berdasarkan nama kategori
      const matchedCategory = categories.find(
        (cat) => cat.name === decodedCategory
      );

      if (matchedCategory) {
        const categoryId = matchedCategory.id; // Ambil category_id
        // console.log("Found category ID:", categoryId);

        // Filter produk berdasarkan category_id
        filtered = books.filter((book) => {
          //   const rating = book.average_rating || 0;
          return book.category_id === categoryId;
        });

        setFilteredBooks(filtered);
      } else {
        // console.log("Category not found!");
        setFilteredBooks([]);
      }
    }
  }, [decodedCategory, books, categories]);

  if (error)
    return (
      <div className="p-4 w-full">
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">
            <i className="bx bx-x-circle mr-1"></i>
            {error}
          </p>
        </div>
      </div>
    );

  return (
    <>
      <NavbarComponent />
      <div
        className={`${
          isDarkMode ? "bg-gray-900" : "bg-[#f4f6f9]"
        } overflow-x-hidden w-full min-h-screen pt-16 sm:pt-24`}
      >
        <div className="text-[#353535] text-xl font-medium p-6">
          <span
            className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"}`}
          >
            <Link className="text-[#456af8]" to="/">
              Home
            </Link>{" "}
            / {decodedCategory}
          </span>
        </div>

        <div className="p-6 w-full">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonListProduct key={index} />
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBooks.map((book) => (
                <CardBook key={book.id} {...book} isDarkMode={isDarkMode} />
              ))}
            </div>
          ) : (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">
                <i className="bx bx-x-circle mr-1"></i>
                Maaf, tidak ada buku tersedia untuk kategori ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
