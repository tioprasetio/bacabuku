// components/CardProduct.tsx
import { useNavigate } from "react-router";
import type { Book } from "../types/Book";
import Btn from "./Btn";

interface CardBookProps extends Book {
  isDarkMode: boolean;
}

const CardBook = (props: CardBookProps) => {
  const navigate = useNavigate();

  // Destructuring props
  const {
    title = "Unknown",
    cover_image_path,
    author,
    synopsis,
    category_id,
    id,
  } = props;

  const bookSlug = title?.toLowerCase().replace(/\s+/g, "-");

  const handleClick = () => {
    navigate(`/book/${id}-${bookSlug}`, {
      state: {
        title,
        cover_image_path,
        author,
        synopsis,
        category_id,
        id,
      },
    });
  };

  return (
    <div
      className={`${
        props.isDarkMode ? "bg-gray-800 text-white" : "bg-white text-[#303030]"
      } hover:scale-105 transition-all rounded-lg shadow-lg flex flex-col items-center text-center justify-between cursor-pointer relative`}
    >
      <img
        src={`${import.meta.env.VITE_API_URL}/storage/${cover_image_path}`}
        alt={title}
        className="w-full object-cover rounded-t-lg"
        loading="lazy"
        width={800}
        height={800}
      />

      <div className="p-2 w-full">
        <div className="flex items-center flex-row w-full mt-2 text-sm">
          <div className="flex flex-col text-left gap-1">
            <div className="flex flex-row items-center">
              <span
                className={`${
                  props.isDarkMode ? "text-[#f0f0f0]" : "text-[#456af8]"
                } text-sm md:text-lg font-bold`}
              >
                {title}
              </span>
            </div>

            <div className="flex flex-row items-center text-xs sm:text-sm md:text-lg">
              <span className="text-[#959595]">{author}</span>
            </div>
          </div>
        </div>
        <Btn onClick={handleClick}>Lihat</Btn>
      </div>
    </div>
  );
};

export default CardBook;
