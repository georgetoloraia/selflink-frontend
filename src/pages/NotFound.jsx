import { Link } from "react-router-dom";
import GradientText from "../components/GradientText.jsx";
import Button from "../components/Button.jsx";

const NotFound = () => {
  return (
    <div className="page-container" style={{ textAlign: "center" }}>
      <GradientText as="h1">Lost in the void</GradientText>
      <p>The page you seek dissolved into stardust. Let’s guide you back to the sanctuary.</p>
      <Button as={Link} to="/">
        Return home
      </Button>
    </div>
  );
};

export default NotFound;
