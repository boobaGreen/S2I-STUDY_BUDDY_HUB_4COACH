//AppLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MainPageLayout from "../elements/MainPageLayout";

function AppLayout() {
  return (
    <MainPageLayout>
      <Navbar />
      <Outlet />
      <Footer />
    </MainPageLayout>
  );
}

export default AppLayout;
