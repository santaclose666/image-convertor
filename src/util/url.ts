const createUrl = (file: Blob | MediaSource) => {
  const img = URL.createObjectURL(file);

  return img;
};

const revokeUrl = (url: string) => {
  URL.revokeObjectURL(url);
};

export { createUrl, revokeUrl };
