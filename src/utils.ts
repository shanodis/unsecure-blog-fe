export const appendUrlSearchParams = (params: object): URLSearchParams => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach((param) => {
    searchParams.append(param[0], param[1]);
  });
  return searchParams;
};
