import React from "react";
import ImageCard from "./ImageCard";
import { ImagesUpload } from "@/models/Image.model";

interface ImageInfoProps {
  images: ImagesUpload[];
  onRemoveImg: (url: string) => void;
}

function ImageInfo(props: ImageInfoProps) {
  const { images, onRemoveImg } = props;

  if (images.length === 0) return;

  return (
    <div
      className={`h-4/5 flex justify-center bg-white border-2 border-sky-300 rounded-3xl`}
    >
      <div className="flex items-center justify-center gap-5 flex-wrap p-5 overflow-hidden overflow-y-auto scrollbar-custom">
        {images.map((item: ImagesUpload, index: number) => (
          <ImageCard
            {...item}
            key={`${index}${index}`}
            onRemoveImg={onRemoveImg}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageInfo;
