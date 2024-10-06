import React from "react";
import ImageCard from "./ImageCard";
import { ImagesUpload } from "@/models/Image.model";

interface ImageInfoProps {
  images: ImagesUpload[];
  ratio: number;
  onRemoveImg: (url: string) => void;
}

function ImageInfo(props: ImageInfoProps) {
  const { ratio, images, onRemoveImg } = props;

  if (images.length === 0) return;

  return (
    <div className="h-3/4 flex justify-center bg-white border-2 border-sky-300 rounded-3xl">
      <div className="flex items-center justify-center gap-5 flex-wrap p-5 overflow-hidden overflow-y-auto scrollbar-custom">
        {images.map(
          ({ url, name, w, h, size, unit }: ImagesUpload, index: number) => (
            <ImageCard
              key={`${index}${index}`}
              ratio={ratio}
              url={url}
              name={name}
              w={w}
              h={h}
              size={size}
              unit={unit}
              onRemoveImg={onRemoveImg}
            />
          )
        )}
      </div>
    </div>
  );
}

export default ImageInfo;
