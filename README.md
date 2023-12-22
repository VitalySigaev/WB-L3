#WB-L3

## 1. Избранные товары

Добавьте на сайт функцию добавления товаров в избранное и страницу с избранными товарами. 
<br />
В первой итерации задачи избранные товары сохраняются только локально для пользователя.
<br />
Кнопка добавления в избранное уже свёрстана и закомментирована в вёрстке карточки товара.
<br />
Ссылку на страницу избранного добавьте по аналогии с ссылкой на корзину в шапку сайта
.<br />
Ссылка должна появляться только при наличии избранных товаров. Список товаров на странице по аналогии с хитами продаж на главной.
<br />

2. Аналитика событий
Добавьте на сайт отправку статистики по событиям — действиям пользователя.
<br />
События отправляются по адресу /api/sendEvent. Формат — джейсон вида:
<br />
```json
{ 
	type: типСобытия, 
	payload: параметрыСобытия, 
	timestamp: таймстамп
}
```
<br />
Типы событий:
<br />
Переход по страницам
<br />
```json
type: route
payload: { url: урлСтраницы }
```
<br />
Просмотр товара в списке товаров (попадание карточек во вьюпорт)
<br />
```json
type: viewCard
payload: всеСвойстваТовара + secretKey товара
```
<br />
Если в свойствах товара есть не пустое поле log, то тип должен быть viewCardPromo.
<br />

Добавление товара в корзину
<br />
```json
type: addToCard
payload: всеСвойстваТовара
```

Оформление заказа
<br />
```json
type: purchase, 
payload: { 
	orderId: айдиНовогоЗаказа, 
	totalPrice: 11200, 
	productIds: айдиТоваровМассивом 
}
```


