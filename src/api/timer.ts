//Функции
import { useEffect, useState } from 'react';

/**
   * @description Счётчик времени, оставшегося до полуночи по Москве.
   * @date 19/09/2024/01:18:05
   * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
   * @example const Timer = () => {
                const [timeRemaining, setTimeRemaining] = useState('');

                const calculateTimeRemaining = () => {
                    const now = new Date();
                    const moscowTime = now.toLocaleString("en-US", { timeZone: "Europe/Moscow" });
                    const midnight = new Date(new Date(moscowTime).setHours(24, 0, 0, 0));
                    const diff = midnight.getTime() - now.getTime();

                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                    setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                };

                useEffect(() => {
                    calculateTimeRemaining(); // Инициализация

                    const intervalId = setInterval(() => {
                        calculateTimeRemaining();
                    }, 1000); // Обновление каждую секунду

                    return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
                }, []);

                return (
                    timeRemaining
                );
            };
   */
export const Timer = () => {
    const [timeRemaining, setTimeRemaining] = useState('');

    const calculateTimeRemaining = () => {
        const now = new Date();
        const moscowTime = now.toLocaleString("en-US", { timeZone: "Europe/Moscow" });
        const midnight = new Date(new Date(moscowTime).setHours(24, 0, 0, 0));
        const diff = midnight.getTime() - now.getTime();

        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    useEffect(() => {
        calculateTimeRemaining(); // Инициализация

        const intervalId = setInterval(() => {
            calculateTimeRemaining();
        }, 1000); // Обновление каждую секунду

        return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
    }, []);

    return (
        timeRemaining
    );
};