/**
 * @description Отрисовка соответствующего списка <option></option> в зависимости от выбранной радиокнопки.
 * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
 * @date 20/09/2024/00:33:50
 * @example const handleRadioChange = (
                e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
                setSelectedOption: React.Dispatch<React.SetStateAction<string>>
            ) => {
                setSelectedOption(e.target.id === 'flexRadioDefault1' ? 'plants' : 'warehouses');
            };
 */ 
export const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>
) => {
    setSelectedOption(e.target.id === 'flexRadioDefault1' ? 'plants' : 'warehouses');
};