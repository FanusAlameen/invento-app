import { Outlet, Link } from "react-router-dom";
import invento from "../../../public/images/invento-logo.png";
import { MdOutlineLogout } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../slices/api/userSlice";
import { logout } from "../../slices/auth/authSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const { username = "", email = "" } = users || {};

  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }

    return str.substring(0, maxLength) + "...";
  };

  const truncatedEmail = truncateString(email, 14);
  const truncatedUser = truncateString(username, 14);

  return (
    <div className="min-h-screen flex">
      <div className="drawer lg:drawer-open w-1/4">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-300 p-5 w-80 min-h-full flex flex-col gap-5 text-base-content font-semibold text-md font-mont">
            <div className="w-full mb-6 flex items-center justify-center">
              <img className="w-[90px] h-[120px]" src={invento} alt="logo" />
            </div>

            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/product">Products</Link>
            </li>
            <li>
              <Link to="/suppliers">Suppliers</Link>
            </li>
            <li>
              <Link to="/clients">Clients</Link>
            </li>
            <li>
              <Link to="/purchase">Purchases</Link>
            </li>
            <li>
              <Link to="/sale">Sales</Link>
            </li>

            <div className="w-full p-5 bg-neutral rounded-lg flex items-center gap-4 mt-auto">
              <h1 className="font-mont text-lg text-base-content bg-base-200 px-4 py-2 rounded-md">
                {username[0] && username[0].toUpperCase()}
              </h1>

              <div className="flex flex-col gap-1">
                <p className="font-mont text-md">{truncatedUser}</p>
                <p>{truncatedEmail}</p>
              </div>

              <button
                className="p-2 bg-base-200 rounded-full flex justify-center"
                onClick={handleLogout}
              >
                <MdOutlineLogout className="text-xl" />
              </button>
            </div>
          </ul>
        </div>
      </div>

      <div className="w-full p-5 ">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
