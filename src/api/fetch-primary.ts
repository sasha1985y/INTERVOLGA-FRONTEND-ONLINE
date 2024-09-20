//Библиотеки
import axios from 'axios';
//Типы
import { Order } from '../intervolga-types/order.type';
//Функции
import { fetchFromLocalSource } from './fetch-local-orders';
//Константы
import { ORDERS_SERVER_LINK } from '../const';

/**
   * @description Функция, которая пытается получить данные с реального сервера.
   * @date 17/09/2024/21:41:59
   * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
   * @param cachedOrders: Order[] | null,
     @param setError: React.Dispatch<React.SetStateAction<string | null>>,
     @param setOrders: (value: React.SetStateAction<Order[]>) => void,
     @param setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void,
     @param message: HTMLElement | null,
     @param timer: HTMLElement | null
   * @example const fetchFromPrimarySource = async (
                cachedOrders: Order[] | null,
                setError: React.Dispatch<React.SetStateAction<string | null>>,
                setOrders: (value: React.SetStateAction<Order[]>) => void,
                setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void,
                message: HTMLElement | null,
                timer: HTMLElement | null
                ) => {
                try {
                    if (!cachedOrders) {
                        const { data } = await axios.get<Order[]>(ORDERS_SERVER_LINK);
                        setOrders(data);
                        setCachedOrders(data); // Сохраните в кэш
                        if (message) {
                            message.textContent = "Соединение с сервером стабильно";
                            timer?.classList.add('invisible');
                        }
                    } else {
                        setOrders(cachedOrders); // Используйте кэшированные данные
                    }
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        setError(err.message); // Сообщение об ошибке от Axios
                        // Если не удалось получить данные с основного сервера, пробуем запасной источник
                        fetchFromLocalSource(cachedOrders, setError, setOrders, setCachedOrders, message, timer);
                    } else {
                        setError('Неизвестная ошибка'); // Обработка других ошибок
                    }
                }
            };
   */
export const fetchFromPrimarySource = async (
    cachedOrders: Order[] | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setOrders: (value: React.SetStateAction<Order[]>) => void,
    setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void,
    message: HTMLElement | null,
    timer: HTMLElement | null
    ) => {
    try {
        if (!cachedOrders) {
            const { data } = await axios.get<Order[]>(ORDERS_SERVER_LINK);
            setOrders(data);
            setCachedOrders(data); // Сохраните в кэш
            if (message) {
                message.textContent = "Соединение с сервером стабильно";
                timer?.classList.add('invisible');
            }
        } else {
            setOrders(cachedOrders); // Используйте кэшированные данные
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            setError(err.message); // Сообщение об ошибке от Axios
            // Если не удалось получить данные с основного сервера, пробуем запасной источник
            fetchFromLocalSource(cachedOrders, setError, setOrders, setCachedOrders, message, timer);
        } else {
            setError('Неизвестная ошибка'); // Обработка других ошибок
        }
    }
};