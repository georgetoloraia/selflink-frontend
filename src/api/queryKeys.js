export const queryKeys = {
  me: () => ["me"],
  soulMatches: (params = {}) => ["soul-matches", params],
  courses: (filter = {}) => ["courses", filter],
  growthPath: () => ["growth-path"],
  homeHighlights: () => ["home-highlights"],
  mentorHistory: (conversationId) => ["mentor-history", conversationId]
};
