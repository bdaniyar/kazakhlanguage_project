import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import TestPage from "./pages/TestPage.jsx";
import AdvicePage from "./pages/AdvicePage.jsx";
import DiaryPage from "./pages/DiaryPage.jsx";
import HelpPage from "./pages/HelpPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="test" element={<TestPage />} />
        <Route path="advice" element={<AdvicePage />} />
        <Route path="diary" element={<DiaryPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
    </Routes>
  );
}
