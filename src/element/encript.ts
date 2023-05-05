export const encrypt = (str: string) => {
  return btoa(str);
};

export const decrypt = (str: string) => {
  return atob(str);
};