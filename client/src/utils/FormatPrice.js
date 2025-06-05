const formatToRupiah = (price) => {
  if (typeof price !== "number") return "Rp0,00";
  return "Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00";
};

export default formatToRupiah;
