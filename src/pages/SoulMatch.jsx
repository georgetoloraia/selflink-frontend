import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import GradientText from "../components/GradientText.jsx";
import Modal from "../components/Modal.jsx";
import { useSoulMatchesQuery } from "../api/soulMatch.js";

const SoulMatch = () => {
  const { data, isLoading, isError } = useSoulMatchesQuery();
  const matches = data?.matches ?? [];
  const [selected, setSelected] = useState(null);
  const hasMatches = matches.length > 0;

  return (
    <div className="page-container">
      <GradientText as="h1">SoulMatch Resonance Matrix</GradientText>
      <p>
        SelfLink reads your energy signature and offers resonance partners attuned to your current
        frontier. Connect softly, exchange breathing rituals, and co-elevate your journeys.
      </p>

      <div className="content-grid">
        {isLoading && <div className="page-loading">Scanning resonance field…</div>}
        {isError && !isLoading && <div className="page-error">Unable to load matches. Try again shortly.</div>}
        {!isLoading && !isError && !hasMatches && (
          <div className="page-empty">No resonance partners found yet. Refresh or expand your intentions.</div>
        )}
        {!isLoading &&
          !isError &&
          hasMatches &&
          matches.map((match, index) => (
            <motion.div
              key={match.id ?? `${match.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 * index, duration: 0.6 }}
            >
              <Card
                title={match.resonance ? `${match.resonance}% resonance` : match.name}
                subtitle={match.archetype ? `${match.name} · ${match.archetype}` : match.name}
                actions={
                  match?.focus?.length ? (
                    <span className="pill" aria-label={`Focus areas ${match.focus.join(", ")}`}>
                      {match.focus.join(" • ")}
                    </span>
                  ) : null
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
            title={selected.archetype ? `${selected.name} · ${selected.archetype}` : selected.name}
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
              Resonance {selected.resonance ?? "—"}% · Practices: {selected.focus?.join(", ") ?? "shared intuitions"}
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
