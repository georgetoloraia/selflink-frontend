import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MatrixBackground from "../components/MatrixBackground.jsx";
import SmokeOverlay from "../components/SmokeOverlay.jsx";
import { NAV_LINKS } from "../config/navigation.js";
import { useThemeCycle } from "../hooks/useThemeCycle.js";
import { useBreathingMode } from "../hooks/useBreathingMode.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

const AppLayout = () => {
  const location = useLocation();
  const { theme, cycleTheme } = useThemeCycle();
  const { breathing, toggleBreathing } = useBreathingMode();
  const { reducedMotion, setReducedMotion } = usePrefersReducedMotion();
  const themeLabel = theme.charAt(0).toUpperCase() + theme.slice(1);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <MatrixBackground reducedMotion={reducedMotion} />
      <SmokeOverlay reducedMotion={reducedMotion} />
      <Header
        navLinks={NAV_LINKS}
        themeName={themeLabel}
        onCycleTheme={cycleTheme}
        breathing={breathing}
        onToggleBreathing={toggleBreathing}
        reducedMotion={reducedMotion}
        onToggleMotion={() => setReducedMotion(!reducedMotion)}
      />
      <main className="app-main" role="main" id="main-content" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
