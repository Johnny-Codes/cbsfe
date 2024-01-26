import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./nav/NavBar";

function Router() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        {/* <Route path="/" element={<NavBar />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
