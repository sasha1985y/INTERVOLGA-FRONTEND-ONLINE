/**
 * @description Обработчик события нажатия кнопки. Переход в интерфейс формы
 * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
 * @date 11/09/2024/17:23:22
 * @param {React.MouseEvent<HTMLButtonElement>} e
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenEditBasketUI
   @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenViewOrdersUI
   @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenFormUI
 */
export const goOpenFormHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    setOpenEditBasketUI: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenViewOrdersUI: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenFormUI: React.Dispatch<React.SetStateAction<boolean>>
) => {
    e.preventDefault();//отменяем действие по умолчанию чтобы не было перезагрузки страницы
    setOpenFormUI(true);//активируем интерфейс формы
    setOpenEditBasketUI(false);//деактивируем интерфейс корзины
    setOpenViewOrdersUI(false);//деактивируем интерфейс заказов
}