//import axios from 'axios';

import { Order } from '../intervolga-types/order.type';

import { fetchFromPrimarySource } from './fetch-primary';

/**
   * @description Функция, которая пытается получить данные с реального сервера запуском fetchFromPrimarySource,
   * но если это безуспешно,или соединение с сервером разорвано, то fetchFromPrimarySource запускает запасную
   * функцию fetchFromBackupSource и пытается получить данные с фейкового сервера.
   * @date 15/09/2024/02:19:59
   * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
   * @example const fetchSafeServerOrders = async (
                cachedOrders: Order[] | null,
                setError: React.Dispatch<React.SetStateAction<string | null>>,
                setOrders: (value: React.SetStateAction<Order[]>) => void,
                setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void
            ) => {
                const message = document.querySelector('.message') as HTMLElement | null; // Явно указываем тип

                // Запускаем первичный запрос
                await fetchFromPrimarySource(cachedOrders, setError, setOrders, setCachedOrders, message);

                // Устанавливаем интервал для периодической проверки
                const intervalId = setInterval(() => {
                    fetchFromPrimarySource(cachedOrders, setError, setOrders, setCachedOrders, message);
                }, 30000); // Проверяем каждые 30 секунд

                // Очищаем интервал, когда компонент размонтируется
                return () => clearInterval(intervalId);
            };
   */
export const fetchSafeServerOrders = async (
    cachedOrders: Order[] | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setOrders: (value: React.SetStateAction<Order[]>) => void,
    setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void
) => {
    const message = document.querySelector('.message') as HTMLElement | null; // Явно указываем тип

    // Запускаем первичный запрос
    await fetchFromPrimarySource(cachedOrders, setError, setOrders, setCachedOrders, message);

    // Устанавливаем интервал для периодической проверки
    const intervalId = setInterval(() => {
        fetchFromPrimarySource(cachedOrders, setError, setOrders, setCachedOrders, message);
    }, 30000); // Проверяем каждые 30 секунд

    // Очищаем интервал, когда компонент размонтируется
    return () => clearInterval(intervalId);
};
