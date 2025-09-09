import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/NovelDetailPage";
import CategoryPage from "./pages/CategoriesPage";
import AllBook from "./pages/AllBookPage";
import TujuanPage from "./pages/TujuanPage";
import CaraBacaPage from "./pages/CaraBacaPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:bookSlug" element={<BookDetailPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/all-book" element={<AllBook />} />
        <Route path="/tujuan" element={<TujuanPage />} />
        <Route path="/cara-baca" element={<CaraBacaPage />} />
      </Routes>
    </>
  );
}

export default App;
