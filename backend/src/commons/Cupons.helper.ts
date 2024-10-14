export const generateCoupon = (length: number = 6): string => {
  // Generate a random coupon for propuse testing only we gonna generate a random string with the length of 6
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let coupon = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    coupon += characters[randomIndex];
  }

  return coupon;
};
