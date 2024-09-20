//Типы
import { Order } from '../intervolga-types/order.type';
//Функции
import { fetchFromPrimarySource } from './fetch-primary';

/**
   * @description Функция, которая пытается получить данные с реального сервера запуском fetchFromPrimarySource,
   * но если это безуспешно,или соединение с сервером разорвано, то подгружаем моковый локальный массив. За это отвечает
   * функция fetchFromLocalSource.
   * @date 15/09/2024/02:19:59
   * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
   * @param cachedOrders: Order[] | null,
     @param setError: React.Dispatch<React.SetStateAction<string | null>>,
     @param setOrders: (value: React.SetStateAction<Order[]>) => void,
     @param setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void
   * @example const fetchSafeServerOrders = async (
                cachedOrders: Order[] | null,
                setError: React.Dispatch<React.SetStateAction<string | null>>,
                setOrders: (value: React.SetStateAction<Order[]>) => void,
                setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void
            ) => {
                const message = document.querySelector('.message') as HTMLElement | null; // Явно указываем тип
                const timer = document.querySelector('.timer') as HTMLElement | null;

                // Запускаем первичный запрос
                await fetchFromPrimarySource(cachedOrders, setError, setOrders, setCachedOrders, message, timer);

                // Устанавливаем интервал для периодической проверки
                const intervalId = setInterval(() => {
                    fetchFromPrimarySource(cachedOrders, setError, setOrders, setCachedOrders, message, timer);
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
    const timer = document.querySelector('.timer') as HTMLElement | null;

    // Запускаем первичный запрос
    await fetchFromPrimarySource(cachedOrders, setError, setOrders, setCachedOrders, message, timer);

    // Устанавливаем интервал для периодической проверки
    const intervalId = setInterval(() => {
        fetchFromPrimarySource(cachedOrders, setError, setOrders, setCachedOrders, message, timer);
    }, 30000); // Проверяем каждые 30 секунд

    // Очищаем интервал, когда компонент размонтируется
    return () => clearInterval(intervalId);
};
