import { useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkMode";
import Navbar from "../components/Navbar";

const CaraBacaPage = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#140c00]" : "bg-[#f4f6f9]"
      } pt-16 sm:pt-24 overflow-x-hidden w-full min-h-screen`}
    >
      <Navbar />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <i
            className="bx bx-arrow-back text-xl text-[#456af8] md:text-2xl cursor-pointer"
            onClick={() => navigate(-1)} // Tambahkan fungsi kembali
          ></i>
          <h1 className="text-2xl font-bold text-[#456af8]">Cara Baca Buku</h1>
        </div>
        <div
          className={`${
            isDarkMode
              ? "bg-[#303030] text-[#f0f0f0]"
              : "bg-[#ffffff] text-[#353535]"
          } rounded-lg p-6 flex flex-col text-justify items-start gap-4 shadow-md mt-4`}
        >
          <p className="font-bold">Cara Membaca Buku di Website Ini</p>
          <ol className="list-decimal pl-6 w-full text-left">
            <li>Pilih buku yang akan dibaca</li>
            <li>klik tombol "Lihat" pada card buku pilihanmu</li>
            <li>Tekan tombol "Baca" di halaman detail buku</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CaraBacaPage;
