import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 

import MasterLayout from "../layouts/MasterLayout";  
import TopicPage from "../compoments/TopicPage"; 
import ActorPage from "../compoments/actor/ActorPage"; 
import ActorDetailPage from "../compoments/actor/ActorDetailPage"; 
import MoviePage from "../compoments/movie/MoviePage"; 
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

            {/* <Route path="/chu-de/:slug" element={<TopicPage />} />
            <Route path="/the-loai/:slug" element={<TopicPage />} />
            <Route path="/quoc-gia/:slug" element={<TopicPage />} /> */}

            <Route path="/:type/:slug" element={<MoviePage />} />

            <Route path="/dien-vien" element={<ActorPage />} />
            <Route path="/dien-vien/:slug" element={<ActorDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PublicRouter;
