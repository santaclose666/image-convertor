import { ImagesUpload } from "@/pages";
import React from "react";
import ImageCard from "./ImageCard";

interface ImageInfoProps {
  images: ImagesUpload[];
  percentage: number;
  onRemoveImg: (url: string) => void;
}

function ImageInfo(props: ImageInfoProps) {
  const { percentage, images, onRemoveImg } = props;

  console.log(images);

  if (images.length === 0) return;

  return (
    <div className="flex justify-center">
      <div className="flex gap-5">
        {images.map(({ url, name, size }: ImagesUpload, index: number) => (
          <ImageCard
            key={`${index}${index}`}
            percentage={percentage}
            url={url}
            name={name}
            size={size}
            onRemoveImg={onRemoveImg}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageInfo;
