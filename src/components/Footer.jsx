import GradientText from "./GradientText.jsx";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div>
          <GradientText as="p" className="app-footer__tagline">
            Stay connected to the pulse of SelfLink.
          </GradientText>
          <p className="app-footer__meta">© {new Date().getFullYear()} SelfLink. Crafted for mindful connection.</p>
        </div>
        <div className="app-footer__links">
          <a href="mailto:contact@selflink.com">Email</a>
          <a href="https://www.selflink.com" target="_blank" rel="noreferrer">
            Website
          </a>
          <a href="/privacy">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
