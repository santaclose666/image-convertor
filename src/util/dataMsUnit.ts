import { fixedNumber } from "./number";

interface convertNumberProps {
  size: number;
  unit: string;
}

export const convertNumber = (num: number): convertNumberProps => {
  const KB = 1024;
  const MB = KB * 1024;

  if (num >= MB) {
    return {
      size: fixedNumber(num / MB),
      unit: "MB",
    };
  } else if (num >= KB) {
    return {
      size: fixedNumber(num / KB),
      unit: "KB",
    };
  }

  return { size: num, unit: "Bytes" };
};
