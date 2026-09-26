import { Routes, Route } from "react-router";
import RootLayout from "./layouts/RootLayout";
import BoardPage from "./pages/BoardPage";
import AddCandidatePage from "./pages/AddCandidatePage";
import CandidateDetailPage from "./pages/CandidateDetailPage";
import RejectedPage from "./pages/RejectedPage";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<BoardPage />} />
        <Route path="/candidates/new" element={<AddCandidatePage />} />
        <Route path="/candidates/:id" element={<CandidateDetailPage />} />
        <Route path="/rejected" element={<RejectedPage />} />
      </Route>
    </Routes>
  );
}

export default App;
