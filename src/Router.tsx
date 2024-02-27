import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./nav/NavBar";
import AddInventoryForm from "./inventory/add_inventory/AddInventoryForm";

import Test from "./Test";

function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/coins">
          <Route index element={<Test />} />
          <Route path="add" element={<AddInventoryForm />} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
