// pages/NovelDetailPage.tsx
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkMode";
import Swal from "sweetalert2";
import Btn from "../components/Btn";
import NavbarComponent from "../components/Navbar";

import "swiper/swiper-bundle.css";
import useBooks from "../hook/useBook";
import type { Book } from "../types/Book";

const BookDetailPage = () => {
  const { bookSlug } = useParams<{ bookSlug: string }>(); // Ambil productSlug dari URL
  const navigate = useNavigate();
  const { books, loading, error } = useBooks(); // Ambil data produk dari custom hook
  const { isDarkMode } = useDarkMode();

  const [book, setBook] = useState<Book | null>(null); // State untuk menyimpan produk yang dipilih
  // Tambahkan state ini di component
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Ekstrak ID dari productSlug
  const bookId = bookSlug ? parseInt(bookSlug.split("-")[0]) : null;

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Cari produk berdasarkan ID
  useEffect(() => {
    if (books.length > 0 && bookId) {
      const foundBook = books.find((p) => p.id === bookId);
      if (foundBook) {
        setBook(foundBook);
      } else {
        Swal.fire({
          title: "Oops...",
          text: "Produk tidak ditemukan!",
          icon: "error",
        }).then(() => navigate("/")); // Redirect ke halaman utama jika produk tidak ditemukan
      }
    }
  }, [books, bookId, navigate]);

  // Tampilkan loading jika data sedang dimuat
  if (loading) {
    return (
      <div
        className={`${
          isDarkMode ? "bg-[#140C00]" : "bg-[#f4f6f9]"
        } flex gap-2 justify-center items-center min-h-screen z-9999`}
      >
        <div className="w-6 h-6 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin ml-2"></div>
        <p className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"}`}>
          Memuat data...
        </p>
      </div>
    );
  }

  // Tampilkan error jika terjadi kesalahan
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

  // Tampilkan pesan jika produk tidak ditemukan
  if (!book) {
    return (
      <div
        className={`${
          isDarkMode ? "bg-[#140C00]" : "bg-[#f4f6f9]"
        } flex justify-center items-center min-h-screen`}
      >
        <p className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"}`}>
          Produk tidak ditemukan
        </p>
      </div>
    );
  }

  return (
    <>
      <NavbarComponent />
      <div
        className={`${
          isDarkMode ? "bg-[#140c00]" : "bg-[#f4f6f9]"
        } p-6 pt-20 sm:pt-24 pb-24 sm:pb-28 w-full min-h-screen`}
      >
        {/* Tampilan detail produk */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 xl:gap-4 md:pt-5">
            {/* Gambar Produk */}
            <div className="flex flex-col">
              <section className="bg-[#ffffff] rounded-lg p-4 mb-3 xl:mb-4 relative">
                {/* Tombol wishlist di sudut kanan atas gambar */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
                  <button
                    onClick={() => {
                      const bookUrl = window.location.href;

                      if (navigator.share) {
                        navigator
                          .share({
                            title: book?.title ?? "Produk",
                            text: "Lihat produk ini di toko kami!",
                            url: bookUrl,
                          })
                          .catch((error) =>
                            console.error("Gagal membagikan:", error)
                          );
                      } else {
                        navigator.clipboard.writeText(bookUrl).then(() => {
                          Swal.fire({
                            icon: "success",
                            title: "Link disalin!",
                            text: "Link produk telah disalin ke clipboard.",
                            timer: 2000,
                            showConfirmButton: false,
                          });
                        });
                      }
                    }}
                    className="bg-white/70 hover:bg-white/90 p-2 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center"
                    aria-label="Bagikan produk"
                  >
                    <i className="bx bx-share-alt text-3xl text-gray-600 hover:text-blue-600"></i>
                  </button>
                </div>

                <div className="relative">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/storage/${
                      book.cover_image_path
                    }`}
                    alt={`${book.title}`}
                    className="w-full object-cover cursor-pointer"
                    width={800}
                    height={800}
                    onClick={() => {
                      setSelectedImage(
                        `${import.meta.env.VITE_API_URL}/storage/${
                          book.cover_image_path
                        }`
                      );
                      setShowImageModal(true);
                    }}
                  />
                </div>
                {showImageModal && selectedImage && (
                  <div
                    className="fixed inset-0 backdrop-blur-xs bg-[#000000b5] flex items-center justify-center z-99 p-4 w-full"
                    onClick={() => setShowImageModal(false)}
                  >
                    <img
                      src={selectedImage}
                      alt="Augmented Zoom"
                      className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                      onClick={(e) => e.stopPropagation()} // biar klik gambar tidak menutup
                    />
                  </div>
                )}
              </section>
            </div>

            {/* Informasi Produk Lanjutan */}
            <section className="rounded-lg">
              <div className="flex flex-col">
                <section
                  className={`${
                    isDarkMode ? "bg-[#303030]" : "bg-[#ffffff]"
                  } p-6 mb-3 xl:mb-4 rounded-lg`}
                >
                  <div className="flex flex-row items-center">
                    <h1
                      className={`${
                        isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                      } text-2xl md:text-3xl font-bold`}
                    >
                      {book.title}
                    </h1>
                  </div>
                  <div className="flex flex-row items-center mt-2">
                    {book.author}
                  </div>

                  <hr className="mt-4 border-t border-gray-300" />
                  <h3
                    className={`${
                      isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                    } mt-4 text-lg font-semibold`}
                  >
                    Isi Produk:
                  </h3>
                  <div
                    className={`${
                      isDarkMode
                        ? "bg-[#404040] text-[#f0f0f0]"
                        : "bg-[#f4f6f9] text-[#353535] shadow-[inset_3px_3px_6px_#DBDBDB,_inset_-3px_-3px_6px_#FFFFFF]"
                    } p-3 rounded-lg flex mt-4`}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}/storage/${
                        book.cover_image_path
                      }`}
                      alt={book.title}
                      className="h-16 w-16 mr-2 object-cover rounded-lg"
                      loading="lazy"
                      width={800}
                      height={800}
                    />
                    <div
                      className={`${
                        isDarkMode ? "text-[#F0F0F0]" : "text-[#353535]"
                      } flex-1`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold">{book.title}</span>
                        </div>
                        <div className="text-xxs pl-2">x1</div>
                      </div>
                    </div>
                  </div>
                  {/* <iframe className="mt-4 w-full"
                    src="https://mywebar.com/p/Project_0_kae8ad6ut"
                    allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;"
                  ></iframe> */}
                </section>

                {/* Informasi Produk */}
                <div className="hidden md:block">
                  <section
                    className={`${
                      isDarkMode
                        ? "bg-[#303030] text-[#f0f0f0]"
                        : "bg-[#ffffff] text-[#353535]"
                    } rounded-lg p-4 mb-3 xl:mb-4`}
                  >
                    <div className="p6">Informasi Produk</div>
                    <hr className="mt-4 border-t border-gray-300" />
                    <div className="pt-4">
                      <h1 className="text-lg font-bold">Synopsis:</h1>
                      <div className="text-justify leading-relaxed">
                        {book.synopsis}
                      </div>
                    </div>

                    <div className="pt-4">
                      <h1 className="text-lg font-bold">Author:</h1>
                      <div>{book.author}</div>
                    </div>
                  </section>

                  <section
                    className={`${
                      isDarkMode
                        ? "bg-[#303030] text-[#f0f0f0]"
                        : "bg-[#ffffff] text-[#353535]"
                    } rounded-lg p-6 mb-3 xl:mb-4`}
                  >
                    <h2 className="h3 pb-2">Jaminan Mutu</h2>
                    <div className="pt-4 flex items-center">
                      <i className="text-xl bx bx-check-circle text-[#456af8]"></i>
                      <div>100% Baca Gratis</div>
                    </div>
                  </section>

                  <div className="p-2">
                    {/* <ProductReviews productId={product.id} /> */}
                  </div>
                  <div
                    className={`${
                      isDarkMode ? "bg-[#303030]" : "bg-[#ffffff]"
                    } fixed gap-6 bottom-0 left-0 w-full p-4 shadow-2xl flex justify-between items-center z-50`}
                  >
                    <Btn
                      className="flex-1"
                      // variant="outline"
                      onClick={() => setShowPdfModal(true)}
                    >
                      <i className="bx bx-check-circle text-lg text-green-500"></i>{" "}
                      Baca
                    </Btn>
                  </div>
                </div>

                <div className="p-2 md:hidden">
                  {/* <ProductReviews productId={product.id} /> */}
                </div>

                {/* Tombol untuk mobile */}
                <div className="mt-4 md:hidden">
                  <section
                    className={`${
                      isDarkMode
                        ? "bg-[#303030] text-[#f0f0f0]"
                        : "bg-[#ffffff] text-[#353535]"
                    } rounded-lg p-4 mb-3 xl:mb-4`}
                  >
                    <div className="p6">Informasi Produk</div>
                    <hr className="mt-4 border-t border-gray-300" />
                    <p>{book.synopsis}</p>
                  </section>

                  <section
                    className={`${
                      isDarkMode
                        ? "bg-[#303030] text-[#f0f0f0]"
                        : "bg-[#ffffff] text-[#353535]"
                    } rounded-lg p-6 mb-3 xl:mb-4`}
                  >
                    <h2 className="h3 pb-2">Jaminan Mutu</h2>
                    <div className="pt-4 flex items-center">
                      <i className="text-xl bx bx-check-circle text-[#456af8]"></i>
                      <div>100% Produk Original</div>
                    </div>
                  </section>
                  <div
                    className={`${
                      isDarkMode ? "bg-[#303030]" : "bg-[#ffffff]"
                    } fixed gap-6 bottom-0 left-0 w-full p-4 shadow-2xl flex justify-between items-center z-50`}
                  >
                    <Btn
                      className="flex-1"
                      //   variant="outline"
                      onClick={() => setShowPdfModal(true)}
                    >
                      <i className="bx bx-check-circle text-lg text-green-500"></i>{" "}
                      Baca
                    </Btn>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {showPdfModal && book && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white w-full h-full md:w-[90%] md:h-[90%] rounded-lg overflow-hidden relative">
              <button
                onClick={() => setShowPdfModal(false)}
                className="absolute cursor-pointer top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center z-50"
              >
                ✕
              </button>

              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold text-center">
                    {book.title}
                  </h3>
                </div>

                {/* PDF Container */}
                <div className="flex-1">
                  {/* Desktop: iframe langsung */}
                  <div className="hidden md:block w-full h-full">
                    <iframe
                      src={`${import.meta.env.VITE_API_URL}/storage/${
                        book.pdf_file_path
                      }#toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-full border-none"
                      title={`PDF Viewer - ${book.title}`}
                    />
                  </div>

                  {/* Mobile: Google Docs Viewer */}
                  <div className="block md:hidden w-full h-full">
                    <iframe
                      src={`https://docs.google.com/gview?embedded=true&url=${
                        import.meta.env.VITE_API_URL
                      }/storage/${book.pdf_file_path}`}
                      className="w-full h-full border-none"
                      title={`PDF Viewer Mobile - ${book.title}`}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="p-3 border-t bg-gray-50 text-center">
                  <span className="text-sm text-gray-600">
                    Gunakan tombol ✕ di atas untuk menutup
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookDetailPage;
