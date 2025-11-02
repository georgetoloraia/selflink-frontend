import { useMemo, useState } from "react";
import GradientText from "../components/GradientText.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

const courses = [
  {
    id: "aurora-breath",
    title: "Aurora Breath Ritual",
    format: "Audio · 12 min",
    theme: "Balance",
    description:
      "A guided breath sequence with gentle aurora soundscapes that reset your nervous system and open creativity.",
    action: "Play audio"
  },
  {
    id: "heart-field",
    title: "Heart Field Alignment",
    format: "Video · 18 min",
    theme: "Love",
    description:
      "Somatic movement and visualization to recharge the chest cavity and strengthen loving boundaries.",
    action: "Watch video"
  },
  {
    id: "quiet-power",
    title: "Quiet Power Qigong",
    format: "Audio · 22 min",
    theme: "Confidence",
    description:
      "Slow qigong-inspired motions synced with a binaural beat designed to root self-trust.",
    action: "Play audio"
  },
  {
    id: "cosmic-clarity",
    title: "Cosmic Clarity Journaling",
    format: "PDF + Prompts",
    theme: "Awareness",
    description:
      "Printable prompt set that guides you through lucid journaling and constellation mapping.",
    action: "Download"
  }
];

const THEMES = ["All", "Love", "Balance", "Confidence", "Awareness"];

const Courses = () => {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return courses;
    return courses.filter((course) => course.theme === filter);
  }, [filter]);

  return (
    <div className="page-container">
      <GradientText as="h1">Courses & Practices Library</GradientText>
      <p>
        Drop into a curated library of audio journeys, movement rituals, and reflective prompts. Each practice
        is tuned to SelfLink’s calming cadence and integrates with your Growth Path insights.
      </p>

      <div className="courses-filters">
        {THEMES.map((theme) => (
          <Button
            key={theme}
            variant={filter === theme ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter(theme)}
            aria-pressed={filter === theme}
          >
            {theme}
          </Button>
        ))}
      </div>

      <div className="courses-grid">
        {filtered.map((course) => (
          <Card
            key={course.id}
            title={course.title}
            subtitle={`${course.format} · ${course.theme}`}
            footer={<Button variant="ghost">{course.action}</Button>}
          >
            <p>{course.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
