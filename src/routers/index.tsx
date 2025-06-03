import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { lazy } from "react";

import { useAuth } from "@/core/Auth";
import { ListProviderProvider } from "@/stores/ListProvider";
import { ListProviderProviderAdmin } from "@/stores/ListProviderAdmin";

// ? Admin
import MasterLayoutAdmin from "@/layouts/admin/MasterLayoutAdmin";
const ActorAdminPage = lazy(() => import("@/admin/actor/ActorAdminPage"));
const CategoryAdminPage = lazy(
  () => import("@/admin/category/CategoryAdminPage")
);
const CountryAdminPage = lazy(() => import("@/admin/country/CountryAdminPage"));
const MovieAdminPage = lazy(() => import("@/admin/movie/MovieAdminPage"));
const TopicAdminPage = lazy(() => import("@/admin/topic/TopicAdminPage"));

// ? User
import MasterLayout from "@/layouts/public/MasterLayout";
import TopMoviePage from "@/admin/top-movie/TopMoviePage";

const ActorDetailPage = lazy(
  () => import("@/compoments/actor/ActorDetailPage")
);
const TopicPage = lazy(() => import("@/compoments/topic/TopicPage"));
const ActorPage = lazy(() => import("@/compoments/actor/ActorPage"));

const MoviePage = lazy(() => import("@/compoments/movie/MoviePage"));
const MovieDetailPage = lazy(
  () => import("@/compoments/movie/MovieDetailPage")
);
const MovieWatchPage = lazy(() => import("@/compoments/movie/MovieWatchPage"));
const HomePage = lazy(() => import("@/compoments/home/HomePage"));
const SearchPage = lazy(() => import("@/compoments/search/SearchPage"));

const PublicRouter = () => {
  const { auth } = useAuth();
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
      <ListProviderProvider>
        <ListProviderProviderAdmin>
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route element={<MasterLayout />}>
                <Route path="/chu-de" element={<TopicPage />} />
                <Route path="/phim/:slug" element={<MovieDetailPage />} />
                <Route path="/xem-phim/:slug" element={<MovieWatchPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/:type/:slug" element={<MoviePage />} />
                <Route path="/dien-vien" element={<ActorPage />} />
                <Route path="/dien-vien/:slug" element={<ActorDetailPage />} />
                <Route path="/tim-kiem/:slug" element={<SearchPage />} />
                <Route path="/*" element={<Navigate to="/home" />} />
              </Route>

              {/* Admin */}
              {auth && (
                <Route path="/admin" element={<MasterLayoutAdmin />}>
                  <Route path="dien-vien" element={<ActorAdminPage />} />
                  <Route path="the-loai" element={<CategoryAdminPage />} />
                  <Route path="chu-de" element={<TopicAdminPage />} />
                  <Route path="quoc-gia" element={<CountryAdminPage />} />
                  <Route path="phim" element={<MovieAdminPage />} />
                  <Route path="top-phim" element={<TopMoviePage />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                </Route>
              )}
            </Routes>
          </BrowserRouter>
        </ListProviderProviderAdmin>
      </ListProviderProvider>
    </>
  );
};

export default PublicRouter;
