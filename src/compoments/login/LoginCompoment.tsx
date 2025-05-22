import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import {
  HiMail,
  HiOutlineLogin,
  HiLockClosed,
  HiOutlineUser,
} from "react-icons/hi";

import { useAuth } from "@/core/Auth";

const LoginCompoment = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { saveAuth } = useAuth();
  const loginValue = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email(`Email không đúng định dạng !`)
      .min(3, `Tối thiểu là 3 ký tự !`)
      .max(50, `Tối đa là 50 ký tự !`)
      .required(`Email phải được nhập !`),
    password: Yup.string()
      .min(3, `Tối thiểu là 3 ký tự !`)
      .max(50, `Tối đa là 50 ký tự !`)
      .required(`Mật khẩu phải được nhập`),
    //   .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ in hoa")
    //   .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất một số")
    //   .matches(
    //     /[@$!%*?&]/,
    //     "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@$!%*?&)"
    //   ),
  });

  const formik = useFormik({
    initialValues: loginValue,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      try {
        const dataLogin = {
          email: values.email,
          password: values.password,
        };
        console.log("dataLogin : ", dataLogin);
        // return;

        setIsLoading(true);
        axios.post("auth/login/", dataLogin).then((response) => {
          if (response.status === 200) {
            const data = response.data.data;
            saveAuth(data);
            window.location.reload();
            toast.success("Đăng nhập thành công !");
            setIsLoading(false);
            setOpenModal(false);
            resetForm();
          } else {
            setIsLoading(false);
            setStatus("Mời bạn kiểm tra lại Email hoặc Password");
            toast.error("Đăng nhập thất bại !");
          }
        });
      } catch (error) {
        console.log("Đăng nhập lỗi : ", error);
        toast.error("Đăng nhập thất bại !");
      }
    },
  });

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        pill
        color="light"
        className="ring-0 hover:ring-0 focus:ring-0 cursor-pointer"
      >
        <HiOutlineUser />
        Thành viên
      </Button>
      <Modal
        show={openModal}
        size="lg"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Đăng nhập hệ thống
            </h3>
            <form
              className="space-y-4"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email">Email :</Label>
                </div>
                <TextInput
                  icon={HiMail}
                  id="email"
                  placeholder="email@gmail.com"
                  autoComplete="current-username"
                  {...formik.getFieldProps("email")}
                  className={clsx(
                    {
                      "dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 rounded-lg bg-gray-500 border border-red-500 text-red-500":
                        formik.touched.email && formik.errors.email,
                    },
                    {
                      "dark:bg-gray-700 dark:border-green-500 dark:placeholder-gray-400 rounded-lg bg-gray-50 border border-green-300 text-green-500":
                        formik.touched.email && !formik.errors.email,
                    }
                  )}
                />
                {formik.touched.email && formik.errors.email && (
                  <span role="alert" className="text-red-500 text-sm mt-5">
                    {String(formik.errors.email)}
                  </span>
                )}
              </div>

              <div className="mt-3">
                <div className="mb-2 block">
                  <Label htmlFor="password">Mật khẩu :</Label>
                </div>
                <TextInput
                  icon={HiLockClosed}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...formik.getFieldProps("password")}
                  className={clsx(
                    {
                      "dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 rounded-lg bg-gray-500 border border-red-500 text-red-500":
                        formik.touched.password && formik.errors.password,
                    },
                    {
                      "dark:bg-gray-700 dark:border-green-500 dark:placeholder-gray-400 rounded-lg bg-gray-50 border border-green-300 text-green-500":
                        formik.touched.password && !formik.errors.password,
                    }
                  )}
                  placeholder="**********"
                />
                {formik.touched.password && formik.errors.password && (
                  <span role="alert" className="text-red-500 text-sm mt-3">
                    {String(formik.errors.password)}
                  </span>
                )}
              </div>
              <div className="w-full flex items-center justify-center my-5">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="ring-0 hover:ring-0 focus:ring-0"
                >
                  {isLoading ? (
                    <>
                      <Spinner aria-label="Spinner button example" size="sm" />
                      <span className="pl-3">Vui lòng chờ ...</span>
                    </>
                  ) : (
                    <div className="flex items-center justify-center">
                      <HiOutlineLogin className="me-2" />
                      <span>Đăng nhập</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoginCompoment;
