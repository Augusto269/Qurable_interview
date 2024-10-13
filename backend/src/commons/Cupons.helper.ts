export const generateCoupon = (length: number = 6): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let coupon = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    coupon += characters[randomIndex];
  }

  return coupon;
};
