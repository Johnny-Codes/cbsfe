import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./nav/NavBar";
import HomePage from "./homepage/HomePage";
import AddInventoryForm from "./inventory/AddInventoryForm";
import InventoryPage from "./inventory/InventoryPage";
import EditInventoryPage from "./inventory/EditInventoryPage";

import Test from "./Test";

function Router() {
  return (
    <BrowserRouter>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins">
          <Route index element={<Test />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="add" element={<AddInventoryForm />} />
          <Route path="edit/:sku" element={<EditInventoryPage />} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
