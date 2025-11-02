import { useCallback, useEffect, useMemo, useState } from "react";

const horseYears = new Set([
  1918, 1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038, 2050
]);

const isHorseSeason = (date) => {
  const { year, month } = { year: date.getFullYear(), month: date.getMonth() };
  const currentHorse = horseYears.has(year);
  const leadUp = horseYears.has(year + 1) && month >= 9; // Oct-Dec before the year
  const celebrationWindow = currentHorse && month <= 2; // Jan-Mar of the year
  return currentHorse || leadUp || celebrationWindow;
};

const getThemeByHour = (date) => {
  if (isHorseSeason(date)) return "horse";
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "night";
};

const THEMES = ["morning", "afternoon", "night", "horse"];

export const useThemeCycle = ({ auto = true } = {}) => {
  const [theme, setThemeState] = useState(() => getThemeByHour(new Date()));
  const [autoCycle, setAutoCycle] = useState(auto);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!autoCycle) return undefined;

    const update = () => {
      setThemeState(getThemeByHour(new Date()));
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
