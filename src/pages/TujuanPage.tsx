import { useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkMode";
import Navbar from "../components/Navbar";

const TujuanPage = () => {
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
          <h1 className="text-2xl font-bold text-[#456af8]">Tujuan Kami</h1>
        </div>
        <div
          className={`${
            isDarkMode
              ? "bg-[#303030] text-[#f0f0f0]"
              : "bg-[#ffffff] text-[#353535]"
          } rounded-lg p-6 flex flex-col text-justify items-start gap-4 shadow-md mt-4`}
        >
          <p>
            <b>Mengapa situs ini dibuat?</b>
          </p>
          <p>
            SMAN 1 Prambanan percaya bahwa literasi adalah kunci pengembangan
            diri. Situs ini dibuat untuk memudahkan akses bacaan, terutama
            novel bagi siswa yang ingin membaca kapan saja tanpa hambatan biaya
            atau lokasi. Kami juga ingin mendorong minat baca dan kebiasaan
            diskusi kritis antar siswa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TujuanPage;
