//Хуки
import { useState } from "react";

//Типы
import {
    Order,
    Product,
    Plant,
    Warehouse
} from "../intervolga-types";

//Константы
import {
    FORMDATA,
    VALIDITY
} from "../const";

/**
 * @description Хранит все состояния приложения.
 * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
 * @date 20/09/2024/00:33:50
 * @example const useAppState = () => {
                const [cashedOrders, setCashedOrders] = useState<Order[] | null>(null);// Состояние для хранения кэша заказов
                const [orders, setOrders] = useState<Order[]>([]);//Состояние массива заказов
                const [cashedProducts, setCashedProducts] = useState<Product[] | null>(null);// Состояние для хранения кэша продуктов
                const [products, setProducts] = useState<Product[]>([]);//Состояние массива продуктов
                const [cashedPlants, setCashedPlants] = useState<Plant[] | null>(null);// Состояние для хранения кэша заводов
                const [plants, setPlants] = useState<Plant[]>([]);//Состояние массива заводов
                const [cashedWarehouses, setCashedWarehouses] = useState<Warehouse[] | null>(null);// Состояние для хранения кэша складов
                const [warehouses, setWarehouses] = useState<Warehouse[]>([]);//Состояние массива складов
                const [openEditBasketUI, setOpenEditBasketUI] = useState(false);//Состояние отрисовки корзины
                const [openViewOrdersUI, setOpenViewOrdersUI] = useState(false);//Состояние отрисовки заказов
                const [openFormUI, setOpenFormUI] = useState(true);//Состояние отрисовки формы
                const [formCompleted, setFormCompleted] = useState(false);//Состояние заполненности формы
                const [error, setError] = useState<string | null>(null);//Состояние ошибки
                const [selectedOption, setSelectedOption] = useState('plants'); // 'plants' или 'warehouses'
                const [formData, setFormData] = useState(FORMDATA);
                const [validity, setValidity] = useState(VALIDITY);

                return {
                    cashedOrders,
                    setCashedOrders,
                    orders,
                    setOrders,
                    cashedProducts,
                    setCashedProducts,
                    products,
                    setProducts,
                    cashedPlants,
                    setCashedPlants,
                    plants,
                    setPlants,
                    cashedWarehouses,
                    setCashedWarehouses,
                    warehouses,
                    setWarehouses,
                    openEditBasketUI,
                    setOpenEditBasketUI,
                    openViewOrdersUI,
                    setOpenViewOrdersUI,
                    openFormUI,
                    setOpenFormUI,
                    formCompleted,
                    setFormCompleted,
                    error,
                    setError,
                    formData,
                    setFormData,
                    validity,
                    setValidity,
                    selectedOption,
                    setSelectedOption
                };
            };
 */
export const useAppState = () => {
    const [cashedOrders, setCashedOrders] = useState<Order[] | null>(null);// Состояние для хранения кэша заказов
    const [orders, setOrders] = useState<Order[]>([]);//Состояние массива заказов
    const [cashedProducts, setCashedProducts] = useState<Product[] | null>(null);// Состояние для хранения кэша продуктов
    const [products, setProducts] = useState<Product[]>([]);//Состояние массива продуктов
    const [cashedPlants, setCashedPlants] = useState<Plant[] | null>(null);// Состояние для хранения кэша заводов
    const [plants, setPlants] = useState<Plant[]>([]);//Состояние массива заводов
    const [cashedWarehouses, setCashedWarehouses] = useState<Warehouse[] | null>(null);// Состояние для хранения кэша складов
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);//Состояние массива складов
    const [openEditBasketUI, setOpenEditBasketUI] = useState(false);//Состояние отрисовки корзины
    const [openViewOrdersUI, setOpenViewOrdersUI] = useState(false);//Состояние отрисовки заказов
    const [openFormUI, setOpenFormUI] = useState(true);//Состояние отрисовки формы
    const [formCompleted, setFormCompleted] = useState(false);//Состояние заполненности формы
    const [error, setError] = useState<string | null>(null);//Состояние ошибки
    const [selectedOption, setSelectedOption] = useState('plants'); // 'plants' или 'warehouses'
    const [formData, setFormData] = useState(FORMDATA);
    const [validity, setValidity] = useState(VALIDITY);

    return {
        cashedOrders,
        setCashedOrders,
        orders,
        setOrders,
        cashedProducts,
        setCashedProducts,
        products,
        setProducts,
        cashedPlants,
        setCashedPlants,
        plants,
        setPlants,
        cashedWarehouses,
        setCashedWarehouses,
        warehouses,
        setWarehouses,
        openEditBasketUI,
        setOpenEditBasketUI,
        openViewOrdersUI,
        setOpenViewOrdersUI,
        openFormUI,
        setOpenFormUI,
        formCompleted,
        setFormCompleted,
        error,
        setError,
        formData,
        setFormData,
        validity,
        setValidity,
        selectedOption,
        setSelectedOption
    };
};
