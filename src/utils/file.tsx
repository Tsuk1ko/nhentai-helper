const readFile = (file: File): Promise<ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };
    reader.onabort = reject;
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

const pickFile = (accept: string): Promise<File | undefined> =>
  new Promise(resolve => {
    const input = (
      <input
        type="file"
        accept={accept}
        onChange={() => {
          resolve(input.files?.[0]);
        }}
      />
    ) as HTMLInputElement;
    input.click();
  });

export const pickAndReadFile = async (accept: string): Promise<ArrayBuffer | undefined> => {
  const file = await pickFile(accept);
  if (file) return readFile(file);
};
