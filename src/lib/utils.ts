export const getNbZero = (nb) => {
  let count = 0;
  for (let i = 0; i < nb + ''.length; i++) {
    if (nb[i] == 0) count += 1; break;
  }
  return count;
};
