import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import MasterLayout from "../layouts/MasterLayout"; 
import TopicPage from "../compoments/TopicPage"; 

const PublicRouter = () => {
  return (
    <>
      <ToastContainer
        className="mt-19"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route element={<MasterLayout />}>
            <Route path="/chu-de" element={<TopicPage />} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PublicRouter;
