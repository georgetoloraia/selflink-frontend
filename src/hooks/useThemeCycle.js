import { useCallback, useEffect, useMemo, useState } from "react";

const getThemeByHour = (hour) => {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "night";
};

const THEMES = ["morning", "afternoon", "night"];

export const useThemeCycle = ({ auto = true } = {}) => {
  const [theme, setThemeState] = useState(() =>
    getThemeByHour(new Date().getHours())
  );
  const [autoCycle, setAutoCycle] = useState(auto);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!autoCycle) return undefined;

    const update = () => {
      setThemeState(getThemeByHour(new Date().getHours()));
    };

    update();
    const interval = window.setInterval(update, 1000 * 60 * 15);
    return () => window.clearInterval(interval);
  }, [autoCycle]);

  const setTheme = useCallback((next) => {
    setThemeState(next);
    setAutoCycle(false);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const index = THEMES.indexOf(current);
      const nextIndex = (index + 1) % THEMES.length;
      return THEMES[nextIndex];
    });
    setAutoCycle(false);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      cycleTheme,
      autoCycle,
      enableAutoCycle: () => setAutoCycle(true),
      disableAutoCycle: () => setAutoCycle(false)
    }),
    [theme, setTheme, cycleTheme, autoCycle]
  );

  return value;
};
