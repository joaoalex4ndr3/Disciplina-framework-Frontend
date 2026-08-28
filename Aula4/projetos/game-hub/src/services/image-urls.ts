import imagePlaceholder from "../assets/no-image-placeholder.webp";

export const getCroppedImageURL = (url: string | null): string => {
  if (!url) return imagePlaceholder;
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};
