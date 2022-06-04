export default function mappingToArray(data) {
  const mapped = data.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return mapped
}
