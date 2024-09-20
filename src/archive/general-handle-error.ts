import axios from 'axios';
/**
   * @description Общий обработчик ошибок для функций fetchFromPrimarySource, fetchFromBackupSource, fetchFromLocalSource.
   * @date 17/09/2024/21:33:50
   * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
   * @param {unknown} err
   * @param {() => Promise<void>} sourceFunc
   * @param {React.Dispatch<React.SetStateAction<string | null>>} setError
   * @example const generalHandleError = async (
                err: unknown,
                sourceFunc: () => Promise<void>,
                setError: React.Dispatch<React.SetStateAction<string | null>>,
            ) => {
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                    await sourceFunc(); // Отправляем запрос в следующий источник
                } else {
                    setError('Неизвестная ошибка');
                }
            };
   */
export const generalHandleError = async (
    err: unknown,
    sourceFunc: () => Promise<void>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
    if (axios.isAxiosError(err)) {
        setError(err.message);
        await sourceFunc(); // Отправляем запрос в следующий источник
    } else {
        setError('Неизвестная ошибка');
    }
};