import axios from 'axios';

import { Order } from '../intervolga-types/order.type';

import { fetchFromBackupSource } from './fetch-backup';

export const fetchFromPrimarySource = async (
    cachedOrders: Order[] | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setOrders: (value: React.SetStateAction<Order[]>) => void,
    setCachedOrders: (value: React.SetStateAction<Order[] | null>) => void,
    message: HTMLElement | null
    ) => {
    try {
        if (!cachedOrders) {
            const { data } = await axios.get<Order[]>('http://127.0.0.1:8000/customers/');
            setOrders(data);
            setCachedOrders(data); // Сохраните в кэш
            if (message) {
                message.classList.add('invisible');
            }
        } else {
            setOrders(cachedOrders); // Используйте кэшированные данные
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            setError(err.message); // Сообщение об ошибке от Axios
            // Если не удалось получить данные с основного сервера, пробуем запасной источник
            fetchFromBackupSource(cachedOrders, setError, setOrders, setCachedOrders, message);
        } else {
            setError('Неизвестная ошибка'); // Обработка других ошибок
        }
    }
};