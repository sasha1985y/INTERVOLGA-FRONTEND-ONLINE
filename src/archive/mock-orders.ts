import axios from 'axios';

import { Order } from '../intervolga-types/order.type';

/**
 * @description функция получения массива заказов с фейкового сервера для разработки
 * @date 11/09/2024/19:19:36
 * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
 * @example const mockFetchOrders = async (cachedOrders: Order[] | null, setError: React.Dispatch<React.SetStateAction<string | null>>, setOrders: (value: React.SetStateAction<Order[]>) => void, setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void) => {
                const message = document.querySelector('.message') as HTMLElement | null; // Явно указываем тип
                // Проверьте, есть ли уже кэшированные данные
                    try {

                        if (!cachedOrders) {
                            //const { data } = await axios.get<Order[]>('http://127.0.0.1:8000/customers/');
                            const { data } = await axios.get<Order[]>('https://api.npoint.io/e1a299d91e791f921903');
                            setOrders(data);
                            setCachedOrders(data); // Сохраните в кэш
                            // Проверяем, существует ли элемент message перед обращением к его свойствам
                        } else {
                            if (message) {
                                message.classList.remove('d-none');
                            }
                            setOrders(cachedOrders); // Используйте кэшированные данные
                        }
                    } catch (err) {
                        if (axios.isAxiosError(err)) {
                            setError(err.message); // Сообщение об ошибке от Axios
                        } else {
                            setError('Неизвестная ошибка'); // Обработка других ошибок
                        }
                    }
                };
 */
export const mockFetchOrders = async (cachedOrders: Order[] | null, setError: React.Dispatch<React.SetStateAction<string | null>>, setOrders: (value: React.SetStateAction<Order[]>) => void, setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void) => {
  const message = document.querySelector('.message') as HTMLElement | null;
    try {

        if (!cachedOrders) {
            const { data } = await axios.get<Order[]>('https://api.npoint.io/e1a299d91e791f921903');
            setOrders(data);
            setCachedOrders(data);
        } else {
            if (message) {
                message.classList.remove('d-none');
            }
            setOrders(cachedOrders);
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            setError(err.message);
        } else {
            setError('Неизвестная ошибка');
        }
    }
};