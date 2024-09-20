/**
 * @description Обработчик события нажатия кнопки. Переход в интерфейс заказов
 * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
 * @date 11/09/2024/17:08:53
 * @param {React.MouseEvent<HTMLButtonElement>} e
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenEditBasketUI
   @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenViewOrdersUI
   @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenFormUI
   @example const goOpenViewOrdersHandler = (
                e: React.MouseEvent<HTMLButtonElement>,
                setOpenEditBasketUI: React.Dispatch<React.SetStateAction<boolean>>,
                setOpenViewOrdersUI: React.Dispatch<React.SetStateAction<boolean>>,
                setOpenFormUI: React.Dispatch<React.SetStateAction<boolean>>
            ) => {
                e.preventDefault();//отменяем действие по умолчанию чтобы не было перезагрузки страницы
                setOpenViewOrdersUI(true);//активируем интерфейс заказов
                setOpenEditBasketUI(false);//деактивируем интерфейс корзины
                setOpenFormUI(false);//деактивируем интерфейс формы
            }
 */
export const goOpenViewOrdersHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    setOpenEditBasketUI: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenViewOrdersUI: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenFormUI: React.Dispatch<React.SetStateAction<boolean>>
) => {
    e.preventDefault();//отменяем действие по умолчанию чтобы не было перезагрузки страницы
    setOpenViewOrdersUI(true);//активируем интерфейс заказов
    setOpenEditBasketUI(false);//деактивируем интерфейс корзины
    setOpenFormUI(false);//деактивируем интерфейс формы
}