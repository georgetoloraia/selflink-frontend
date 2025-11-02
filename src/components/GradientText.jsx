import PropTypes from "prop-types";

const GradientText = ({ children, as: Component = "span", gradient, className = "", ...rest }) => {
  const style = gradient ? { backgroundImage: gradient } : undefined;
  return (
    <Component className={`gradient-text ${className}`.trim()} style={style} {...rest}>
      {children}
    </Component>
  );
};

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  gradient: PropTypes.string,
  className: PropTypes.string
};

export default GradientText;
