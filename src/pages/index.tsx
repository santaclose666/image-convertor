import ImageInfo from "@/components/ListImgInfo";
import ImageOption from "@/components/ResizeOptions";
import UploadImg from "@/components/UploadImg";
import { ImagesUpload } from "@/models/Image.model";
import { convertNumber } from "@/util/dataMsUnit";
import { createUrl, revokeUrl } from "@/util/url";
import { ChangeEvent, useState } from "react";

const Home = () => {
  const [ratio, setRatio] = useState<number>(1);
  const [isLockRatio, setIsLockRatio] = useState<boolean>(true);
  const [images, setImages] = useState<ImagesUpload[]>([]);

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
          size,
          unit,
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

    // const formData = new FormData();

    // files.forEach((file) => {
    //   formData.append("images", file);
    // });
  };

  const handleRemoveImg = (url: string) => {
    revokeUrl(url);
    const newImgs = images.filter((item) => item.url !== url);
    setImages(newImgs);
  };

  const handleRatioChange = (num: number) => {
    setRatio(num / 100);
  };

  const handleResizeImg = (size: string, isWidthChange: boolean) => {
    console.log(size, isWidthChange);
  };

  const handleLockRatio = () => {
    setIsLockRatio(!isLockRatio);
  };

  return (
    <div className="p-5 overflow-hidden flex w-screen h-screen items-center justify-center bg-gradient-to-b from-blue-100 via-sky-200 to-sky-400">
      <div className="w-3/4 h-full overflow-hidden">
        <UploadImg
          isReselect={images.length > 0}
          onSelectedChange={handleFileChange}
        />
        <ImageInfo
          images={images}
          ratio={ratio}
          onRemoveImg={handleRemoveImg}
        />
      </div>

      <ImageOption
        ratio={ratio * 100}
        lockRatio={isLockRatio}
        display={images.length > 0}
        onRatioChange={handleRatioChange}
        onSizeChange={handleResizeImg}
        onLockRatio={handleLockRatio}
      />
    </div>
  );
};

export default Home;
