//Библиотеки
import { Dadata } from 'dadata';
import geolib from 'geolib';

//Типы
import {
    Plant,
    Warehouse,
    FormData
} from '../intervolga-types';

export const calculateDelivery = async (
    formData: FormData,
    plants: Plant[],
    warehouses: Warehouse[]
) => {
    const { address, suppliers } = formData;
    const token = "cb4ae96b2662504477e55948719e0e7d00c8a688"
    const secret = "74f6f7e4757c5cef91aa4fb80b34765574c67f83"
    const dadata = new Dadata(token, secret);
    
    try {
        if(address && suppliers) {

            const response = await dadata.clean('address', address);
            const addressCoordinates = {
                latitude: response[0].geo_lat,
                longitude: response[0].geo_lon
            };
            
            const avgSpeed = 60; // средняя скорость в км/ч
            let checkedSupplier;
    
            const plantsOption: HTMLInputElement | null = document.querySelector('plants');
            const warehousesOption: HTMLInputElement | null = document.querySelector('warehouses');
    
            if (plantsOption?.checked) {
                checkedSupplier = plants.find(supplier => supplier.address === suppliers);
            } else if (warehousesOption?.checked) {
                checkedSupplier = warehouses.find(supplier => supplier.address === suppliers);
            } else {
                alert('Непредвиденная ошибка');
                return;
            }
    
            if (checkedSupplier) {
                const supplierCoordinates = {
                    latitude: parseFloat(checkedSupplier.geo_lat),
                    longitude: parseFloat(checkedSupplier.geo_lon)
                };
                return calculateDistanceAndTime(addressCoordinates, supplierCoordinates, avgSpeed);
            }
        }
        
    } catch (error) {
        console.error("Ошибка получения данных с сервиса Dadata:", error);
    }
};

const calculateDistanceAndTime = (addressCoordinates: { latitude: number; longitude: number }, supplierCoordinates: { latitude: number; longitude: number }, avgSpeed: number) => {
    const distance = geolib.getDistance(addressCoordinates, supplierCoordinates);
    const distanceInKm = distance / 1000;
    const timeHours = distanceInKm / avgSpeed;
    return { distance, time: timeHours };
};
