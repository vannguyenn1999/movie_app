import type { Dispatch, ReactNode, SetStateAction } from "react";

// Common Types
export type ID = undefined | null | number;

export type WithChildren = {
  children?: ReactNode;
};

export type QueryRequestContext = {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
};

export type QueryRequestContext2 = {
  isPendingTopic: boolean,
  dataTopic: TopicItem | [],

  isPendingCategory: boolean,
  dataCategory: CategoryItem | [],

  isPendingCountry: boolean,
  dataCountry: CountryItem | [],

  isPendingHeader: boolean,
  dataHeader: MovieItem | [],

  refetchTopic: () => void,
  refetchCategory: () => void,
  refetchCountry: () => void,

};

export type ListViewContextProps = {
  itemIdMovieForUpdate: ID
  setItemIdMovieForUpdate: Dispatch<SetStateAction<ID>>

  itemIdCategoryForUpdate: ID
  setItemIdCategoryForUpdate: Dispatch<SetStateAction<ID>>

  itemIdTopicForUpdate: ID
  setItemIdTopicForUpdate: Dispatch<SetStateAction<ID>>

  itemIdCountryForUpdate: ID
  setItemIdCountryForUpdate: Dispatch<SetStateAction<ID>>

  itemIdActorForUpdate: ID
  setItemIdActorForUpdate: Dispatch<SetStateAction<ID>>

  itemIdTopMovieForUpdate: ID
  setItemIdTopMovieForUpdate: Dispatch<SetStateAction<ID>>
}

export type PaginationType = {
  previous: string;
  next: string;
  page: number | null;
};



// Main Types
export type MovieItem = {
  id: number;
  description?: string;
  duration?: string;
  image?: string | null | File
  image_avatar?: string | null | File
  video?: string | null | File
  imdb?: number
  rating?: number
  is_ads?: boolean
  is_banner?: boolean
  language?: string
  release_date?: string | Date
  title?: string
  slug?: string
  created_at?: string;
  updated_at?: string;
  category?: CategoryItem;
  actor?: ActorItem;
  country?: CountryItem;
  topic?: TopicItem;
};


// Initial Values
export const initialQueryRequest: QueryRequestContext = {
  state: "",
  setState: () => { },
};

export const initialQueryResponse = {
  refetch: () => { },
  isLoading: false,
  query: "",
};

export type QueryResponseContextProps = {
  response?: unknown | undefined;
  refetch: () => void;
  isLoading: boolean;
  query?: string;
};

// Configurations
export const CONFIG_UPLOAD_IMG = {
  headers: { "Content-Type": "multipart/form-data" },
};

export type CategoryItem = {
  id: number;
  name: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
};

export type TopicItem = {
  id: number;
  title: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
};

export type CountryItem = {
  id: number;
  name: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
};

export type ActorItem = {
  id: number;
  name: string;
  image: string;
  info?: string;
  birthday?: string | Date;
  gender?: string;
  country?: string;
  created_at?: string;
  updated_at?: string;
  slug?: string
}

export type TopMovie = {
  id: number
  movie?: MovieItem
  level?: number
  created_at?: string
  updated_at?: string
}


export type ResponsiveData = {
  count: number,
  next: string | null,
  pre: string | null,
  results: MovieItem[] | ActorItem[] | []
}
