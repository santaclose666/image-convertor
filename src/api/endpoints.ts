import { EndpointType } from "@/models/Endpoint.model";

const multiFileData: EndpointType = {
  endpoint: `${process.env.NEXT_PUBLIC_SERVER_URL}/processPhotos`,
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const wakeupSever: EndpointType = {
  endpoint: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  method: "GET",
};

export { multiFileData, wakeupSever };
