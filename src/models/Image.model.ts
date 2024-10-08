export type imgFormat =
  | "Original"
  | "JPG"
  | "PNG"
  | "WEBP"
  | "AVIF"
  | "GIF"
  | "PDF";

export interface ImagesUpload {
  url: string;
  name: string;
  w: number;
  h: number;
  wResize: number;
  hResize: number;
  size: number;
  unit: string;
  type?: string;
  file?: File;
}
