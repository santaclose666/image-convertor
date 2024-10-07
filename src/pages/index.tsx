import ImageInfo from "@/components/ListImgInfo";
import ImageOption from "@/components/ResizeOptions";
import UploadImg from "@/components/UploadImg";
import { ImagesUpload } from "@/models/Image.model";
import { convertNumber } from "@/util/dataMsUnit";
import { floorNumber } from "@/util/number";
import { createUrl, revokeUrl } from "@/util/url";
import { ChangeEvent, useState } from "react";

const Home = () => {
  const [ratio, setRatio] = useState<number>(1);
  const [format, setFormat] = useState<string>("Original");
  const [images, setImages] = useState<ImagesUpload[]>([]);
  const [isLockRatio, setIsLockRatio] = useState<boolean>(true);

  const getImgInfo = async (file: File): Promise<ImagesUpload> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const imgUrl = createUrl(file);
      const { size, unit } = convertNumber(file.size);

      img.src = imgUrl;

      img.onload = () => {
        const imgInfo: ImagesUpload = {
          url: imgUrl,
          name: file.name,
          w: img.width,
          h: img.height,
          wResize: img.width,
          hResize: img.height,
          size,
          unit,
          type: file.type,
          file,
        };

        resolve(imgInfo);
      };

      img.onerror = () => {
        revokeUrl(img.src);
        reject(new Error(`Error loading image: ${file.name}`));
      };
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    const images: ImagesUpload[] = await Promise.all(
      files.map((file) => getImgInfo(file))
    );

    setImages(images);
  };

  const handleRemoveImg = (url: string) => {
    revokeUrl(url);
    const newImgs = images.filter((item) => item.url !== url);
    setImages(newImgs);
  };

  const handleRatioChange = (num: number) => {
    const newRatio = num / 100;

    const newImgs = images.map((item: ImagesUpload) => ({
      ...item,
      wResize: floorNumber(item.w * newRatio),
      hResize: floorNumber(item.h * newRatio),
    }));

    setImages(newImgs);
    setRatio(newRatio);
  };

  const handleResizeImg = (size: string, isWidthChange: boolean) => {
    const newSize = Number(size);
    const newImages = images.map((item: ImagesUpload) => {
      if (isWidthChange) {
        const newHeight = floorNumber((newSize / item.w) * item.h);

        return {
          ...item,
          wResize: newSize === 0 ? item.w : newSize,
          hResize: newSize === 0 ? item.h : newHeight,
        };
      } else {
        const newWidth = floorNumber((newSize / item.h) * item.w);

        return {
          ...item,
          wResize: newSize === 0 ? item.w : newWidth,
          hResize: newSize === 0 ? item.h : newSize,
        };
      }
    });

    setImages(newImages);

    if (ratio != 1) {
      setRatio(1);
    }
  };

  const handleLockRatio = () => {
    setIsLockRatio(!isLockRatio);
  };

  const handleSubmitImgs = async () => {
    console.log(images);
    console.log(format);

    // const formData = new FormData();

    // files.forEach((file) => {
    //   formData.append("images", file);
    // });
  };

  return (
    <div className="p-5 overflow-hidden flex w-screen h-screen items-center justify-center bg-gradient-to-b from-blue-100 via-sky-200 to-sky-400">
      <div className="w-3/4 h-full overflow-hidden">
        <UploadImg
          isReselect={images.length > 0}
          onSelectedChange={handleFileChange}
        />
        <ImageInfo images={images} onRemoveImg={handleRemoveImg} />
      </div>

      <ImageOption
        format={format}
        ratio={ratio * 100}
        lockRatio={isLockRatio}
        display={images.length > 0}
        onFormatChange={setFormat}
        onLockRatio={handleLockRatio}
        onSizeChange={handleResizeImg}
        onSubmitImgs={handleSubmitImgs}
        onRatioChange={handleRatioChange}
      />
    </div>
  );
};

export default Home;
