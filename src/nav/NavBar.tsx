import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          <NavLink to="/">coINventory</NavLink>
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
