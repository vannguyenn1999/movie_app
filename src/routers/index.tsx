import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 

import MasterLayout from "../layouts/MasterLayout"; 
import TopicPage from "../compoments/TopicPage"; 
import MovieDetailPage from "../compoments/movie/MovieDetailPage"; 
import MovieWatchPage from "../compoments/movie/MovieWatchPage"; 


const PublicRouter = () => {
  return (
    <>
      <ToastContainer
        className="mt-19"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route element={<MasterLayout />}>
            <Route path="/*" element={<Navigate to="/home" />} />
            <Route path="/chu-de" element={<TopicPage />} />
            <Route path="/phim/:slug" element={<MovieDetailPage />} />
            <Route path="/xem-phim/:slug" element={<MovieWatchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PublicRouter;
