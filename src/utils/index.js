export const currencyFormatter = (n, pre = "₦") =>
  (pre || "") + n?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
