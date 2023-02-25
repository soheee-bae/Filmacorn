import { useState, useEffect } from "react";

const getDeviceConfig = (width: number) => {
  if (width < 576) {
    return "sm";
  } else if (width >= 576 && width < 768) {
    return "md";
  } else if (width >= 768 && width < 992) {
    return "lg";
  } else if (width >= 992 && width < 1050) {
    return "xl";
  } else if (width >= 1050 && width < 1200) {
    return "xxl";
  } else if (width >= 1200) {
    return "xxxl";
  }
};

const useBreakpoint = () => {
  const defaultBrkPnt = typeof window !== "undefined" ? window?.innerWidth : 0;
  const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(defaultBrkPnt));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const calcInnerWidth = () => {
        setBrkPnt(getDeviceConfig(window?.innerWidth));
      };

      window?.addEventListener("resize", calcInnerWidth);
      return () => window?.removeEventListener("resize", calcInnerWidth);
    }
  }, []);

  return brkPnt;
};
export default useBreakpoint;
