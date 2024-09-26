import { LabelKeys } from "../intervolga-types";

/** 
 * @description переменная, которая описывает названия лейблов полей предварительной формы
 * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_
 * @date 19/09/2024/02:46:50
 * @type {Record<LabelKeys, string>}
 * @example const labelTexts: Record<LabelKeys, string> = {//Название лейблов полей предварительной  формы
                firstName: "Ваше имя",
                address: "Адрес доставки",
                goods: "Товары",
                cost: "Цена за еденицу",
                quantity: "Количество товара",
                total: "Цена за всё",
                suppliers: "Поставщики"
            };
 */
export const labelTexts: Record<LabelKeys, string> = {//Название лейблов полей предварительной  формы
    firstName: "Ваше имя",
    address: "Адрес доставки",
    goods: "Товары",
    cost: "Цена за еденицу",
    quantity: "Количество товара",
    total: "Цена за всё",
    suppliers: "Поставщики"
};
