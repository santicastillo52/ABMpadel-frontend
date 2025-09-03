import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from './components/Header/Header'
import { Dashboard } from "./layouts/Dashboard";
import { CourtGestor } from "./features/Courts/Court-gestor/CourtGestor";
import { Names } from "./components/Names/Names";

export const App: React.FC = () => {
  return (
    <div>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/court-gestor" element={<CourtGestor/>}></Route>
          <Route path="/names" element={<Names/>}></Route>

        </Routes>
      </main>
    </div>
  );
};

export default App;
