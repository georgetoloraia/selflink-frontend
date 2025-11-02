import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import GradientText from "../components/GradientText.jsx";
import { useHomeHighlightsQuery } from "../api/home.js";

const fallbackHero = {
  badge: "Year of the Horse Prelude",
  title: "Attune to the signal of your higher self.",
  description:
    "As the Year of the Horse approaches, SelfLink braids in vibrant rose auroras to spark courageous motion. Every interaction invites you deeper into presence, trust, and luminous creativity.",
  primaryCta: { label: "Begin the Journey", path: "/register" },
  secondaryCta: { label: "Converse with Mentor", path: "/mentor" }
};

const fallbackFeatures = [
  {
    id: "soulmatch",
    title: "SoulMatch Resonance",
    subtitle: "Find aligned peers on energetic wavelength",
    description:
      "Decode your resonance signature and connect to seekers exploring the same dimension of growth.",
    cta: { label: "Explore matches", path: "/soul-match" }
  },
  {
    id: "mentor",
    title: "AI Mentor Guidance",
    subtitle: "Conversational clarity in real-time",
    description:
      "Your mentor listens between the lines, reflects your truth, and surfaces next-step practices.",
    cta: { label: "Meet the mentor", path: "/mentor" }
  },
  {
    id: "growth",
    title: "Growth Pathway",
    subtitle: "Micro rituals, macro transformation",
    description:
      "Curate gentle daily practices tuned to your emotional spectrum with adaptive pacing.",
    cta: { label: "Design your path", path: "/growth-path" }
  }
];

const fallbackCelebration = {
  title: "Year of the Horse Illumination",
  copy:
    "February’s portal ushers in spirited momentum. Join the collective circle to weave reddish-pink resonance into your practice and receive custom mentor prompts for the new zodiac cycle.",
  tags: ["Opening circle · Feb 9", "Global livestream"],
  cta: "Reserve my spot"
};

const Home = () => {
  const { data, isLoading, isError } = useHomeHighlightsQuery();
  const hero = data?.hero ?? fallbackHero;
  const features = data?.features ?? fallbackFeatures;
  const celebration = data?.celebration ?? fallbackCelebration;

  return (
    <div className="page-container">
      <section className="home-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="home-hero__content"
        >
          {hero.badge && <span className="pill pill--horse">{hero.badge}</span>}
          <GradientText as="h1">{hero.title}</GradientText>
          <p>{hero.description}</p>
          <div className="home-hero__actions">
            {hero?.primaryCta && (
              <Button as={Link} to={hero.primaryCta.path} size="lg">
                {hero.primaryCta.label}
              </Button>
            )}
            {hero?.secondaryCta && (
              <Button as={Link} to={hero.secondaryCta.path} variant="ghost" size="lg">
                {hero.secondaryCta.label}
              </Button>
            )}
          </div>
        </motion.div>
        <motion.div
          className="home-hero__orb"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.25 }}
        >
          <div className="home-hero__orb-inner" />
        </motion.div>
      </section>

      <section className="content-grid" aria-label="Primary features">
        {isLoading && <div className="page-loading">Loading highlights…</div>}
        {isError && !isLoading && <div className="page-error">We could not fetch highlights right now.</div>}
        {!isLoading &&
          !isError &&
          features.map((feature, index) => (
            <motion.div
              key={feature.id ?? feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * index, duration: 0.6 }}
            >
              <Card
                title={feature.title}
                subtitle={feature.subtitle}
                footer={
                  feature?.cta?.path ? (
                    <Button as={Link} to={feature.cta.path} variant="ghost" size="sm">
                      {feature.cta.label}
                    </Button>
                  ) : null
                }
              >
                <p>{feature.description}</p>
              </Card>
            </motion.div>
          ))}
      </section>

      <section className="home-ritual glass-surface">
        <GradientText as="h2">Breathing Mode</GradientText>
        <p>
          Drop into Breathing Mode to let the interface inhale and exhale with you. Soft pulsations
          anchor your nervous system while you explore rituals, conversations, and shared insights.
        </p>
      </section>

      <motion.section
        className="horse-celebration glass-surface"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <GradientText as="h2" gradient="var(--gradient-horse)">
          {celebration.title}
        </GradientText>
        <p>{celebration.copy}</p>
        {celebration?.tags?.length > 0 && (
          <div className="horse-celebration__meta">
            {celebration.tags.map((tag) => (
              <span key={tag} className="pill pill--horse">
                {tag}
              </span>
            ))}
          </div>
        )}
        {celebration?.cta && <Button size="lg">{celebration.cta}</Button>}
      </motion.section>
    </div>
  );
};

export default Home;
