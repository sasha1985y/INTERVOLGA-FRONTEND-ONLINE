import { useState } from "react";
import {
    Order,
    Product,
    Plant,
    Warehouse
} from "../intervolga-types";

/**
 * @description Хранит все состояния приложения.
 * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_
 * @date 20/09/2024/00:33:50
 * @example const useAppState = () => {
                const [cachedOrders, setCachedOrders] = useState<Order[] | null>(null);// Состояние для хранения кэша заказов
                const [orders, setOrders] = useState<Order[]>([]);//Состояние массива заказов
                const [cachedProducts, setCachedProducts] = useState<Product[] | null>(null);// Состояние для хранения кэша продуктов
                const [products, setProducts] = useState<Product[]>([]);//Состояние массива продуктов
                const [cachedPlants, setCachedPlants] = useState<Plant[] | null>(null);// Состояние для хранения кэша заводов
                const [plants, setPlants] = useState<Plant[]>([]);//Состояние массива заводов
                const [cachedWarehouses, setCachedWarehouses] = useState<Warehouse[] | null>(null);// Состояние для хранения кэша складов
                const [warehouses, setWarehouses] = useState<Warehouse[]>([]);//Состояние массива складов
                const [openEditBasketUI, setOpenEditBasketUI] = useState(false);//Состояние отрисовки корзины
                const [openViewOrdersUI, setOpenViewOrdersUI] = useState(false);//Состояние отрисовки заказов
                const [openFormUI, setOpenFormUI] = useState(true);//Состояние отрисовки формы
                const [formCompleted, setFormCompleted] = useState(false);//Состояние заполненности формы
                const [error, setError] = useState<string | null>(null);//Состояние ошибки
            
   @default     const [formData, setFormData] = useState({//Начальное состояние полей формы
                    firstName: '',
                    address: '',
                    goods: '',
                    cost: '',
                    quantity: '0',
                    total: ''
                });
            
   @default     const [validity, setValidity] = useState({//Начальное Булево состояние полей формы
                    firstName: false,
                    address: false,
                    goods: false,
                    cost: false,
                    quantity: false,
                    total: false
                });

                return {
                    cachedOrders,
                    setCachedOrders,
                    orders,
                    setOrders,
                    cachedProducts,
                    setCachedProducts,
                    products,
                    setProducts,
                    cachedPlants,
                    setCachedPlants,
                    plants,
                    setPlants,
                    cachedWarehouses,
                    setCachedWarehouses,
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
                    setValidity
                };
 */
export const useAppState = () => {
    const [cachedOrders, setCachedOrders] = useState<Order[] | null>(null);// Состояние для хранения кэша заказов
    const [orders, setOrders] = useState<Order[]>([]);//Состояние массива заказов
    const [cachedProducts, setCachedProducts] = useState<Product[] | null>(null);// Состояние для хранения кэша продуктов
    const [products, setProducts] = useState<Product[]>([]);//Состояние массива продуктов
    const [cachedPlants, setCachedPlants] = useState<Plant[] | null>(null);// Состояние для хранения кэша заводов
    const [plants, setPlants] = useState<Plant[]>([]);//Состояние массива заводов
    const [cachedWarehouses, setCachedWarehouses] = useState<Warehouse[] | null>(null);// Состояние для хранения кэша складов
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);//Состояние массива складов
    const [openEditBasketUI, setOpenEditBasketUI] = useState(false);//Состояние отрисовки корзины
    const [openViewOrdersUI, setOpenViewOrdersUI] = useState(false);//Состояние отрисовки заказов
    const [openFormUI, setOpenFormUI] = useState(true);//Состояние отрисовки формы
    const [formCompleted, setFormCompleted] = useState(false);//Состояние заполненности формы
    const [error, setError] = useState<string | null>(null);//Состояние ошибки
  
    const [formData, setFormData] = useState({//Начальное состояние полей формы
      firstName: '',
      address: '',
      goods: '',
      cost: '',
      quantity: '0',
      total: ''
    });
  
    const [validity, setValidity] = useState({//Начальное Булево состояние полей формы
      firstName: false,
      address: false,
      goods: false,
      cost: false,
      quantity: false,
      total: false
    });

    return {
        cachedOrders,
        setCachedOrders,
        orders,
        setOrders,
        cachedProducts,
        setCachedProducts,
        products,
        setProducts,
        cachedPlants,
        setCachedPlants,
        plants,
        setPlants,
        cachedWarehouses,
        setCachedWarehouses,
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
        setValidity
    };
};
