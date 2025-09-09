import { useMemo } from "react";
import Navbar from "../components/Navbar";
import { useDarkMode } from "../context/DarkMode";
import useBooks from "../hook/useBook";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router";
import SkeletonListBook from "../components/skeleton/SkeletonListBook";
import CardBook from "../components/CardBook";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import Category from "../components/Categories";

const HomePage = () => {
  const { books, loading } = useBooks();
  const { isDarkMode } = useDarkMode();

  const displayedBooks = useMemo(() => books.slice(0, 4), [books]);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900" : "bg-[#f4f6f9]"
      } pt-16 sm:pt-20 overflow-x-hidden w-full min-h-screen max-w-5xl mx-auto`}
    >
      <Navbar />
      <div className="p-4">
        {/* <Banner /> */}
        <SearchBar />
        {/* Kategori */}
        <div className="w-full">
          <div className="mx-auto">
            <h2
              className={`${
                isDarkMode ? "text-[#f0f0f0]" : "text-[#140c00]"
              } text-xl font-bold mb-4`}
            >
              Kategori
            </h2>
            <Category />
          </div>
        </div>

        {/* All Products Section */}
        <div className="w-full mt-8">
          <div className="mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`${
                  isDarkMode ? "text-[#f0f0f0]" : "text-[#140c00]"
                } text-xl font-bold`}
              >
                Semua Produk
              </h2>
              <button type="button" className="cursor-pointer">
                <span className="text-xl text-[#456af8] font-medium">
                  <Link to="/all-book">Lihat Semua</Link>
                </span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonListBook key={index} />
                  ))
                : displayedBooks.map((book) => (
                    <CardBook
                      key={book.id}
                      {...book}
                      isDarkMode={isDarkMode}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </div>
  );
};

export default HomePage;
