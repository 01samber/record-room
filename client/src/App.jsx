import { Route, Routes } from "react-router-dom";
import { StudioProvider } from "./studio.js";
import { Shell } from "./Shell.jsx";
import { Home } from "./pages/Home.jsx";
import { Lesson } from "./pages/Lesson.jsx";
import { Progress } from "./pages/Progress.jsx";
import { Sources } from "./pages/Sources.jsx";
import { Glossary } from "./pages/Glossary.jsx";
import { Week } from "./pages/Week.jsx";

export function App() {
  return (
    <StudioProvider>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Home />} />
          <Route path="week/:week" element={<Week />} />
          <Route path="lesson/:id" element={<Lesson />} />
          <Route path="progress" element={<Progress />} />
          <Route path="sources" element={<Sources />} />
          <Route path="glossary" element={<Glossary />} />
        </Route>
      </Routes>
    </StudioProvider>
  );
}
