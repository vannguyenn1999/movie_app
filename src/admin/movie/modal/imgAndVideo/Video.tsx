/* eslint-disable react-hooks/exhaustive-deps */
import { type FC } from "react";
import { FileInput, Label } from "flowbite-react";
import { HiOutlineUpload, HiOutlineXCircle } from "react-icons/hi";

import type { MovieOtherDataProps } from "@/core/models";
import { useImagePreview } from "@/helpers/hook";

const VideoCompoment: FC<MovieOtherDataProps> = ({ formik }) => {
  const { imagePreview, handleImageChange } = useImagePreview({
    defaultPreview: {
      path: formik.values.video || "",
      file: null,
    },
  });

  const handleChangeAndSetFormik = (
    event: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    handleImageChange(event);
    const file = event?.currentTarget.files?.[0] || null;
    formik.setFieldValue("video", file || "");
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="img_course">Video :</Label>
      </div>
      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="dropzone-video"
          className="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5 text-2xl">
            <HiOutlineUpload />
          </div>
          <FileInput
            onChange={(event) => handleChangeAndSetFormik(event)}
            id="dropzone-video"
            className="hidden"
            accept=".mp4"
          />
        </Label>
      </div>

      {imagePreview.path && (
        <div className="flex items-center justify-center my-5 relative">
          <button
            type="button"
            onClick={() => handleChangeAndSetFormik(null)}
            className="absolute top-0 right-0 p-5 cursor-pointer"
          >
            <HiOutlineXCircle className="text-2xl" />
          </button>
          <video
            src={Object(imagePreview)?.path}
            // alt=""
            controls
            className="h-auto max-w-50 rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default VideoCompoment;
