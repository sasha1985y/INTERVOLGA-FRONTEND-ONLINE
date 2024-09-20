/**
  * @description Обработчик события нажатия кнопки Enter
  * @date 11/09/2024/17:26:11
  * @param {(React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>)} e
  */
export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {//Если кнопка события Enter
        e.preventDefault();//отменяем действие по умолчанию чтобы не было перезагрузки страницы
    }//Чтобы пользователь не мог изменять состояние невалидно заполненных полей просто нажав Enter
};