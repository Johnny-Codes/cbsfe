import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./nav/NavBar";
import AddInventory from "./inventory/add_inventory/AddInventory";

function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <AddInventory />
      <Routes>{/* <Route path="/" element={<NavBar />} /> */}</Routes>
    </BrowserRouter>
  );
}

export default Router;
