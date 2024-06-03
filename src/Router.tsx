import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./nav/NavBar";
import HomePage from "./homepage/HomePage";
import AddInventoryForm from "./inventory/AddInventoryForm";
import InventoryPage from "./inventory/InventoryPage";
import EditInventoryPage from "./inventory/EditInventoryPage";
import AddCustomer from "./customers/AddCustomer";
import CustomerList from "./customers/CustomerList";
import EditCustomer from "./customers/EditCustomer";
import AddSalesInvoice from "./invoices/AddSalesInvoice";
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
        <Route path="/customers">
          <Route index element={<CustomerList />} />
          <Route path="add" element={<AddCustomer />} />
          <Route path="edit/:id" element={<EditCustomer />} />
          <Route path="sales-order" element={<AddSalesInvoice />} />
        </Route>
        <Route path="/test" element={<AddSalesInvoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
