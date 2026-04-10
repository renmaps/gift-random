const resetCode = (length: number = 17): string => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array).map((x) => charset[x % charset.length]).join("");
};

export default resetCode;
