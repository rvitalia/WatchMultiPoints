//загрузка данных
function loadFromLocal() {
    //проверяем localstorage
    if (localStorage.getItem('basketItem')) {
        const watchItemsInfo = JSON.parse(localStorage.getItem('basketItem'));

        watchItemsInfo.forEach(element => {
            renderItemBasketFromLocal(element);
        });

    }
    else {
        //console.log('localstorage is empty');
        disabledSumAndBtn ();
    }
}
//рендерим данные из localstorage
function renderItemBasketFromLocal(obj) {

    const basketItems = basket.querySelector('#basket__items');
    const headerBasketIcon = document.querySelector('.basket__count__items');
    const sumResult = document.querySelector('.basket__summ__result');
    const basketPay = document.querySelector('.basket__pay');

    if (document.location.pathname === '/shop.html') {
        //создаем разметку item с возможностью изменения
        const itemHtml = `
        <div class="basket__items__item"  id="${obj.id}">
            <div class="basket__items__item__header">
                <img class="current__image"  src="${obj.src}" alt="">
            </div>
            <div class="basket__items__item__calculation">
                <span class="basket__item__minus" data-operation="minus">-</span>
                <span class="basket__item__count">${obj.count}</span>
                <span class="basket__item__plus" data-operation="plus">+</span>
            </div>
            <div class="basket__items__item__summ" data-price = "${obj.priceOne}">
                <!--<span> ₽</span>-->
            </div>
        </div>
        `;
        //добавляем в конец
        basketItems.insertAdjacentHTML('beforeend', itemHtml);

    }
    else {
            //создаем разметку item
    const itemHtml = `
    <div class="basket__items__item"  id="${obj.id}">
        <div class="basket__items__item__header">
            <img class="current__image"  src="${obj.src}" alt="">
        </div>
        <div class="basket__items__item__calculation">
            <span style="pointer-events: none; opacity: 0.3" class="basket__item__minus" data-operation="minus">-</span>
            <span class="basket__item__count">${obj.count}</span>
            <span style="pointer-events: none; opacity: 0.3" class="basket__item__plus" data-operation="plus">+</span>
        </div>
        <div class="basket__items__item__summ" data-price = "${obj.priceOne}">
            <!--<span> ₽</span>-->
        </div>
    </div>
`;
    basketItems.insertAdjacentHTML('beforeend', itemHtml);
    }

    // прописываем сумму
    sumResult.innerText = obj.sumAll + '₽';

    //прописываем количество в значке корзины
    headerBasketIcon.innerText = obj.countIcon;

    //делаем кнопку активной
    if(obj.sumAll > 0){
        basketPay.disabled = false;
    }
}

//сохранение данных
function saveToLocal() {

    const basket = document.querySelector('#basket__container');
    const basketItems = basket.querySelector('#basket__items');
    const headerBasketIcon = document.querySelector('.basket__count__items');

    if (basketItems.children.length > 0) {

        // таймаут из-за открытия сайдбара
        setTimeout(function () {

            const watchItems = Array.from(basketItems.querySelectorAll('.basket__items__item'));
            let watchsItemsInfo = [];



            watchItems.forEach((element) => {

                //создаем объект данных

                let watchItemsInfo = {
                    id: element.id,
                    src: element.querySelector('.current__image').src,
                    count: element.querySelector('.basket__item__count').innerText,
                    priceOne: element.querySelector('.basket__items__item__summ').dataset.price,
                    sumAll: parseInt(basket.querySelector('.basket__summ__result').innerText),
                    countIcon: headerBasketIcon.innerText
                }


                watchsItemsInfo.push(watchItemsInfo);
            });

            localStorage.setItem('basketItem', JSON.stringify(watchsItemsInfo));

        }, 100)
    }
    else {
        localStorage.removeItem('basketItem');
    }
}
//открытие корзины
function openBasket(){   
    const shopBasket = document.querySelector('#basket');

        
        if(!shopBasket.classList.contains('shop__basket--active') ){
            shopBasket.classList.add('shop__basket--active');
            setTimeout(function(){
                basket.style.transform = "translateX(0)";
            }, 400);
        }
}

//закрытие корзины
function closeBasket(){

    const shopBasket = document.querySelector('#basket');

    if(shopBasket.classList.contains('shop__basket--active') ){
        basket.style.transform = "translateX(100%)";

        setTimeout(function(){
            shopBasket.classList.remove('shop__basket--active');
        }, 400);
    }
}

//добавление в корзину
function addInBasket(clickEl) {
    //получаем родителя Item
    const parrentItem = clickEl.closest('.shop__wrapper__items__item');
    //ищем контэйнер куда будем скидывать все item
    const basketItems = document.querySelector('#basket__items');
    //формируем все элементы для передачи в корзину
    const watchInfo = {
        id: parrentItem.dataset.id,
        src: parrentItem.querySelector('.watch__img').src,
        count: parrentItem.querySelector('#item__count').innerText,
        price: parseInt(parrentItem.querySelector('#price__result').innerText)
    }

    openBasket();

    const watchBasketHtml = 
    `
        <div class="basket__items__item"  id="${watchInfo.id}">
            <div class="basket__items__item__header">
                <img class="current__image"  src="${watchInfo.src}" alt="">
            </div>
            <div class="basket__items__item__calculation">
                <span class="basket__item__minus" data-operation="minus">-</span>
                <span class="basket__item__count">${watchInfo.count}</span>
                <span class="basket__item__plus" data-operation="plus">+</span>
            </div>
            <div class="basket__items__item__summ" data-price = "${watchInfo.price}">
                <!--<span> ₽</span>-->
            </div>
        </div>
    `;

    //проверка н наличие такого же элемента в корзине

   
    if (basketItems.children.length > 0){
        const basketItemsItem = document.getElementById(watchInfo.id);
        if(basketItemsItem){
            const currentCount = basketItemsItem.querySelector('.basket__item__count');
            currentCount.innerText = parseInt(currentCount.innerText) + parseInt(watchInfo.count);
            calculationSumm();

        }
        else{
            basketItems.insertAdjacentHTML("beforeend", watchBasketHtml);
            numberOfItems();
            calculationSumm();
        }

    }
    else{
        basketItems.insertAdjacentHTML("beforeend", watchBasketHtml);
        numberOfItems();
        calculationSumm();
    }
};

//считаем количество товаров в корзине
function numberOfItems() {

    const basket = document.querySelector('#basket__items');
    const countItems = basket.children.length;
    const headerBasketIcon = document.querySelector('.basket__count__items');

    if (countItems > 0) {
        headerBasketIcon.innerText = countItems;
    }
    else {
        headerBasketIcon.innerText = "";
        closeBasket();
    }
}
//активность кнопки и контент суммы
function disabledSumAndBtn (){
    const basketPay = document.querySelector('.basket__pay');
    const basketPanel = document.querySelector('.basket__summ');
    basketPanel.classList.add('basket__summ--active');
    basketPay.classList.add('basket__pay--active');
}

//подсчет суммы
function calculationSumm() {

  
    const basketResult = document.querySelector('.basket__summ__result');
    const basketItems = document.querySelector('#basket__items');
    const basketChildren = Array.from(basketItems.children);
    const basketPay = document.querySelector('.basket__pay');
    const basketPanel = document.querySelector('.basket__summ');

    function calculation() {
        let sumresult = 0;
        //пересчитываем все суммы дочерних лементов корзины
        basketChildren.forEach(element => {

            let currentCount = element.querySelector('.basket__item__count').innerText;
            const itemPrice = element.querySelector('.basket__items__item__summ').dataset.price;

            //сумма текущей итерации
            let sum = currentCount * itemPrice;
            //общая сумма
            sumresult += sum;
        });
        //запись в сумму
        basketResult.innerText = sumresult + '₽';
    };

    if (basketItems.children.length > 0) {
        basketPanel.classList.remove('basket__summ--active');
        basketPay.classList.remove('basket__pay--active');

        //делаем небольшую задержку, чтоб успела открыться корзина (из-за анимации) и могли передастся данные
        setTimeout(() => {
            calculation()
        }, 100)
        basketPay.disabled = false;
    }

    else {
        //после удаления элемента обнуляем сумму
        basketResult.innerText = 0;
        basketPay.disabled = true;
        disabledSumAndBtn ();

    }
}

//фмльтрация по категориям
function filterWatch(category) {
    //
    const buttonCategory = document.querySelector(`[data-cat = "${category}"]`);

    const itemsWatch = document.querySelectorAll('.shop__wrapper__items__item');

    const navigation = document.querySelector('#shop__pagination');

    // =====================Получаем файл json======================

    const WatchArray = getitems();
    //получем данные из promise
    WatchArray.then(function (value) {

        //создаем новый массив по нужной нам категории
        const newWatchArray = value.filter((name) => {
            const attr = name.attribute;
            //ищем совпадения в строке атрибута
            if (attr.indexOf(category) >= 0){
               return name.attribute;
            }
        })

        //удаляем все элементы на странице
        itemsWatch.forEach(element => {
            element.remove();
        });

        // запускаем отрисовку items
        renderWatches(newWatchArray);
        // скрываем навигацию по страницам
        navigation.style.visibility = "hidden";
    })
}

//добавление кнопки смотреть-все
function addButtonAllWatach (){
    const allWatch = document.querySelector('#all__watch');
    setTimeout(()=>{
        allWatch.classList.add('shop__wrapper__inner__all--active');
        setTimeout(()=>{
            allWatch.style.transform = "scale(1)";
        },400);
    },2000)
}

//функция удаления кнопки смотреть все
function removeButtonAllWatach(){
    const allWatch = document.querySelector('#all__watch');

    allWatch.style.transform = "scale(0)";
    allWatch.classList.remove('shop__wrapper__inner__all--active');
}
//включение навигации по страницам
function paginationOn (){
        const navigation = document.querySelector('#shop__pagination');

        //очищаем предыдущие li страницы
        let liNavigation = Array.from(navigation.children);
        liNavigation.forEach(element => {
            element.remove();
        });
        // показываем навигацию по страницам
        navigation.style.visibility = "visible";

}


// ******************************функции*******************************

function renderWatches(array, countArray = 0) {
    const watchContainer = document.querySelector('#watch--container');

    //создаем карточки товаров 
    array.forEach(element => {

        const watchHtml = `<div class="shop__wrapper__items__item" data-id="${element.id}" data-group="${element.attribute}">
        <div class="shop__wrapper__item__watch">
            <img class="watch__img" src="./assets/images/shop/items/${element.imgSRC}" alt="">
        </div>
        <div class="shop__wrapper__item__content">
            <h4 class="shop__wrapper__item__content__title">${element.title}</h4>

            <div class="shop__wrapper__item__content__details" id="content__details">

                <!-- =========счетчик========== -->
                <div class="item__detail__count" id="item__detail__count">
                    <div class="item__detail__operation" data-action="minus">-</div>
                    <div class="item__count" id="item__count">1</div>
                    <div class="item__detail__operation" data-action="plus">+</div>
                </div>

                <!-- =========ценообразование========== -->

                <div class="item__detail__price">
                    <span class="item__price__count" id="item__price__count">${element.price} ₽</span>
                    <span class="item__price__discount">${element.discount}</span>
                    <span class="item__price__result" id="price__result">0</span>
                </div>

                <button class="shop__wrapper__item__button" id="add__in__basket" ${element.active} type="button" data-item>в корзину</button>
            </div>

        </div>
    </div>`;

        //добавляем в конец нашего списка

        watchContainer.insertAdjacentHTML('beforeend', watchHtml);


        const resultSumItem = document.querySelectorAll('.item__price__result');
        const itemPriceCount = document.querySelectorAll('.item__price__count');
        const itemPriceDiscount = document.querySelectorAll('.item__price__discount');

        //считаем сумму  одной единицы товара с учетом скидки
        let result = parseInt(itemPriceCount[countArray].innerText) - Math.ceil(parseInt(itemPriceCount[countArray].innerText) * (parseInt(itemPriceDiscount[countArray].innerText) / 100));

        //записываем результат
        resultSumItem[countArray].innerText = result + " ₽";
        countArray++;


    });
}

//получение данных из json

async function getitems() {
    const watchItems = await fetch('./assets/images/watch.json');
    const resultItemsArray = await watchItems.json()

    // ============================перебор массива на активные карточки=================
    const ArrayEnabled = resultItemsArray.filter((name) => {
        // if (name.active === ""){
        return name.active === "";
        // }      
    });
    const ArrayDisabled = resultItemsArray.filter((name) => {
        // if (name.active === ""){
        return name.active === "disabled";
        // }      
    });
    const watchItemsArray = ArrayEnabled.concat(ArrayDisabled);


    return watchItemsArray;
}

// ========================pagination========================
function main(arr) {
    
const watchContainer = document.querySelector('#watch--container');
let currentPage = 1; // номер страницы
let items = 9; // количество на странице

//- отрисовка единиц товара
function displayList(arrData, countitem, page) {
    page--; //вычитаем единицу чтоб отрисовать именно первые 12элементов
    watchContainer.innerHTML = ""; // сбрасываем предыдущюю разметку

    //определяем начало и конец списка
    const start = countitem * page;
    const end = start + countitem;
    //обрезаем по 12 items
    const newWatchItemsArray = arrData.slice(start, end);
    //вызываем функцию отрисовки item
    renderWatches(newWatchItemsArray);
};

//отрисовка пагинации

function displayPagination(arrData, countitem) {
    //находим ul - список наших страниц
    const paginationEl = document.querySelector('#shop__pagination');
    const countPages = Math.ceil(arrData.length / countitem);

    for (let i = 0; i < countPages; i++) {
        const pageElement = displayPaginationBtn(i + 1);
        paginationEl.appendChild(pageElement);
    }

};

// создание кнопок пагинации

function displayPaginationBtn(page) {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item');
    liEl.innerText = page;

    //отрисова активной страницы

    if (currentPage == page) {
        liEl.classList.add('pagination__item--active');
    }

    //переключение страниц

    liEl.addEventListener('click', () => {
        currentPage = page;
        displayList(arr, items, currentPage);

        let currentItemLi = document.querySelector('.pagination__item--active');
        currentItemLi.classList.remove('pagination__item--active');

        liEl.classList.add('pagination__item--active');
    });
    return liEl;
};

displayList(arr, items, currentPage);
displayPagination(arr, items);
}


// ========================end pagination========================




// ***********************вызовы функций******************************

//создаем замыкание, чтоб убрать переменные из общей области видимости.
function createList() {
const newArrayWatch = getitems();
newArrayWatch.then(function (value) {
    const watchItemsArray = value;
    main(watchItemsArray);
});
}

let listWatchs = createList;
listWatchs();
//замыкание создано

getitems();

function openForm() {
    const modal = document.querySelector('#modalForm');
    const btn = document.querySelector('#modalForm__btn');
    const body = document.querySelector('body');

    modal.classList.add('modalForm--active');
    body.classList.add('no-scroll');

    setTimeout(() => {
        modal.style.transform = 'rotateX(0)';
    }, 200)

    closeBasket();
}


//закрытие модального окна
function closeForm() {
    const modal = document.querySelector('#modalForm');
    const btnClose = document.querySelector('#modalForm__close');
    const body = document.querySelector('body');

    modal.style.transform = 'rotateX(90deg)';

    setTimeout(() => {
        modal.classList.remove('modalForm--active');
        body.classList.remove('no-scroll');
    }, 200)
}

//передача данных в модальное окно
function sendBuyData() {
    //таймер из-за задержки закрытия
    setTimeout(() => {

        const basketItems = document.querySelectorAll('.basket__items__item');
        const basketSumm = document.querySelector('.basket__summ__result');
        let dataBuyList = [];

        //перебираем выбранные для покупки товары и сохраняем в массив
        basketItems.forEach((element, index) => {
            const buyList = {
                id: element.id,
                img: element.querySelector('.current__image').src,
                count: element.querySelector('.basket__item__count').innerText,
                summ: basketSumm.innerText
            }
            dataBuyList[index] = buyList;
        });

        //перебираем массив с товарами и вставлем в форму отправки
        const buyItemList = document.querySelector('.modalForm__list');
        
        //очишаем от предыдущих открытий
        buyItemList.innerHTML = "";

        dataBuyList.forEach(element => {
        
            const itemInnerHtml = `
            <div class="modalForm__list__item" data-id = "${element.id}">
                <div class="modalForm__list__watch">
                    <img src="${element.img}" alt="" class="modalForm__list__watch">
                </div>
                <div class="modalForm__list__countOrders">${element.count} шт.</div>
            </div>`;

            buyItemList.insertAdjacentHTML('beforeend', itemInnerHtml);

        });

        //добавляем и выводим итоговую сумму

        let countlist = dataBuyList.length - 1;
        
        //проверка на наличие на странице уже результата предыдущей операции

        function addSumm (){
            const orderSummText = `<div class="modalForm__list__orderSumm">Итого : ${dataBuyList[countlist].summ}</div>`
            buyItemList.insertAdjacentHTML("afterend", orderSummText);
        }

        if(document.querySelector('.modalForm__list__orderSumm')){
            const orderSumm = document.querySelector('.modalForm__list__orderSumm');
            orderSumm.innerHTML = '';
            addSumm ();
        }
        else{
            addSumm ();
        }
        //сохраняем данные для отправки формы 

        const inputOrder = document.querySelector('.input__order');
        inputOrder.value = JSON.stringify(dataBuyList);
        console.log(inputOrder.value);


    }, 100);
}
