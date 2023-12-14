import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CardDetail from "./pages/CardDetail";
import ContextProvider from "./context/MarvelContext";

function App() {
  return (
    <div>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<CardDetail />} />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
