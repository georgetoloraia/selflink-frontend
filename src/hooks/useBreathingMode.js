import { useCallback, useEffect, useState } from "react";

const ATTRIBUTE = "data-breathing";

export const useBreathingMode = (initial = false) => {
  const [enabled, setEnabled] = useState(initial);

  useEffect(() => {
    document.documentElement.setAttribute(ATTRIBUTE, String(enabled));
    return () => {
      document.documentElement.removeAttribute(ATTRIBUTE);
    };
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((value) => !value);
  }, []);

  return { breathing: enabled, toggleBreathing: toggle, setBreathing: setEnabled };
};
