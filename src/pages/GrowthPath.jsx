import GradientText from "../components/GradientText.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

const milestones = [
  {
    id: "ground",
    title: "Grounding Portal",
    subtitle: "Week 1 · Nervous system attunement",
    practices: ["3 minute body scans", "Evening gratitude whisper", "Weekly mentor sync"],
    focus:
      "Stabilize your baseline energy and map emotional peaks. Light journaling prompts every night." 
  },
  {
    id: "vision",
    title: "Vision Weaving",
    subtitle: "Weeks 2-3 · Creative expansion",
    practices: ["Dawn dream capture", "Midday breath pulses", "Creative audio drops"],
    focus:
      "Surface latent desires and translate them into micro actions. Mentor suggests audio activations tuned to your timeline."
  },
  {
    id: "integration",
    title: "Integration",
    subtitle: "Weeks 4-6 · Embodied expression",
    practices: ["Somatic micro-celebrations", "Community resonance circles", "Weekly reflections"],
    focus:
      "Weave insights into your daily rhythm and craft a repeatable ritual set that keeps momentum steady."
  }
];

const GrowthPath = () => {
  return (
    <div className="page-container">
      <GradientText as="h1">Curate your Growth Pathway</GradientText>
      <p>
        Your Growth Path adapts with every reflection, breath pattern, and mentor prompt you share. Each
        stage pairs somatic practices with mindful conversations to keep the journey grounded and alive.
      </p>

      <div className="growth-timeline">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="growth-timeline__item">
            <div className="growth-timeline__marker">
              <span>{index + 1}</span>
            </div>
            <Card title={milestone.title} subtitle={milestone.subtitle}>
              <p>{milestone.focus}</p>
              <ul className="growth-timeline__list">
                {milestone.practices.map((practice) => (
                  <li key={practice}>{practice}</li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>

      <section className="growth-cta glass-surface">
        <GradientText as="h2">Sync with Mentor for calibration</GradientText>
        <p>
          Schedule a 15 minute attunement with your mentor. We will reweave practices around your nervous
          system and commitments, then refresh your Growth Path in real time.
        </p>
        <Button size="lg">Book calibration</Button>
      </section>
    </div>
  );
};

export default GrowthPath;
