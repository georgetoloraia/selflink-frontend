import PropTypes from "prop-types";

const SmokeOverlay = ({ reducedMotion = false }) => {
  return (
    <div className={`smoke-layer${reducedMotion ? " smoke-layer--static" : ""}`.trim()} aria-hidden="true">
      <div className="smoke-layer__cloud smoke-layer__cloud--one" />
      <div className="smoke-layer__cloud smoke-layer__cloud--two" />
      <div className="smoke-layer__cloud smoke-layer__cloud--three" />
    </div>
  );
};

SmokeOverlay.propTypes = {
  reducedMotion: PropTypes.bool
};

export default SmokeOverlay;
