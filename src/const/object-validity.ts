//Типы
import { Validity } from '../intervolga-types/index';

/**
   * @description Объект настроек начального Булевого состояния валидации полей предварительной формы
   * @date 07/10/2024/01:07:16
   * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
   * @example const VALIDITY = {//Начальное Булево состояние валидации полей предварительной формы
                firstName: false,
                address: false,
                goods: false,
                cost: false,
                quantity: false,
                total: false,
                suppliers: false
            }
*/
export const VALIDITY: Validity = {
    firstName: false,
    address: false,
    goods: false,
    cost: false,
    quantity: false,
    total: false,
    suppliers: false
}