import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./nav/NavBar";
import AddInventoryForm from "./inventory/add_inventory/AddInventoryForm";

import Test from "./Test";

function Router() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        {/* <Route path="/"} /> */}
        <Route path="/test" element={<AddInventoryForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
