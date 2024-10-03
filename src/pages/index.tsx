import ImageInfo from "@/components/ImageInfo";
import ImageOption from "@/components/ImageOption";
import UploadImg from "@/components/UploadImg";
import { createUrl, revokeUrl } from "@/util/url";
import { ChangeEvent, useState } from "react";

export interface ImagesUpload {
  url: string;
  name: string;
  size: { w: number; h: number };
}

const Home = () => {
  const [images, setImages] = useState<ImagesUpload[]>([]);
  // const [percentage, setPercentage] = useState(100);

  const getImgInfo = async (file: File): Promise<ImagesUpload> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const imgUrl = createUrl(file);

      img.src = imgUrl;

      img.onload = () => {
        const imgInfo: ImagesUpload = {
          url: imgUrl,
          name: file.name,
          size: { w: img.width, h: img.height },
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
    console.log("trigger");

    const files = e.target.files ? Array.from(e.target.files) : [];

    console.log(files);

    const images: ImagesUpload[] = await Promise.all(
      files.map((file) => getImgInfo(file))
    );

    console.log(images);

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

  return (
    <div className="p-5 overflow-hidden flex w-screen h-screen items-center justify-center bg-gradient-to-b from-blue-100 via-sky-200 to-sky-400">
      <div className="w-3/4 h-full flex-shrink-0">
        <UploadImg
          isReselect={images.length > 0}
          onSelectedChange={handleFileChange}
        />
        <ImageInfo
          images={images}
          percentage={100}
          onRemoveImg={handleRemoveImg}
        />
      </div>

      <ImageOption display={images.length > 0} />
    </div>
  );
};

export default Home;
