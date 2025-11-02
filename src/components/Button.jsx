import { forwardRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const variants = {
  primary: "btn",
  ghost: "btn btn--ghost"
};

const sizes = {
  sm: "btn--sm",
  md: "",
  lg: "btn--lg"
};

const Button = forwardRef(
  (
    {
      as = "button",
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      icon,
      className = "",
      onClick,
      type,
      ...rest
    },
    ref
  ) => {
    const baseClass = variants[variant] ?? variants.primary;
    const sizeClass = sizes[size] ?? sizes.md;
    const Component = as;
    const MotionComponent = motion(Component);
    const isButton = Component === "button";
    const isDisabled = loading || disabled;

    const motionInteraction = isDisabled
      ? {}
      : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } };

    const componentProps = {
      className: `${baseClass} ${sizeClass} ${className}`.trim(),
      ref,
      ...motionInteraction,
      ...rest
    };

    if (isButton) {
      componentProps.disabled = isDisabled;
      componentProps.type = type ?? "button";
      componentProps.onClick = onClick;
    } else {
      if (isDisabled) {
        componentProps.onClick = (event) => event.preventDefault();
        componentProps.tabIndex = -1;
        componentProps["aria-disabled"] = true;
      } else if (onClick) {
        componentProps.onClick = onClick;
      }
    }

    return (
      <MotionComponent {...componentProps}>
        {loading && <span className="btn__spinner" aria-hidden="true" />}
        {icon && <span className="btn__icon">{icon}</span>}
        <span>{children}</span>
      </MotionComponent>
    );
  }
);

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  variant: PropTypes.oneOf(["primary", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default Button;
