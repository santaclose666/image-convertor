import { ImagesUpload } from "@/pages";
import { ArrowRight, CircleX } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ImageCardProps extends ImagesUpload {
  percentage: number;
  onRemoveImg: (url: string) => void;
}

function ImageCard(props: ImageCardProps) {
  const { percentage, name, url, size, onRemoveImg } = props;

  const [width, setWidth] = useState(size.w);
  const [height, setHeight] = useState(size.h);

  useEffect(() => {
    setWidth(size.w * percentage);
    setHeight(size.h * percentage);
  }, [percentage]);

  return (
    <div className="relative text-center group justify-center max-w-60 p-4 bg-white rounded-3xl shadow-2xl hover:cursor-pointer">
      <img
        src={url}
        alt={`${name}$}`}
        className="w-60 h-60 object-scale-down bg-black rounded-xl"
      />

      <p className="my-2 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold text-sky-400 hover:text-sky-600">
        {name}
      </p>

      <div className="flex text-center items-center justify-center">
        <span className="text-sm bg-slate-200 p-1 rounded-md font-medium">
          {size.w} - {size.h}
        </span>
        <span className="mx-1">
          <ArrowRight size={20} />
        </span>
        <div className="flex items-center justify-between text-sm bg-indigo-200 p-1 rounded-md">
          <input
            value={width}
            className="w-[auto] max-w-8 border-none focus:outline-none focus:ring-0 bg-transparent font-medium"
          />
          <span className="mx-1">-</span>
          <input
            value={height}
            className="w-[auto] max-w-8 border-none focus:outline-none focus:ring-0 bg-transparent font-medium"
          />
        </div>
      </div>

      <div
        onClick={() => onRemoveImg(url)}
        className="absolute top-[-10px] right-[-10px] bg-white rounded-full opacity-0 transition-opacity group-hover:opacity-100"
      >
        <CircleX size={30} color="#eb4899" />
      </div>
    </div>
  );
}

export default ImageCard;
