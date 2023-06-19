import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
