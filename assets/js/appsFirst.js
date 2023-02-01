
//слик слайдер

$(document).ready(function () {
    $('.hero__slider').slick({
        arrows: true,
        dots: false,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2500,
        prevArrow: '<button type="button" class="slick-prev slide__left"></button>',
        nextArrow: '<button type="button" class="slick-next slide__right"></button>',
    });
});



//Аос анимация - без оборачивания не работает из-заслайдера
$(window).on("scroll", function () {
    AOS.init({
        delay: 300,
        duration: 2000,
    });
});




//Текст по кругу

(function () {
    new CircleType(document.getElementById('text1'))
        .radius(384);
    new CircleType(document.getElementById('text2'))
        .dir(-1)
        .radius(384);

    new CircleType(document.getElementById('text3'))
        .radius(384);
    new CircleType(document.getElementById('text4'))
        .dir(-1)
        .radius(384);
})();

//таймер
(function () {

    //устанавливаем  дедлайн
    let deadline = 'February 28 2023 23:59:59 GMT+0200';


    //рассчитываем оставшееся время

    function getTime(endtime) {
        const countdown = document.querySelector('#countdown');

        //получаем разницу
        let t = Date.parse(endtime) - Date.parse(new Date());
        //делим на 1000мс - получаем секунды, ...делим на 60секунд и берем оставшуюся часть (которые остались после подсчета минут) + округление
        let seconds = Math.floor((t / 1000) % 60); //seconds
        let minutes = Math.floor((t / 1000 / 60) % 60); // minutes
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24); //hours
        let days = Math.floor(t / (1000 * 60 * 60 * 24)); //days

        const result = {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
        const countdownHtml = `
        <span class="countdown__item">${result.days} Days</span>
        <span class="countdown__item">${result.hours} Hours</span>
        <span class="countdown__item">${result.minutes} Minutes</span>
        <span class="countdown__item">${result.seconds} Seconds</span>
        `;

        if (countdown.children) {
            const countdown__items = document.querySelectorAll('.countdown__item');
            countdown__items.forEach(element => {
                element.remove();
            });

            countdown.insertAdjacentHTML('beforeend', countdownHtml);
        }
        else {
            countdown.insertAdjacentHTML('beforeend', countdownHtml);
            console.log(' в else')

        }
        return result;
    }

    function initializeClock(endtime) {
        const countdown = document.querySelector('#countdown');


        let timeInetrval = setInterval(function () {
            let result = getTime(endtime)

            if (result.total <= 0) {
                clearInterval(timeInetrval);
            }
        }, 1000);
    }



    initializeClock(deadline);

})();

function disabledSumAndBtn (){
    const basketPay = document.querySelector('.basket__pay');
    const basketPanel = document.querySelector('.basket__summ');
    basketPanel.classList.add('basket__summ--active');
    basketPay.classList.add('basket__pay--active');
}

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
        disabledSumAndBtn();
    }
}

//рендеринг данных из локал сторэдж
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
//отправка данных о покупке в модальное окно
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

//открытие модального окна
function openForm() {
    const modal = document.querySelector('#modalForm');
    const btn = document.querySelector('#modalForm__btn');
    const body = document.querySelector('body');

    modal.classList.add('modalForm--active');
    body.classList.add('no-scroll');
    closeBasket();

    setTimeout(() => {
        modal.style.transform = 'rotateX(0)';
    }, 200)
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