import axios from 'axios';

import { Order } from '../intervolga-types/order.type';
/**
 * @description Эта функция пытается добыть массив orders с реального сервера, но если не выходит, то с фейкового.
 * @date 13/09/2024/23:23:05
 * @example const fetchServerOrders = async (
    cachedOrders: Order[] | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setOrders: (value: React.SetStateAction<Order[]>) => void,
    setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void
) => {
    const message = document.querySelector('.message') as HTMLElement | null; // Явно указываем тип
    try {
      // Проверьте, есть ли уже кэшированные данные
        if (!cachedOrders) {
            const { data } = await axios.get<Order[]>('http://127.0.0.1:8000/customers/');
            setOrders(data);
            setCachedOrders(data); // Сохраните в кэш
            if (message) {
                message.classList.add('d-none');
            }
        } else {
            setOrders(cachedOrders); // Используйте кэшированные данные
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            setError(err.message); // Сообщение об ошибке от Axios
            // Попробуйте получить данные из запасного источника
            try {

                if (!cachedOrders) {
                    const { data } = await axios.get<Order[]>('https://api.npoint.io/e1a299d91e791f921903');
                    setOrders(data);
                    setCachedOrders(data); // Сохраните в кэш
                    // Проверяем, существует ли элемент message перед обращением к его свойствам
                    if (message) {
                        message.classList.remove('d-none');
                    }
                } else {
                    setOrders(cachedOrders); // Используйте кэшированные данные
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Ошибка резервного источника: ${err.message}`);
                } else {
                    setError('Неизвестная ошибка при получении данных из резервного источника');
                }
            }
        } else {
            setError('Неизвестная ошибка'); // Обработка других ошибок
        }
    }
};
 */
export const fetchServerOrders = async (
    cachedOrders: Order[] | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setOrders: (value: React.SetStateAction<Order[]>) => void,
    setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void
) => {
    const message = document.querySelector('.message') as HTMLElement | null; // Явно указываем тип
    try {
      // Проверьте, есть ли уже кэшированные данные
        if (!cachedOrders) {
            const { data } = await axios.get<Order[]>('http://127.0.0.1:8000/customers/');
            setOrders(data);
            setCachedOrders(data); // Сохраните в кэш
            if (message) {
                message.classList.add('d-none');
            }
        } else {
            setOrders(cachedOrders); // Используйте кэшированные данные
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            setError(err.message); // Сообщение об ошибке от Axios
            // Попробуйте получить данные из запасного источника
            try {

                if (!cachedOrders) {
                    const { data } = await axios.get<Order[]>('https://api.npoint.io/e1a299d91e791f921903');
                    setOrders(data);
                    setCachedOrders(data); // Сохраните в кэш
                    // Проверяем, существует ли элемент message перед обращением к его свойствам
                    if (message) {
                        message.classList.remove('d-none');
                    }
                } else {
                    setOrders(cachedOrders); // Используйте кэшированные данные
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Ошибка резервного источника: ${err.message}`);
                } else {
                    setError('Неизвестная ошибка при получении данных из резервного источника');
                }
            }
        } else {
            setError('Неизвестная ошибка'); // Обработка других ошибок
        }
    }
};
  