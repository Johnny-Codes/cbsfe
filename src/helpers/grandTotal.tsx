interface Item {
  quantity: number;
  sale_price: number;
}

const grandTotal = (data: Item[]): string => {
  let total = 0;
  data.map((item: Item) => {
    total += item.quantity * item.sale_price;
  });
  return total.toFixed(2);
};

export default grandTotal;