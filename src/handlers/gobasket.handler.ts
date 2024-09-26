import { LabelKeys } from "../intervolga-types";
import { labelTexts } from "../const/index";

/**
   * @description Обработчик события нажатия кнопки. Переход в корзину только поле правильного заполнения предварительной формы.
   * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_
   * @date 11/09/2024/16:20:50
   * @param {React.MouseEvent<HTMLButtonElement>} e
   * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenEditBasketUI
     @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenViewOrdersUI
     @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenFormUI
     @param validity: {
                firstName: boolean;
                address: boolean;
                goods: boolean;
                cost: boolean;
                quantity: boolean;
                total: boolean;
            }
     @example const goBascketHandler = (
                e: React.MouseEvent<HTMLButtonElement>,
                setOpenEditBasketUI: React.Dispatch<React.SetStateAction<boolean>>,
                setOpenViewOrdersUI: React.Dispatch<React.SetStateAction<boolean>>,
                setOpenFormUI: React.Dispatch<React.SetStateAction<boolean>>,
                validity: {
                    firstName: boolean;
                    address: boolean;
                    goods: boolean;
                    cost: boolean;
                    quantity: boolean;
                    total: boolean;
                }
            ) => {
                e.preventDefault();//отменяем действие по умолчанию чтобы не было перезагрузки страницы
                if (Object.values(validity).every(v => v === true)) {//если все поля формы заполнены корректно
                    setOpenEditBasketUI(true);//активируем интерфейс корзины
                    setOpenViewOrdersUI(false);//деактивируем интерфейс заказов
                    setOpenFormUI(false);//деактивируем интерфейс формы
                } else {
                    const invalidFields = Object.entries(validity)
                        .filter(([, value]) => value === false) // Фильтруем только те поля, где значение false
                        .map(([key]) => labelTexts[key as LabelKeys]); // Извлекаем тексты меток

                    alert(`${invalidFields.length > 1 ? "Поля :" : "Поле"} "${invalidFields.join('", "')}" ${invalidFields.length > 1 ? "- не заполнены" : "- не заполнено"}`);
                    //выводим сообщение для пользователя
                }
            }
   */
export const goBascketHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    setOpenEditBasketUI: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenViewOrdersUI: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenFormUI: React.Dispatch<React.SetStateAction<boolean>>,
    validity: {
        firstName: boolean;
        address: boolean;
        goods: boolean;
        cost: boolean;
        quantity: boolean;
        total: boolean;
        suppliers: boolean;
    }
) => {
    e.preventDefault();//отменяем действие по умолчанию чтобы не было перезагрузки страницы
    if (Object.values(validity).every(v => v === true)) {//если все поля формы заполнены корректно
        setOpenEditBasketUI(true);//активируем интерфейс корзины
        setOpenViewOrdersUI(false);//деактивируем интерфейс заказов
        setOpenFormUI(false);//деактивируем интерфейс формы
    } else {
        const invalidFields = Object.entries(validity)
            .filter(([, value]) => value === false) // Фильтруем только те поля, где значение false
            .map(([key]) => labelTexts[key as LabelKeys]); // Извлекаем тексты меток

        alert(`${invalidFields.length > 1 ? "Поля :" : "Поле"} "${invalidFields.join('", "')}" ${invalidFields.length > 1 ? "- не заполнены" : "- не заполнено"}`);
        //выводим сообщение для пользователя
    }
}