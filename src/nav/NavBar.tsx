import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between flex-wrap bg-slate-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          <NavLink to="/">coINventory</NavLink>
          <div className="dropdown">
            <button onClick={() => setIsOpen(!isOpen)}>
              Inventory
            </button>
            {isOpen && (
              <div className="dropdown-content">
                <NavLink to="/coins/add">Add Coin</NavLink>
              </div>
            )}
          </div>
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
