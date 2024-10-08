import axios from "axios";

export const sendMultiFormImg = async (data: FormData) => {
  try {
    const res = await axios.post("http://localhost:4000/processPhotos", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
