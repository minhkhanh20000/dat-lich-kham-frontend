export const setUserData = (data) => {
  return localStorage.setItem('user-data', JSON.stringify(data));
};
export const removeUser = (data) => {
  return localStorage.removeItem('user-data');
};
