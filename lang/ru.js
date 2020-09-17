/**
 * 
 * Можно хранить так в файле или подгружать с файла, но определнные языки (добавлять нельзя)
 * Или юзать vue-i18n и там в конфиге загружать асинх
 */
export default {
  search: "ПОИСК",
  daySclon: ['день', 'дня', 'дней'],
  itemSclon: ['товар', 'товара', 'товаров'],
  filters: {
    price: "Цена",
    manufacturer: "Производитель",
    labels: "Флаги"
  },
  delivery: ['все', '24 ч', 'до 14 дней', 'до 30 дней'],
  delivery24: '24 ч',

  resetFilters: 'Сбросить фильтры',
  categories: "Категории",
  filtersName: "Фильтры",
  sort: "Сортировка",
  inspirations: "Вдохновения",
  buyLook: "Купить образ",
  from: "От",
  to: "До",
  back: "Назад",
  toCart: "В корзину",
  itemsInCart: "Товары в вашей корзине",
  itemAddedToCart: "Товар добавлен в корзину",
  priceForOne: "Цена за шт",
  deliveryText: "Доставка",
  totalSum: "Общая сумма",
  taxCart: "В том числе налог 27% ндс",
  freeDelivery: "Бесплатная доставка",
  promotionText: "Акция продлится до {{date}} или пока есть запасы!",
  inspirationsSimilar: 'Предварительный просмотр выбранных коллекций',
  productSimilarInspirations: 'Вдохновения',
  productLooks: 'Образы продукта: '
}
