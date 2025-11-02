import { useEffect, useRef, useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import GradientText from "../components/GradientText.jsx";
import { useMentorChat } from "../api/mentor.js";

const Mentor = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isStreaming, resetConversation } = useMentorChat();
  const listRef = useRef(null);

  useEffect(() => {
    const node = listRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setInput("");
  };

  return (
    <div className="page-container">
      <GradientText as="h1">AI Mentor Sanctuary</GradientText>
      <p>
        Whisper your reflections. The mentor listens between each breath and mirrors clarity back to
        you with gentle prompts, sensory rituals, and compassionate insights.
      </p>

      <div className="mentor-grid">
        <Card title="Conversation" subtitle="Live guidance stream" className="mentor-chat-card">
          <div className="mentor-chat" ref={listRef} role="log" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mentor-chat__bubble mentor-chat__bubble--${message.role}`}
              >
                <span className="mentor-chat__role">{message.role === "mentor" ? "Mentor" : "You"}</span>
                <p>{message.content}</p>
              </div>
            ))}
            {isStreaming && (
              <div className="mentor-chat__typing" aria-live="polite">
                Mentor is composing a reflection…
              </div>
            )}
          </div>
          <form className="form mentor-form" onSubmit={handleSubmit}>
            <textarea
              name="message"
              rows={3}
              placeholder="Share what is alive within you..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label="Message for mentor"
            />
            <div className="mentor-form__actions">
              <Button type="button" variant="ghost" size="sm" onClick={resetConversation}>
                Reset channel
              </Button>
              <Button type="submit" disabled={!input.trim()} loading={isStreaming}>
                Send reflection
              </Button>
            </div>
          </form>
        </Card>

        <Card title="Mentor energy update" subtitle="Current room atmosphere">
          <ul className="mentor-highlights">
            <li>
              <span className="pill">Tone</span>
              <p>Softly radiant, deep-listening and expansive.</p>
            </li>
            <li>
              <span className="pill">Suggested ritual</span>
              <p>Three-part breath, hold for four, release with gentle hum.</p>
            </li>
            <li>
              <span className="pill">Music</span>
              <p>432hz aurora soundscape · 7 minutes · loops with mindful fade.</p>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Mentor;
