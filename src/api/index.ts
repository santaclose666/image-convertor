import axios, { AxiosRequestConfig } from "axios";
import { saveAs } from "file-saver";
import { multiFileData, wakeupSever } from "./endpoints";

const sendMultiFormImg = async (data: FormData) => {
  const { endpoint, method, headers } = multiFileData;

  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method: method,
      headers: headers!,
      responseType: "blob",
      data,
    };

    const res = await axios(config);

    const fileName = "Images.zip";
    const blobFile = new Blob([res.data]);

    saveAs(blobFile, fileName);
  } catch (error) {
    console.log(error);
  }
};

const serverWakeup = async () => {
  const { endpoint, method } = wakeupSever;
  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method,
    };

    const res = await axios(config);

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export { sendMultiFormImg, serverWakeup };
