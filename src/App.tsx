import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from './components/Header/Header'
import { Dashboard } from "./layouts/Dashboard";
import { CourtGestor } from "./features/Courts/Court-gestor/CourtGestor";
import { Names } from "./components/Names/Names";
import { CourtDetail } from "./features/Courts/Court-detail/CourtDetail";
import { CourtEdit } from "./features/Courts/Court-edit/CourtEdit";

export const App: React.FC = () => {
  return (
    <div>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/court-gestor" element={<CourtGestor/>}></Route>
          <Route path="/court/:id" element={<CourtDetail/>}></Route>
          <Route path="/court/:id/edit" element={<CourtEdit/>}></Route>
          
          <Route path="/names" element={<Names/>}></Route>
          
        </Routes>
      </main>
    </div>
  );
};

export default App;
