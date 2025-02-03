export const getRandomMessage = (array: string[]) => {
  if (array.length === 0) {
    return "Welcome to Aivan's Store! best qualities at their best... Ejemm... Prices...";
  }
  return array[Math.floor(Math.random() * array.length)];
};