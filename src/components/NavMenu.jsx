import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavMenu = ({ links, orientation = "horizontal", onNavigate }) => {
  return (
    <nav aria-label="Primary">
      <ul className={`nav-menu nav-menu--${orientation}`}>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `nav-menu__link ${isActive ? "nav-menu__link--active" : ""}`
              }
              onClick={onNavigate}
            >
              <span>{link.label}</span>
              {link.tag && <span className="pill">{link.tag}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

NavMenu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      tag: PropTypes.string
    })
  ).isRequired,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  onNavigate: PropTypes.func
};

NavMenu.defaultProps = {
  orientation: "horizontal",
  onNavigate: () => {}
};

export default NavMenu;
