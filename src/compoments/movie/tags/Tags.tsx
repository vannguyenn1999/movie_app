import { TabItem, Tabs } from "flowbite-react";
import { HiClipboardList } from "react-icons/hi";
import { FaUserTie, FaIndent } from "react-icons/fa";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ActorItemCompoment from "@/compoments/actor/ActorItem";
import type { ActorItem, MovieItem } from "@/helpers/models";
import LoadingCompoment from "@/compoments/loading/Loading2";
import { getData } from "@/core/request";
import MovieItemCompoment from "../MovieItem";

type TagItemProps = {
  dataActor: [];
  slug: string;
};

const TagLayout: FC<TagItemProps> = ({ dataActor, slug }) => {
  const { isPending, data } = useQuery({
    queryKey: [`MOVIE_ITEM_SUGGESTION_${slug}`],
    queryFn: () => getData(`movies/get-suggestion-movie/?category=${slug}`),
  });

  console.log("data", data);
  console.log("slug", slug);

  return (
    <div className="mt-3">
      <Tabs aria-label="Tabs with icons" variant="underline">
        <TabItem active title="Tập phim" icon={FaIndent}>
          This is{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            Profile tab's associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </TabItem>

        <TabItem title="Diễn viên" icon={FaUserTie}>
          <div className="grid grid-cols-6 gap-3 p-3">
            {dataActor &&
              (Array.isArray(dataActor) ? dataActor : []).map(
                (item: ActorItem) => (
                  <Link to={`/dien-vien/${item.slug}`} key={item.id}>
                    <ActorItemCompoment name={item.name} image={item.image} />
                  </Link>
                )
              )}
          </div>
        </TabItem>
        <TabItem title="Đề xuất" icon={HiClipboardList}>
          <>
            {isPending && <LoadingCompoment />}
            <div className="grid grid-cols-6 gap-3 p-3">
              {data &&
                data.map((item: MovieItem) => (
                  <MovieItemCompoment
                    id={item.id}
                    duration={item.duration}
                    image={item.image}
                    image_avatar={item.image_avatar}
                    imdb={item.imdb}
                    release_date={item.release_date}
                    title={item.title}
                    slug={item.slug}
                    category={
                      Array.isArray(item?.category)
                        ? item.category
                        : item?.category
                        ? [item.category]
                        : []
                    }
                  />
                ))}
            </div>
          </>
        </TabItem>
      </Tabs>
    </div>
  );
};

export default TagLayout;
