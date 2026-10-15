import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import WaFloat from "../components/WaFloat";

export default function PublicLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <WaFloat />
    </>
  );
}

