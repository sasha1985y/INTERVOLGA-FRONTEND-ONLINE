//Библиотеки
import axios from 'axios';
//Типы
import {
    Order,
    Plant,
    Warehouse,
    Product
} from '../intervolga-types';
//Функции
import { fetchFromLocalSource } from './fetch-local-orders';
//Константы
import { 
    ORDERS_SERVER_LINK,
    PLANTS_SERVER_LINK,
    WAREHOUSES_SERVER_LINK,
    PRODUCTS_SERVER_LINK
 } from '../const';

/**
   * @description Функция, которая пытается получить данные с реального сервера.
   * @date 17/09/2024/21:41:59
   * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
   * @param cashedOrders: Order[] | null,
     @param setError: React.Dispatch<React.SetStateAction<string | null>>,
     @param setOrders: (value: React.SetStateAction<Order[]>) => void,
     @param setCashedOrders: (value: React.SetStateAction<Order[] | null>) => void,
     @param message: HTMLElement | null,
     @param timer: HTMLElement | null
   * @example const fetchFromPrimarySource = async (
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
                setCashedProducts: (value: React.SetStateAction<Product[]| null>) => void,
                message: HTMLElement | null,
                timer: HTMLElement | null
            ) => {
                try {
                    // Загружаем данные параллельно
                    const [ordersResponse, warehousesResponse, plantsResponse, productsResponse] = await Promise.all([
                        axios.get<Order[]>(ORDERS_SERVER_LINK),
                        axios.get<Warehouse[]>(WAREHOUSES_SERVER_LINK),
                        axios.get<Plant[]>(PLANTS_SERVER_LINK),
                        axios.get<Product[]>(PRODUCTS_SERVER_LINK),
                    ]);

                    const ordersData = ordersResponse.data;
                    const warehousesData = warehousesResponse.data;
                    const plantsData = plantsResponse.data;
                    const productsData = productsResponse.data;

                    // Обновляем состояния
                    setOrders(ordersData);
                    setCashedOrders(ordersData); // Сохраните в кэш
                    setWarehouses(warehousesData);
                    setCashedWarehouses(warehousesData);
                    setPlants(plantsData);
                    setCashedPlants(plantsData);
                    setProducts(productsData);
                    setCashedProducts(productsData);

                    if (message) {
                        message.textContent = "Соединение с сервером стабильно";
                        timer?.classList.add('invisible');
                    }
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        setError(err.message); // Сообщение об ошибке от Axios
                        // Если не удалось получить данные с основного сервера, пробуем запасной источник
                        fetchFromLocalSource(
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
                    } else {
                        setError('Неизвестная ошибка'); // Обработка других ошибок
                    }
                }
            };
   */
export const fetchFromPrimarySource = async (
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
    setCashedProducts: (value: React.SetStateAction<Product[]| null>) => void,
    message: HTMLElement | null,
    timer: HTMLElement | null
) => {
    try {
        // Загружаем данные параллельно
        const [ordersResponse, warehousesResponse, plantsResponse, productsResponse] = await Promise.all([
            axios.get<Order[]>(ORDERS_SERVER_LINK),
            axios.get<Warehouse[]>(WAREHOUSES_SERVER_LINK),
            axios.get<Plant[]>(PLANTS_SERVER_LINK),
            axios.get<Product[]>(PRODUCTS_SERVER_LINK),
        ]);

        const ordersData = ordersResponse.data;
        const warehousesData = warehousesResponse.data;
        const plantsData = plantsResponse.data;
        const productsData = productsResponse.data;

        // Обновляем состояния
        setOrders(ordersData);
        setCashedOrders(ordersData); // Сохраните в кэш
        setWarehouses(warehousesData);
        setCashedWarehouses(warehousesData);
        setPlants(plantsData);
        setCashedPlants(plantsData);
        setProducts(productsData);
        setCashedProducts(productsData);

        if (message) {
            message.textContent = "Соединение с сервером стабильно";
            timer?.classList.add('invisible');
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            setError(err.message); // Сообщение об ошибке от Axios
            // Если не удалось получить данные с основного сервера, пробуем запасной источник
            fetchFromLocalSource(
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
        } else {
            setError('Неизвестная ошибка'); // Обработка других ошибок
        }
    }
};