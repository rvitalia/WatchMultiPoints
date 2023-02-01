// import { addInBasket } from "./addInBasket";
// import { openBasket } from "./basket";
// import { closeBasket } from "./basket";
// import { numberOfItems } from "./numberItems";
// import { calculationSumm } from "./calculationSumm";
// import { filterWatch } from "./filterWatch";
// import { addButtonAllWatach } from "./filterWatch";
// import { removeButtonAllWatach } from "./filterWatch";
// import { createList } from "./renderItem";
// import { paginationOn } from "./filterWatch";
// import { loadFromLocal, saveToLocal } from "./localdata";
// import { closeForm, openForm } from "./modal";
// import { sendBuyData } from "./sendBuyData";

//===================константы и переменные===============
const basket = document.querySelector('#basket');

window.onload = function(){
    loadFromLocal();
}


//==============функции===================

function eventClick() {
        const allWatch = document.querySelector('#all__watch');

    window.addEventListener('click', (event) => {
        //если нажат минус или плюс
        if (event.target.dataset.action === "minus" || event.target.dataset.action === "plus") {

            const currentID = event.target;
            const parentDetails = currentID.closest('#content__details');
            const itemChild = parentDetails.querySelector('#item__count');
            const resultSumItem = parentDetails.querySelector('.item__price__result');
            const price = parentDetails.querySelector('#item__price__count');
            const itemPriceDiscount = parentDetails.querySelector('.item__price__discount');
            const ItemSum = Math.ceil(parseInt(price.innerText) * (parseInt(itemPriceDiscount.innerText) / 100));


            if (event.target.dataset.action === "minus") {
                const price = parentDetails.querySelector('#item__price__count');
                //ограничиваем чтоб не уходило меньше 0
                if (Number(itemChild.innerText) > 1) {
                    itemChild.innerText = Number(itemChild.innerText) - 1;
                    resultSumItem.innerText = (parseInt(resultSumItem.innerText) - ItemSum) + " ₽";
                }

            }
            //если нажат плюс
            else if (event.target.dataset.action === "plus") {

                itemChild.innerText = Number(itemChild.innerText) + 1;
                resultSumItem.innerText = (ItemSum * itemChild.innerText) + " ₽";
            }


        }
        //если нажат значок корзины
        else if (event.target.id === 'basket__logo') {
            openBasket();
        }
        //если нажата кнопка закрытия корзины
        else if (event.target.id === 'basket__close') {
            closeBasket();
        }
        //если нажата кнопка добавления в корзину
        else if (event.target.id === 'add__in__basket') {
            addInBasket(event.target);
            //сбрасываем цифру счетчика на 1
            const parrentWrapper = (event.target).closest('#content__details');
            parrentWrapper.querySelector('#item__count').innerText = 1;
            //сохраняем данные корзины
            saveToLocal();
        }
        //если нажата кнопка минус в корзине
        else if (event.target.dataset.operation == 'minus') {
            const count = event.target.closest('.basket__items__item__calculation');
            //вычитаем
            if (count.querySelector('.basket__item__count').innerText > 1) {
                count.querySelector('.basket__item__count').innerText--;
                calculationSumm();
                saveToLocal();
            }
            //удаляем из корзины
            else {
                event.target.closest('.basket__items__item').remove();
                numberOfItems();
                calculationSumm();
                saveToLocal();
            }

        }
        //если нажата кнопка увеличения товара в корзине
        else if (event.target.dataset.operation == 'plus') {
            const count = event.target.closest('.basket__items__item__calculation');
            count.querySelector('.basket__item__count').innerText++;
            calculationSumm();
            saveToLocal();
        }
        //фильтр по классическим часам
        else if (event.target.dataset.cat == "classic") {
            filterWatch('classic');
            //добавляем кнопку посмотреть все часы, предварительно удалив предыдущую, если она есть
            if (allWatch.classList.contains('shop__wrapper__inner__all--active')) {
                removeButtonAllWatach();
            }
            addButtonAllWatach();
        }
        //фильтр по мужским часам
        else if (event.target.dataset.cat == "Man") {
            filterWatch('Man');
            //добавляем кнопку посмотреть все часы, предварительно удалив предыдущую, если она есть
            if (allWatch.classList.contains('shop__wrapper__inner__all--active')) {
                removeButtonAllWatach();
            }
            addButtonAllWatach();
        }
        //фильтр по цифровым часам
        else if (event.target.dataset.cat == "digital") {
            filterWatch('digital');
            //добавляем кнопку посмотреть все часы, предварительно удалив предыдущую, если она есть
            if (allWatch.classList.contains('shop__wrapper__inner__all--active')) {
                removeButtonAllWatach();
            }
            addButtonAllWatach();
        }
        //фильтр по женским часам
        else if (event.target.dataset.cat == "woman") {
            filterWatch('woman');
            //добавляем кнопку посмотреть все часы, предварительно удалив предыдущую, если она есть
            if (allWatch.classList.contains('shop__wrapper__inner__all--active')) {
                removeButtonAllWatach();
            }
            addButtonAllWatach();
        }
        //фильтр по кварцевым часам
        else if (event.target.dataset.cat == "quartz") {
            filterWatch('quartz');
            //добавляем кнопку посмотреть все часы, предварительно удалив предыдущую, если она есть
            if (allWatch.classList.contains('shop__wrapper__inner__all--active')) {
                removeButtonAllWatach();
            }
            addButtonAllWatach();
        }
        else if (event.target.closest('#all__watch') === allWatch) {
            //показываем кнопки навигации по страницам
            paginationOn();
            //запускаем отрисовку всех часов (функция замкнута)
            let listWatchs = createList;
            listWatchs();
			//скрываем кнопку
			removeButtonAllWatach();

        }

        else if( event.target === document.querySelector('.basket__pay')){
            openForm();
            sendBuyData();
        }

        else if(event.target === document.querySelector('#modalForm__close')){
            closeForm();
        }

        else {
            //console.log(event.target);
        }

    })

};


//=================вызовы==================

eventClick();
