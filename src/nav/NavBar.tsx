import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-slate-500 p-6">
      <div className="flex items-center text-white font-semibold text-xl tracking-tight space-x-4 relative">
          <NavLink to="/" onMouseOver={() => {setIsInventoryOpen(false); setIsCustomerOpen(false);}}>coINventory</NavLink>
          <div className="inventory-dropdown" onMouseOver={() => setIsInventoryOpen(true)} onMouseLeave={() => setIsInventoryOpen(false)}>
            <p className="cursor-pointer">
              Coins
            </p>
            {isInventoryOpen && (
              <div className="flex flex-col w-full dropdown-content absolute bg-slate-500 rounded-lg p-2">
                <NavLink to="/coins/inventory" onMouseOver={() => setIsInventoryOpen(true)}>Inventory</NavLink>
                <NavLink to="/coins/add" onMouseOver={() => setIsInventoryOpen(true)}>Add Coin</NavLink>
              </div>
            )}
          </div>
          <div className="customer-dropdown" onMouseOver={() => setIsCustomerOpen(true)} onMouseLeave={() => setIsCustomerOpen(false)}>
            <p className="cursor-pointer">
              Customers
            </p>
            {isCustomerOpen && (
              <div className="flex flex-col w-full dropdown-content absolute bg-slate-500 rounded-lg p-2">
                <NavLink to="/customers" onMouseOver={() => setIsCustomerOpen(true)}>Customers</NavLink>
                <NavLink to="#" onMouseOver={() => setIsCustomerOpen(true)}>Add Coin</NavLink>
              </div>
            )}
            </div>
      </div>
    </nav>
  );
};

export default NavBar;