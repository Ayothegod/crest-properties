export const generateOTP = (size: number) => {
  let characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (let i = 0; i < size; i++) {
    let value = Math.round(Math.random() * characters.length)
    result += characters.charAt(value)
  }

  return result
};

