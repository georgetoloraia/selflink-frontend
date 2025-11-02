import { useEffect, useMemo, useState } from "react";
import GradientText from "../components/GradientText.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import { useCoursesQuery } from "../api/courses.js";

const fallbackCourses = [
  {
    id: "aurora-breath",
    title: "Aurora Breath Ritual",
    format: "Audio · 12 min",
    theme: "Balance",
    description:
      "A guided breath sequence with gentle aurora soundscapes that reset your nervous system and open creativity.",
    action: { label: "Play audio" }
  },
  {
    id: "heart-field",
    title: "Heart Field Alignment",
    format: "Video · 18 min",
    theme: "Love",
    description:
      "Somatic movement and visualization to recharge the chest cavity and strengthen loving boundaries.",
    action: { label: "Watch video" }
  },
  {
    id: "quiet-power",
    title: "Quiet Power Qigong",
    format: "Audio · 22 min",
    theme: "Confidence",
    description:
      "Slow qigong-inspired motions synced with a binaural beat designed to root self-trust.",
    action: { label: "Play audio" }
  },
  {
    id: "cosmic-clarity",
    title: "Cosmic Clarity Journaling",
    format: "PDF + Prompts",
    theme: "Awareness",
    description:
      "Printable prompt set that guides you through lucid journaling and constellation mapping.",
    action: { label: "Download" }
  }
];

const Courses = () => {
  const [filter, setFilter] = useState("All");
  const { data, isLoading, isError } = useCoursesQuery();
  const courses = data?.courses ?? fallbackCourses;

  const themes = useMemo(() => {
    const unique = new Set(courses.map((course) => course.theme).filter(Boolean));
    if (unique.size === 0) return ["All"];
    return ["All", ...Array.from(unique).sort()];
  }, [courses]);

  useEffect(() => {
    if (!themes.includes(filter)) {
      setFilter("All");
    }
  }, [themes, filter]);

  const filtered = useMemo(() => {
    if (filter === "All") return courses;
    return courses.filter((course) => course.theme === filter);
  }, [filter, courses]);

  return (
    <div className="page-container">
      <GradientText as="h1">Courses & Practices Library</GradientText>
      <p>
        Drop into a curated library of audio journeys, movement rituals, and reflective prompts. Each practice
        is tuned to SelfLink’s calming cadence and integrates with your Growth Path insights.
      </p>

      <div className="courses-filters">
        {themes.map((theme) => (
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
        {isLoading && <div className="page-loading">Fetching practices…</div>}
        {isError && !isLoading && <div className="page-error">Could not load practices.</div>}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="page-empty">No practices found for this theme yet.</div>
        )}
        {!isLoading &&
          !isError &&
          filtered.map((course) => (
            <Card
              key={course.id ?? course.title}
              title={course.title}
              subtitle={[course.format, course.theme].filter(Boolean).join(" · ")}
              footer={
                course?.action?.label ? (
                  <Button variant="ghost" as={course.action?.href ? "a" : "button"} href={course.action?.href}>
                    {course.action.label}
                  </Button>
                ) : null
              }
            >
              <p>{course.description}</p>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Courses;
