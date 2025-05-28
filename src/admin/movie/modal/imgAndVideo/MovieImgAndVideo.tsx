/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormikProps } from "formik";

import type { FC } from "react";
import ImageCompoment from "./Image";
import ThumbCompoment from "./Thumb";
import VideoCompoment from "./Video";

type MovieOtherDataProps = {
  formik: FormikProps<any>;
};

const MovieImgAndVideo: FC<MovieOtherDataProps> = ({ formik }) => {
  return (
    <div className="grid grid-cols-3 gap-4 my-3">
      <>
        <ImageCompoment formik={formik} />
      </>
      <>
        <ThumbCompoment formik={formik} />
      </>
      <>
        <VideoCompoment formik={formik} />
      </>
    </div>
  );
};

export default MovieImgAndVideo;
