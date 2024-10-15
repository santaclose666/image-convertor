import React, { ChangeEvent } from "react";
import ImageCard from "./ImageCard";
import { ImagesUpload } from "@/models/Image.model";
import { ImagePlus } from "lucide-react";

interface ImageInfoProps {
  images: ImagesUpload[];
  onAddMoreImg: (files: File[], isAddMore: boolean) => void;
  onRemoveImg: (url: string) => void;
}

function ImageInfo(props: ImageInfoProps) {
  const { images, onAddMoreImg, onRemoveImg } = props;

  if (images.length === 0) return;

  return (
    <div
      className={`relative h-4/5 flex justify-center bg-white border-2 border-sky-300 rounded-3xl w-full`}
    >
      <div
        className="flex items-center justify-center gap-5 flex-wrap p-5 overflow-hidden overflow-y-auto scrollbar-custom
        max-[666px]:gap-2"
      >
        {images.map((item: ImagesUpload, index: number) => (
          <ImageCard
            {...item}
            key={`${index}${index}`}
            onRemoveImg={onRemoveImg}
          />
        ))}
      </div>

      <label className="absolute right-6 bottom-5 bg-sky-400 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer">
        <input
          key={`${images.length}`}
          type="file"
          accept="image/*"
          multiple
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log("add img");

            const files = e.target.files ? Array.from(e.target.files) : [];
            onAddMoreImg(files, true);
          }}
          className="hidden"
        />
        <ImagePlus size={30} />
      </label>
    </div>
  );
}

export default ImageInfo;
