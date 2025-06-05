import { Outlet } from "react-router-dom";
import { lazy } from "react";

import { useListProviderAdmin } from "@/stores/ListProviderAdmin";

const SidebarLayout = lazy(() => import("./SideBar"));
const MovieModal = lazy(() => import("@/admin/movie/modal/MovieModal"));
const ActorModal = lazy(() => import("@/admin/actor/modal/ActorModal"));
const CategoryModal = lazy(
  () => import("@/admin/category/modal/CategoryModal")
);
const CountryModal = lazy(() => import("@/admin/country/modal/CountryModal"));
const TopicModal = lazy(() => import("@/admin/topic/modal/TopicModal"));

const TopMovieModal = lazy(
  () => import("@/admin/top-movie/modal/TopMovieModal")
);

const MasterLayoutAdmin = () => {
  const {
    itemIdMovieForUpdate,
    itemIdActorForUpdate,
    itemIdCategoryForUpdate,
    itemIdCountryForUpdate,
    itemIdTopicForUpdate,
    itemIdTopMovieForUpdate,
  } = useListProviderAdmin();

  return (
    <>
      <div className="flex min-h-screen">
        <SidebarLayout />
        {itemIdMovieForUpdate !== undefined && <MovieModal />}
        {itemIdActorForUpdate !== undefined && <ActorModal />}
        {itemIdCategoryForUpdate !== undefined && <CategoryModal />}
        {itemIdCountryForUpdate !== undefined && <CountryModal />}
        {itemIdTopicForUpdate !== undefined && <TopicModal />}
        {itemIdTopMovieForUpdate !== undefined && <TopMovieModal />}
        <div className="flex-1 mx-auto p-5 min-h-screen bg-gray-100 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayoutAdmin;
