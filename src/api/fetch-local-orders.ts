//Библиотеки
import axios from 'axios';
//Типы
import {
    Order,
    Plant,
    Warehouse,
    Product
} from '../intervolga-types';
//Константы
import {
    ORDERS,
    PLANTS,
    WAREHOUSES,
    PRODUCTS
} from '../const';

/**
   * @description Функция, которая пытается получить данные из локального файла.
   * @date 17/09/2024/22:18:51
   * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
   * @param cashedOrders: Order[] | null,
     @param setError: React.Dispatch<React.SetStateAction<string | null>>,
     @param setOrders: (value: React.SetStateAction<Order[]>) => void,
     @param setCashedOrders: (value: React.SetStateAction<Order[] | null>) => void,
     @param message: HTMLElement | null,
     @param timer: HTMLElement | null
   * @example const fetchFromLocalSource = async (
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
                    if (!cashedOrders || !cashedPlants || !cashedWarehouses || !cashedProducts) {
                        const ordersData = <Order[]>(ORDERS);
                        const warehousesData = <Warehouse[]>(WAREHOUSES);
                        const plantsData = <Plant[]>(PLANTS);
                        const productsData = <Product[]>(PRODUCTS);

                        setOrders(ordersData);
                        setCashedOrders(ordersData); // Сохраните в кэш
                        setWarehouses(warehousesData);
                        setCashedWarehouses(warehousesData);
                        setPlants(plantsData);
                        setCashedPlants(plantsData);
                        setProducts(productsData);
                        setCashedProducts(productsData);

                        if (message) {
                            message.textContent = "Разорвано соединение с сервером. Пытаемся восстановить соединение.... Если недоступен сервис Dadata, то всё заработает через";
                            timer?.classList.remove('invisible');
                        }
                    } else {
                        setOrders(cashedOrders);
                        setPlants(cashedPlants);
                        setWarehouses(cashedWarehouses);
                        setProducts(cashedProducts); // Используйте кэшированные данные
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
export const fetchFromLocalSource = async (
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
        if (!cashedOrders || !cashedPlants || !cashedWarehouses || !cashedProducts) {
            const ordersData = <Order[]>(ORDERS);
            const warehousesData = <Warehouse[]>(WAREHOUSES);
            const plantsData = <Plant[]>(PLANTS);
            const productsData = <Product[]>(PRODUCTS);

            setOrders(ordersData);
            setCashedOrders(ordersData); // Сохраните в кэш
            setWarehouses(warehousesData);
            setCashedWarehouses(warehousesData);
            setPlants(plantsData);
            setCashedPlants(plantsData);
            setProducts(productsData);
            setCashedProducts(productsData);

            if (message) {
                message.textContent = "Разорвано соединение с сервером. Пытаемся восстановить соединение.... Если недоступен сервис Dadata, то всё заработает через";
                timer?.classList.remove('invisible');
            }
        } else {
            setOrders(cashedOrders);
            setPlants(cashedPlants);
            setWarehouses(cashedWarehouses);
            setProducts(cashedProducts); // Используйте кэшированные данные
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            setError(err.message); // Сообщение об ошибке от Axios
        } else {
            setError('Неизвестная ошибка'); // Обработка других ошибок
        }
    }
};
