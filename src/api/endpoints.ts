export const multiFileData = {
  endpoint: `${process.env.NEXT_PUBLIC_SERVER_URL}/processPhotos`,
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
