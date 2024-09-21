//Типы
import {
    Order,
    Plant,
    Warehouse,
    Product
} from '../intervolga-types';
//Функции
import { fetchFromPrimarySource } from './fetch-primary';

/**
   * @description Функция, которая пытается получить данные с реального сервера запуском fetchFromPrimarySource,
   * но если это безуспешно,или соединение с сервером разорвано, то подгружаем моковый локальный массив. За это отвечает
   * функция fetchFromLocalSource.
   * @date 15/09/2024/02:19:59
   * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
   * @param cashedOrders: Order[] | null,
     @param setError: React.Dispatch<React.SetStateAction<string | null>>,
     @param setOrders: (value: React.SetStateAction<Order[]>) => void,
     @param setCashedOrders: (value: React.SetStateAction<Order[] | null>) => void
   * @example const fetchSafeServerOrders = async (
                cashedOrders: Order[] | null,
                cashedPlants: Plant[] | null,
                cashedWarehouses: Warehouse[] | null,
                cashedProducts: Product[] | null,
                setError: React.Dispatch<React.SetStateAction<string | null>>,
                setOrders: (value: React.SetStateAction<Order[]>) => void,
                setCashedOrders: (value: React.SetStateAction<Order[] | null>) => void,
                setWarehouses: (value: React.SetStateAction<Warehouse[]>) => void,
                setCashedWarehouses: (value: React.SetStateAction<Warehouse[] | null>) => void,
                setPlants: (value: React.SetStateAction<Plant[]>) => void,
                setCashedPlants: (value: React.SetStateAction<Plant[] | null>) => void,
                setProducts: (value: React.SetStateAction<Product[]>) => void,
                setCashedProducts: (value: React.SetStateAction<Product[]| null>) => void
            ) => {
                const message = document.querySelector('.message') as HTMLElement | null;
                const timer = document.querySelector('.timer') as HTMLElement | null;

                // Запускаем первичный запрос
                await fetchFromPrimarySource(
                    cashedOrders,
                    cashedPlants,
                    cashedWarehouses,
                    cashedProducts,
                    setError,
                    setOrders,
                    setCashedOrders,
                    setWarehouses,
                    setCashedWarehouses,
                    setPlants,
                    setCashedPlants,
                    setProducts,
                    setCashedProducts,
                    message,
                    timer
                );

                const intervalId = setInterval(() => {
                    fetchFromPrimarySource(
                        cashedOrders,
                        cashedPlants,
                        cashedWarehouses,
                        cashedProducts,
                        setError,
                        setOrders,
                        setCashedOrders,
                        setWarehouses,
                        setCashedWarehouses,
                        setPlants,
                        setCashedPlants,
                        setProducts,
                        setCashedProducts,
                        message,
                        timer
                    );
                }, 30000); // Проверяем каждые 30 секунд

                return () => clearInterval(intervalId);
            };
   */
export const fetchSafeServerOrders = async (
    cashedOrders: Order[] | null,
    cashedPlants: Plant[] | null,
    cashedWarehouses: Warehouse[] | null,
    cashedProducts: Product[] | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setOrders: (value: React.SetStateAction<Order[]>) => void,
    setCashedOrders: (value: React.SetStateAction<Order[] | null>) => void,
    setWarehouses: (value: React.SetStateAction<Warehouse[]>) => void,
    setCashedWarehouses: (value: React.SetStateAction<Warehouse[] | null>) => void,
    setPlants: (value: React.SetStateAction<Plant[]>) => void,
    setCashedPlants: (value: React.SetStateAction<Plant[] | null>) => void,
    setProducts: (value: React.SetStateAction<Product[]>) => void,
    setCashedProducts: (value: React.SetStateAction<Product[]| null>) => void
) => {
    const message = document.querySelector('.message') as HTMLElement | null;
    const timer = document.querySelector('.timer') as HTMLElement | null;

    // Запускаем первичный запрос
    await fetchFromPrimarySource(
        cashedOrders,
        cashedPlants,
        cashedWarehouses,
        cashedProducts,
        setError,
        setOrders,
        setCashedOrders,
        setWarehouses,
        setCashedWarehouses,
        setPlants,
        setCashedPlants,
        setProducts,
        setCashedProducts,
        message,
        timer
    );

    const intervalId = setInterval(() => {
        fetchFromPrimarySource(
            cashedOrders,
            cashedPlants,
            cashedWarehouses,
            cashedProducts,
            setError,
            setOrders,
            setCashedOrders,
            setWarehouses,
            setCashedWarehouses,
            setPlants,
            setCashedPlants,
            setProducts,
            setCashedProducts,
            message,
            timer
        );
    }, 30000); // Проверяем каждые 30 секунд

    return () => clearInterval(intervalId);
};
