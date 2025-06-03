import { Outlet } from "react-router-dom";

import SidebarLayout from "./SideBar";
import { useListProviderAdmin } from "@/stores/ListProviderAdmin";
import MovieModal from "@/admin/movie/modal/MovieModal";
import ActorModal from "@/admin/actor/modal/ActorModal";
import CategoryModal from "@/admin/category/modal/CategoryModal";
import CountryModal from "@/admin/country/modal/CountryModal";
import TopicModal from "@/admin/topic/modal/TopicModal";
import TopMovieModal from "@/admin/top-movie/modal/TopMovieModal";

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
