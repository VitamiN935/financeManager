export default function filterCurrency(value, cur) {
  return new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: cur
  }).format(value)
}