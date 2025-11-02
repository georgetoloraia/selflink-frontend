import { useCallback, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiClient from "./client.js";

const randomId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
};

const initialMentorMessage = {
  id: randomId(),
  role: "mentor",
  content:
    "Welcome. Breathe in for four, hold for two, exhale softly. What is stirring in your field today?",
  timestamp: new Date().toISOString()
};

export const useMentorChat = () => {
  const [messages, setMessages] = useState([initialMentorMessage]);
  const [isStreaming, setIsStreaming] = useState(false);
  const conversationId = useRef(randomId());

  const mutation = useMutation({
    mutationFn: async ({ message, history }) => {
      const { data } = await apiClient.post("/api/v1/mentor/chat", {
        message,
        history,
        conversationId: conversationId.current
      });
      return data;
    }
  });

  const sendMessage = useCallback(
    (content) => {
      const userMessage = {
        id: randomId(),
        role: "user",
        content,
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsStreaming(true);

      mutation.mutate(
        { message: content, history: [...messages, userMessage] },
        {
          onSuccess: (response) => {
            const reply = response?.reply ??
              "I wasn’t able to reach the mentor stream, but I sense your heart is seeking steadiness. Place a hand on your chest and breathe with me.";
            setMessages((prev) => [
              ...prev,
              {
                id: randomId(),
                role: "mentor",
                content: reply,
                timestamp: new Date().toISOString()
              }
            ]);
            setIsStreaming(false);
          },
          onError: () => {
            setMessages((prev) => [
              ...prev,
              {
                id: randomId(),
                role: "mentor",
                content:
                  "The signal had a ripple. Let’s pause together—inhale for four, exhale for six—and try again when you feel ready.",
                timestamp: new Date().toISOString()
              }
            ]);
            setIsStreaming(false);
          }
        }
      );
    },
    [mutation, messages]
  );

  const resetConversation = useCallback(() => {
    conversationId.current = randomId();
    setMessages([initialMentorMessage]);
  }, []);

  return useMemo(
    () => ({
      messages,
      sendMessage,
      isStreaming,
      resetConversation
    }),
    [messages, sendMessage, isStreaming, resetConversation]
  );
};
