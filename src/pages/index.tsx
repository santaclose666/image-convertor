import Head from "next/head";
import { sendMultiFormImg, serverWakeup } from "@/api";
import DropImgs from "@/components/DropImg";
import ImageInfo from "@/components/ListImgInfo";
import ImageOption from "@/components/ResizeOptions";
import UploadImg from "@/components/UploadImg";
import { ImagesUpload } from "@/models/Image.model";
import { convertNumber } from "@/util/dataMsUnit";
import { floorNumber } from "@/util/number";
import { jsonConvert } from "@/util/string";
import { createUrl, revokeUrl } from "@/util/url";
import { useLayoutEffect, useState } from "react";

const Home = () => {
  const [format, setFormat] = useState<string>("Original");
  const [images, setImages] = useState<ImagesUpload[]>([]);

  useLayoutEffect(() => {
    serverWakeup();
  }, []);

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

        reject("err");
      };
    });
  };

  const handleFileChange = async (
    files: File[],
    isAddMore: boolean = false
  ) => {
    const imagesRaw: (ImagesUpload | null)[] = await Promise.all(
      files.map(async (file) => {
        try {
          const res = await getImgInfo(file);

          return res;
        } catch (error) {
          console.log(error);

          return null;
        }
      })
    );

    const imgFilter = imagesRaw.filter((item) => item !== null);

    const newImgs: ImagesUpload[] = isAddMore
      ? [...images, ...imgFilter]
      : imgFilter;

    setImages(newImgs);
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
  };

  const handleSubmitImgs = async () => {
    try {
      const formData = new FormData();

      formData.append("typeConvert", format);

      images.forEach((image) => {
        formData.append(
          "formatSize",
          jsonConvert({ w: image.wResize, h: image.hResize })
        );
        formData.append("files", image.file!);
      });

      await sendMultiFormImg(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Image Uploader - Upload and Resize Images</title>
        <meta
          name="description"
          content="Upload, resize, and convert your images easily with our web app."
        />
        <meta
          name="keywords"
          content="image upload, image resize, image conversion, image processing"
        />
        <meta name="robots" content="index, follow" />

        <link rel="icon" href="/favicon.ico" />

        <meta
          property="og:title"
          content="Image Uploader - Upload and Resize Images"
        />
        <meta
          property="og:description"
          content="Easily upload, resize, and convert your images with our web app."
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://photosresize.id.vn" />
        <meta property="og:type" content="website" />

        <meta
          name="google-adsense-account"
          content="ca-pub-5966175110520007"
        ></meta>
      </Head>

      <div
        className="px-28 py-16 overflow-hidden flex w-screen h-screen items-center justify-center bg-gradient-to-b from-blue-100 bg-indigo-300 via-sky-200
         gap-3 max-[1200px]:flex-col
    "
      >
        <div className="w-3/4 h-full overflow-hidden max-[1200px]:w-[75%] max-[1200px]:min-w-[500px]">
          <UploadImg
            isReselect={images.length > 0}
            onSelectedChange={handleFileChange}
          />

          {images.length > 0 ? (
            <ImageInfo
              images={images}
              onAddMoreImg={handleFileChange}
              onRemoveImg={handleRemoveImg}
            />
          ) : (
            <DropImgs onDropImgs={handleFileChange} />
          )}
        </div>

        <ImageOption
          format={format}
          display={images.length > 0}
          onFormatChange={setFormat}
          onSizeChange={handleResizeImg}
          onSubmitImgs={handleSubmitImgs}
          onRatioChange={handleRatioChange}
        />
      </div>
    </>
  );
};

export default Home;
