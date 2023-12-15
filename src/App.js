import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ContextProvider from "./context/MarvelContext";
import CharacterDetail from "./pages/CharacterDetail";

function App() {
  return (
    <div>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<CharacterDetail />} />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
