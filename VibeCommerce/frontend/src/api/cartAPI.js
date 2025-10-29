export const fetchCart = async (userId) => {
  const res = await fetch(`/api/cart?userId=${userId}`);
  return await res.json();
};
