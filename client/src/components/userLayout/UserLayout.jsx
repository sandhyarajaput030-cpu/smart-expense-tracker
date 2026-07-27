import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";

export default function UserLayout() {
  return (
  <div>
    <UserNavbar />

    <div style={{ padding: "20px", minHeight: "80vh" }}>
      <Outlet />
    </div>

    <UserFooter />
  </div>
);
}