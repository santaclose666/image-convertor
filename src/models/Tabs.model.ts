import { ReactNode } from "react";

export interface Tab {
  id: number;
  label: string | number;
  icon?: ReactNode;
  content: ReactNode;
}
