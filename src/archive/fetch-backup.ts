//Библиотеки
import axios from 'axios';
//Типы
import { Order } from '../intervolga-types/order.type';
//Функции
import { fetchFromLocalSource } from '../api/fetch-local-orders';
//Константы
import { ORDERS_NP_LINK } from '../const';

/**
   * @description Функция, которая пытается получить данные из запасного источника.
   * @date 17/09/2024/22:06:59
   * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
   * @param cachedOrders: Order[] | null,
     @param setError: React.Dispatch<React.SetStateAction<string | null>>,
     @param setOrders: (value: React.SetStateAction<Order[]>) => void,
     @param setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void,
     @param message: HTMLElement | null,
     @param timer: HTMLElement | null
   * @example const fetchFromBackupSource = async (cachedOrders: Order[] | null,
                setError: React.Dispatch<React.SetStateAction<string | null>>,
                setOrders: (value: React.SetStateAction<Order[]>) => void,
                setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void,
                message: HTMLElement | null,
                timer: HTMLElement | null
            ) => {
                try {
                    if (!cachedOrders) {
                        const { data } = await axios.get<Order[]>(ORDERS_NP_LINK);
                        setOrders(data);
                        setCachedOrders(data); // Сохраните в кэш
                        // Проверяем, существует ли элемент message перед обращением к его свойствам
                        if (message) {
                            message.textContent = "Исчерпан суточный лимит бесплатных запросов к сервису, который рассчитывает координаты по введённому пользователем адресу. Или разорвано соедиение с основным сервером. Пытаемся восстановить соединение.... Всё заработает через";
                            timer?.classList.remove('invisible');
                        }
                    } else {
                        setOrders(cachedOrders); // Используйте кэшированные данные
                    }
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        setError(`Ошибка резервного источника: ${err.message}`);
                        fetchFromLocalSource(cachedOrders, setError, setOrders, setCachedOrders, message, timer);
                        
                    } else {
                        setError('Неизвестная ошибка при получении данных из резервного источника');
                    }
                }
            };
   */
export const fetchFromBackupSource = async (cachedOrders: Order[] | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setOrders: (value: React.SetStateAction<Order[]>) => void,
    setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void,
    message: HTMLElement | null,
    timer: HTMLElement | null
) => {
    try {
        if (!cachedOrders) {
            const { data } = await axios.get<Order[]>(ORDERS_NP_LINK);
            setOrders(data);
            setCachedOrders(data); // Сохраните в кэш
            // Проверяем, существует ли элемент message перед обращением к его свойствам
            if (message) {
                message.textContent = "Исчерпан суточный лимит бесплатных запросов к сервису, который рассчитывает координаты по введённому пользователем адресу. Или разорвано соедиение с основным сервером. Пытаемся восстановить соединение.... Всё заработает через";
                timer?.classList.remove('invisible');
            }
        } else {
            setOrders(cachedOrders); // Используйте кэшированные данные
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            setError(`Ошибка резервного источника: ${err.message}`);
            fetchFromLocalSource(cachedOrders, setError, setOrders, setCachedOrders, message, timer);
            
        } else {
            setError('Неизвестная ошибка при получении данных из резервного источника');
        }
    }
};