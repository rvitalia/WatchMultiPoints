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
const mapForm = document.querySelector('.map__inner__form');
const ArrowLeft = document.querySelector('.map__arrow');


//проверка в памяти браузера данных о покупках
window.onload = function(){
    loadFromLocal();
}


//==============функции===================

function eventClick() {

    window.addEventListener('click', (event) => {

        //если нажат значок корзины
        if (event.target.id === 'basket__logo') {
            openBasket();
        }
        //если нажата кнопка закрытия корзины
        else if (event.target.id === 'basket__close') {
            closeBasket();
        }


        else if( event.target === document.querySelector('.basket__pay')){
            openForm();
            sendBuyData();
        }

        else if(event.target === document.querySelector('#modalForm__close')){
            closeForm();
        }
        else if (event.target === document.querySelector('.map__inner__form__close')){
            mapForm.style.visibility = "hidden";
            ArrowLeft.style.opacity = "1";
        }
        else if (event.target === document.querySelector('.map__arrow')){
            mapForm.style.visibility = "visible";
            ArrowLeft.style.opacity = "0";
            console.log('ok')
        }

        else {
            console.log(event.target);
        }

    })
 
};


//=================вызовы==================

eventClick();
