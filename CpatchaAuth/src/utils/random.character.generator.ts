export const generateRandomText = (length: number): string => {
  let result: string = "";
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const characterStringLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characterStringLength),
    );
  }

  return result;
};
console.log(generateRandomText(6));
