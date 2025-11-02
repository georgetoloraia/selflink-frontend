import PropTypes from "prop-types";
import GradientText from "./GradientText.jsx";

const Card = ({
  title,
  subtitle,
  icon,
  children,
  footer,
  className = "",
  actions
}) => {
  return (
    <article className={`card glass-border ${className}`.trim()}>
      {(title || subtitle || icon) && (
        <header className="card__header">
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            {icon && (
              <span
                className="pill"
                aria-hidden="true"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "2.5rem" }}
              >
                {icon}
              </span>
            )}
            <div>
              {title && <GradientText as="h3" className="card__title">{title}</GradientText>}
              {subtitle && <p className="card__meta">{subtitle}</p>}
            </div>
          </div>
          {actions && <div>{actions}</div>}
        </header>
      )}
      <div>{children}</div>
      {footer && <footer style={{ marginTop: "1.5rem" }}>{footer}</footer>}
    </article>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  className: PropTypes.string,
  actions: PropTypes.node
};

export default Card;
