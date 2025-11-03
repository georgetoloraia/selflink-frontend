import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu.jsx";
import Button from "./Button.jsx";
import GradientText from "./GradientText.jsx";
import logoUrl from "../assets/logo.jpeg";

const Header = ({
  navLinks,
  themeName,
  onCycleTheme,
  breathing,
  onToggleBreathing,
  reducedMotion,
  onToggleMotion
}) => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="app-header glass-surface">
      <div className="app-header__inner">
        <Link to="/" className="app-header__brand" onClick={closeMenu}>
          <img src={logoUrl} alt="SelfLink logo" className="app-header__logo" width="44" height="44" />
          <span className="app-header__brand-text">
            <GradientText as="span" className="app-header__title">
              SelfLink
            </GradientText>
            <span className="app-header__subtitle">Awaken your inner seer</span>
          </span>
        </Link>
        <div className="app-header__nav">
          <NavMenu links={navLinks} onNavigate={closeMenu} />
        </div>
        <div className="app-header__actions">
          <Button as={Link} to="/login" variant="ghost" size="sm">
            Sign in
          </Button>
          <Button variant="ghost" size="sm" onClick={onCycleTheme} aria-label="Cycle theme">
            <span aria-hidden="true">🌗</span>
            <span className="app-header__action-label">{themeName}</span>
          </Button>
          <Button
            variant={breathing ? "primary" : "ghost"}
            size="sm"
            onClick={onToggleBreathing}
            aria-pressed={breathing}
          >
            <span aria-hidden="true">💫</span>
            <span className="app-header__action-label">Breathing</span>
          </Button>
          <Button
            variant={reducedMotion ? "ghost" : "primary"}
            size="sm"
            onClick={onToggleMotion}
            aria-pressed={!reducedMotion}
          >
            <span aria-hidden="true">🌀</span>
            <span className="app-header__action-label">Motion</span>
          </Button>
        </div>
        <button
          type="button"
          className="app-header__menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span />
          <span />
          <span />
          <span className="visually-hidden">Toggle navigation</span>
        </button>
      </div>
      {open && (
        <div className="app-header__mobile" id="mobile-nav">
          <NavMenu links={navLinks} orientation="vertical" onNavigate={closeMenu} />
          <div className="app-header__mobile-actions">
            <Button as={Link} to="/login" variant="ghost" size="sm" onClick={closeMenu}>
              <span aria-hidden="true">✨</span>
              <span>Sign in</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onCycleTheme} aria-label="Cycle theme">
              <span aria-hidden="true">🌗</span>
              <span>Theme · {themeName}</span>
            </Button>
            <Button
              variant={breathing ? "primary" : "ghost"}
              size="sm"
              onClick={onToggleBreathing}
              aria-pressed={breathing}
            >
              <span aria-hidden="true">💫</span>
              <span>Breathing</span>
            </Button>
            <Button
              variant={reducedMotion ? "ghost" : "primary"}
              size="sm"
              onClick={onToggleMotion}
              aria-pressed={!reducedMotion}
            >
              <span aria-hidden="true">🌀</span>
              <span>{reducedMotion ? "Motion off" : "Motion on"}</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ).isRequired,
  themeName: PropTypes.string.isRequired,
  onCycleTheme: PropTypes.func.isRequired,
  breathing: PropTypes.bool.isRequired,
  onToggleBreathing: PropTypes.func.isRequired,
  reducedMotion: PropTypes.bool.isRequired,
  onToggleMotion: PropTypes.func.isRequired
};

export default Header;
