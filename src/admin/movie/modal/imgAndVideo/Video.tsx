/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, type FC } from "react";
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

  useEffect(() => {
    if (imagePreview.file) {
      formik.setFieldValue("video", imagePreview.file);
    }
  }, [imagePreview]);

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
            onChange={(event) => handleImageChange(event)}
            id="dropzone-video"
            className="hidden"
            accept=".mp4"
          />
        </Label>
      </div>

      {Object(imagePreview)?.path !== "" && (
        <div className="flex items-center justify-center my-5 relative">
          <button
            type="button"
            onClick={() => handleImageChange(null)}
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
