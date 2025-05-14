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
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  dataSearch: string;
  setDataSearch: Dispatch<SetStateAction<string>>;
  numPage: number;
  setNumPage: Dispatch<SetStateAction<number>>;
};

export type PaginationType = {
  previous: string;
  next: string;
  page: number | null;
};



// Main Types
export type MovieItem = {
  id: number;
  description: string;
  duration: string;
  image: string | null
  image_avatar: string | null
  video: string | null
  imdb: number
  rating: number
  is_ads: boolean
  is_banner: boolean
  language: string
  release_date: string
  title: string
  slug: string
  created_at?: string;
  category?: Category;
  actor?: Actor;
  country?: Country;
  topic?: Topic;
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

export type Category = {
  id: number;
  name: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
};

export type Topic = {
  id: number;
  title: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
};

export type Country = {
  id: number;
  name: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
};

export type Actor = {
  id: number;
  name: string;
  image: string;
  info?: string;
  birthday?: string;
  gender?: string;
  country?: string;
  created_at?: string;
  updated_at?: string;
}
