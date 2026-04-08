import { Link, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import GroupPoses from "./pages/GroupPoses.jsx";
import LetterGambling from "./pages/LetterGambling.jsx";
import StickerRecreation from "./pages/StickerRecreation.jsx";
import Saamethalu from "./pages/Saamethalu.jsx";
import Matchmaker from "./pages/Matchmaker.jsx";
import NoAudio from "./pages/NoAudio.jsx";
import HookStep from "./pages/HookStep.jsx";

function App() {
  return (
    <div className="shell">
      <header className="shell-header">
        <Link to="/" className="brand">
          <span className="brand-mark" />
          <span className="brand-text">Game Night</span>
        </Link>

        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/games/group-poses" className="nav-link">
            Group Poses
          </NavLink>
          <NavLink to="/games/letter-gambling" className="nav-link">
            Letter Gambling
          </NavLink>
          <NavLink to="/games/sticker-recreation" className="nav-link">
            Sticker Recreation
          </NavLink>
          <NavLink to="/games/saamethalu" className="nav-link">
            Saamethalu
          </NavLink>
          <NavLink to="/games/no-audio" className="nav-link">
            No Audio
          </NavLink>
          <NavLink to="/games/hook-step" className="nav-link">
            Hook Step
          </NavLink>
          <NavLink to="/games/matchmaker" className="nav-link">
            Matchmaker
          </NavLink>
        </nav>
      </header>

      <main className="shell-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/group-poses" element={<GroupPoses />} />
          <Route path="/games/letter-gambling" element={<LetterGambling />} />
          <Route
            path="/games/sticker-recreation"
            element={<StickerRecreation />}
          />
          <Route path="/games/saamethalu" element={<Saamethalu />} />
          <Route path="/games/no-audio" element={<NoAudio />} />
          <Route path="/games/hook-step" element={<HookStep />} />
          <Route path="/games/matchmaker" element={<Matchmaker />} />
          <Route
            path="*"
            element={
              <div className="page">
                <h1>Page not found</h1>
                <p className="subtitle">
                  The game you&apos;re looking for doesn&apos;t exist yet. Go
                  back to the lobby to pick another one.
                </p>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="shell-footer">
        <span>Party Games Hub · Dark theme</span>
      </footer>
    </div>
  );
}

export default App;
