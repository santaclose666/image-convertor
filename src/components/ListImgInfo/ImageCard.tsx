import { ImagesUpload } from "@/models/Image.model";
import { ArrowRight, CircleX } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ImageCardProps extends ImagesUpload {
  onRemoveImg: (url: string) => void;
}

function ImageCard(props: ImageCardProps) {
  const { name, url, w, h, wResize, hResize, size, unit, onRemoveImg } = props;

  return (
    <div className="relative text-center group justify-center max-w-64 min-w-52 p-4 bg-white rounded-3xl shadow-xl hover:cursor-pointer border border-neutral-200 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:border-2 hover:border-blue-400">
      <Image
        src={url}
        alt={`${name}${url}`}
        width="0"
        height="0"
        className="w-52 h-52 bg-black rounded-xl object-cover"
      />

      <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold text-sky-400">
        {name}
      </p>

      <p className="my-1 font-semibold text-zinc-500">
        {size} {unit}
      </p>

      <div className="flex text-center items-center justify-center">
        <span className="text-sm text-gray-950 bg-slate-200 p-1 rounded-md font-medium">
          {w} - {h}
        </span>
        <span className="mx-1">
          <ArrowRight size={20} color="#000000" />
        </span>
        <span className="text-sm text-gray-950 bg-indigo-200 p-1 rounded-md font-medium">
          {wResize} - {hResize}
        </span>
        {/* <div className="flex items-center justify-between text-sm bg-indigo-200 p-1 rounded-md">
          <input
            value={width}
            className="w-[auto] text-gray-950 max-w-8 border-none focus:outline-none focus:ring-0 bg-transparent font-medium"
          />
          <span className="mx-1 text-gray-950">-</span>
          <input
            value={height}
            className="w-[auto] text-gray-950 max-w-8 border-none focus:outline-none focus:ring-0 bg-transparent font-medium"
          />
        </div> */}
      </div>

      <div
        onClick={() => onRemoveImg(url)}
        className="absolute top-[-10px] right-[-10px] bg-white rounded-full opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
      >
        <CircleX size={30} color="#eb4899" />
      </div>
    </div>
  );
}

export default ImageCard;
