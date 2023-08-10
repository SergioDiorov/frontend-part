export const getFormattedDate = (initialDate: string) => {
  const birthDate = new Date(initialDate);
  const day = birthDate.getDate().toString().padStart(2, '0');
  const month = (birthDate.getMonth() + 1).toString().padStart(2, '0');
  const year = birthDate.getFullYear();
  return `${day}.${month}.${year}`;
};
