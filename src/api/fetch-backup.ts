import axios from 'axios';

import { Order } from '../intervolga-types/order.type';

export const fetchFromBackupSource = async (cachedOrders: Order[] | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setOrders: (value: React.SetStateAction<Order[]>) => void,
    setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void,
    message: HTMLElement | null
) => {
    try {
        if (!cachedOrders) {
            const { data } = await axios.get<Order[]>('https://api.npoint.io/e1a299d91e791f921903');
            setOrders(data);
            setCachedOrders(data); // Сохраните в кэш
            // Проверяем, существует ли элемент message перед обращением к его свойствам
            if (message) {
                message.classList.remove('invisible');
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
};