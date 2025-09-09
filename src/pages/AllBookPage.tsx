import { Link, useSearchParams } from "react-router";
import NavbarComponent from "../components/Navbar";
import { useDarkMode } from "../context/DarkMode";
import { useEffect, useState } from "react";
import useBooks from "../hook/useBook";
import SkeletonListProduct from "../components/skeleton/SkeletonListBook";
import CardBook from "../components/CardBook";

const AllBook = () => {
  const { books, loading, error } = useBooks();
  const { isDarkMode } = useDarkMode();
  const [filteredProducts, setFilteredProducts] = useState(books);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword"); //Ambil keyword dari URL

  useEffect(() => {
    let filtered = [...books];

    // Filter berdasarkan keyword
    if (keyword) {
      filtered = filtered.filter((book) =>
        book.title?.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [keyword, books]);

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
        <div className="text-[#353535] text-xl font-medium p-4">
          <span
            className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"}`}
          >
            <Link className="text-[#456af8]" to="/">
              Home
            </Link>{" "}
            / Semua Produk
          </span>
        </div>

        <div className="p-4 w-full">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonListProduct key={index} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {filteredProducts.map((product) => (
                <CardBook
                  key={product.id}
                  {...product}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          ) : (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">
                <i className="bx bx-x-circle mr-1"></i>
                Produk tidak ditemukan.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllBook;
