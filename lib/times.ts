export const times = Array.from({ length: 96 }, (_, i) => {
  const hours = String(Math.floor(i / 4)).padStart(2, "0");
  const minutes = String((i % 4) * 15).padStart(2, "0");
  return {
    id: i,
    time: `${hours}:${minutes}` as string,
  };
});
