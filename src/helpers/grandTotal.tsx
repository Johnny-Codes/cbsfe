const grandTotal = (data) => {
  let total = 0;
  data.map((item) => {
    total += item.quantity * item.sale_price;
  });
  return total.toFixed(2);
};

export default grandTotal;
