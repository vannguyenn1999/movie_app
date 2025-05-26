import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] 
  );
  return debouncedValue;
}

export type UseImagePreviewProps = {
  defaultPreview?: {
    path: string;
    file: File | null;
  };
};

export const useImagePreview = ({
  defaultPreview = {
    path: "",
    file: null,
  },
}: UseImagePreviewProps = {}) => {
  const [imagePreview, setImagePreview] = useState<object>(defaultPreview);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement> | null) => {
    const file = event?.currentTarget.files?.[0] as File;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview({
          file,
          path: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(defaultPreview);
    }
  };

  return {
    imagePreview,
    handleImageChange,
  };
};
