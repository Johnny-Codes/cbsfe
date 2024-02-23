import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef();

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setIsOpen(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between bg-slate-500 p-6">
      <div className="flex items-center text-white font-semibold text-xl tracking-tight space-x-4 relative" ref={node}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>coINventory</NavLink>
          <div className="dropdown">
            <p onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              Inventory
            </p>
            {isOpen && (
              <div className="flex flex-col w-full dropdown-content absolute bg-slate-500 rounded-lg p-2">
                <NavLink to="/coins/add" onClick={() => setIsOpen(false)}>Add Coin</NavLink>
              </div>
            )}
          </div>
      </div>
    </nav>
  );
};

export default NavBar;