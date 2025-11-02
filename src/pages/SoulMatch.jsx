import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import GradientText from "../components/GradientText.jsx";
import Modal from "../components/Modal.jsx";

const suggestedMatches = [
  {
    id: "elysian-waves",
    name: "Elysian Waves",
    archetype: "Empathic Innovator",
    resonance: 94,
    focus: ["breathwork", "relational attunement"],
    description:
      "Seeks collaborative meditations exploring collective nervous system regulation and storytelling."
  },
  {
    id: "luminous-echo",
    name: "Luminous Echo",
    archetype: "Visionary Weaver",
    resonance: 91,
    focus: ["creative ritual", "dream journaling"],
    description:
      "Exploring lucid dreaming as a bridge to community healing, maps liminal experiences through art."
  },
  {
    id: "ember-sage",
    name: "Ember Sage",
    archetype: "Grounded Catalyst",
    resonance: 89,
    focus: ["somatic micro-dosing", "earth ceremonies"],
    description:
      "Facilitates gentle rewilding practices and seeks partners for dawn reflection circles."
  }
];

const SoulMatch = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="page-container">
      <GradientText as="h1">SoulMatch Resonance Matrix</GradientText>
      <p>
        SelfLink reads your energy signature and offers resonance partners attuned to your current
        frontier. Connect softly, exchange breathing rituals, and co-elevate your journeys.
      </p>

      <div className="content-grid">
        {suggestedMatches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 * index, duration: 0.6 }}
          >
            <Card
              title={`${match.resonance}% resonance`}
              subtitle={`${match.name} · ${match.archetype}`}
              actions={
                <span className="pill" aria-label={`Focus areas ${match.focus.join(", ")}`}>
                  {match.focus.join(" • ")}
                </span>
              }
              footer={
                <Button variant="ghost" size="sm" onClick={() => setSelected(match)}>
                  View profile
                </Button>
              }
            >
              <p>{match.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <section className="soulmatch-callout glass-surface">
        <GradientText as="h2">Create a resonance circle</GradientText>
        <p>
          Invite up to five seekers into a micro-circle. We will synchronize calendar windows,
          suggest opening rituals, and surface shared intentions in real time.
        </p>
        <Button size="lg">Open circle</Button>
      </section>

      <AnimatePresence>
        {selected && (
          <Modal
            open
            onClose={() => setSelected(null)}
            title={`${selected.name} · ${selected.archetype}`}
            footer={
              <>
                <Button variant="ghost" onClick={() => setSelected(null)}>
                  Close
                </Button>
                <Button>Send resonance request</Button>
              </>
            }
          >
            <p>
              Resonance {selected.resonance}% · Practices: {selected.focus.join(", ")}
            </p>
            <p>
              {selected.description} Share a note describing what draws you together and suggest a
              breathing cadence for your first exchange.
            </p>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SoulMatch;
