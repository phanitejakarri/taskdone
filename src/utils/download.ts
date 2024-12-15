export const downloadImage = (dataUrl: string | null, filename: string) => {
  if (!dataUrl) return;

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};