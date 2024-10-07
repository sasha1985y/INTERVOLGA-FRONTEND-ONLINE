import { Product } from "../intervolga-types";

//import { calculateTotal } from "../api";

/**
 * @description Обработчик определяет поведение полей в ответ на пользовательский ввод. Содержит настройки валидации к каждому полю.
 * @author Kuyantsev Aleksandr https://dixie-34.ru https://vk.com/karkade2021 https://t.me/d_e_p_L_o_y_1
 * @date 11/09/2024/19:02:05
 * @param {(React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)} e
 * @param formData: {
        firstName: string;
        address: string;
        goods: string;
        cost: string;
        quantity: string;
        total: string;
    }
    @param setFormData: React.Dispatch<React.SetStateAction<{
        firstName: string;
        address: string;
        goods: string;
        cost: string;
        quantity: string;
        total: string;
    }>>
    @param setValidity: React.Dispatch<React.SetStateAction<{
        firstName: boolean;
        address: boolean;
        goods: boolean;
        cost: boolean;
        quantity: boolean;
        total: boolean;
    }>>
    @example const handleChange = (
                e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
                products: Product[],
                formData: {
                    firstName: string;
                    address: string;
                    goods: string;
                    cost: string;
                    quantity: string;
                    total: string;
                    suppliers: string;
                },
                setFormData: React.Dispatch<React.SetStateAction<{
                    firstName: string;
                    address: string;
                    goods: string;
                    cost: string;
                    quantity: string;
                    total: string;
                    suppliers: string;
                }>>,
                setValidity: React.Dispatch<React.SetStateAction<{
                    firstName: boolean;
                    address: boolean;
                    goods: boolean;
                    cost: boolean;
                    quantity: boolean;
                    total: boolean;
                    suppliers: boolean;
                }>>
            ) => {
                const { name, value } = e.target;
                const isValidCost = String(products.find(product => product.id === Number(value))?.price || '');
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                    ...(name === 'goods' && {
                        cost: isValidCost,
                    }),
                    ...(name === 'quantity' && {
                        total: String((products.find(product => product.id === Number(formData.goods))?.price || 0) * Number(value)),
                    }),
                }));

                if (name === 'goods') {
                    const selectedProduct = products.find(product => product.id === Number(value));
                    const isValidCost = selectedProduct && selectedProduct.price > 0;
                    setValidity((prevValidity) => ({
                        ...prevValidity,
                        goods: value !== '' ? true : false,
                        cost: isValidCost ? true : false,
                        total: selectedProduct && prevValidity.quantity ? true : false
                    }));
                }

                if (name === 'cost') {
                    const costPattern = /^\s*\d+(\.\d{2})?$/; // Проверяем формат 500.00
                    const isValidCost = value !== '' && costPattern.test(value)
                    setValidity((prevValidity) => ({
                        ...prevValidity,
                        cost: isValidCost,
                    }));
                }

                if (name === 'quantity') {
                    const quantityPattern = /^\s*[1-9]\d*$/;
                    const isValidQuantity = quantityPattern.test(value);
                    const isNotNullQuantity = value !== '0';
                    setValidity((prevValidity) => ({
                        ...prevValidity,
                        quantity: isValidQuantity,
                        total: isNotNullQuantity && prevValidity.goods ? true : false
                    }));
                }

                if (name === 'total') {
                    setValidity((prevValidity) => ({
                        ...prevValidity,
                        total: value !== '' ? true : false// Проверяем, что поле total не пустое
                    }));
                }

                if (name === 'address') {
                    const addressPattern = /^[A-Za-zА-Яа-яЁё\s]+,\s*[A-Za-zА-Яа-яЁё\s]+\s*\d+$/;
                    setValidity((prevValidity) => ({
                        ...prevValidity,
                        address: addressPattern.test(value)
                    }));
                }

                if (name === 'firstName') {
                    const firstNamePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;
                    setValidity((prevValidity) => ({
                        ...prevValidity,
                        firstName: firstNamePattern.test(value)
                    }));
                }

                if (name === 'suppliers') {
                    setValidity((prevValidity) => ({
                        ...prevValidity,
                        suppliers: value !== '' ? true : false
                    }));
                }
            };
 */
export const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    products: Product[],
    formData: {
        firstName: string;
        address: string;
        goods: string;
        cost: string;
        quantity: string;
        total: string;
        suppliers: string;
    },
    setFormData: React.Dispatch<React.SetStateAction<{
        firstName: string;
        address: string;
        goods: string;
        cost: string;
        quantity: string;
        total: string;
        suppliers: string;
    }>>,
    setValidity: React.Dispatch<React.SetStateAction<{
        firstName: boolean;
        address: boolean;
        goods: boolean;
        cost: boolean;
        quantity: boolean;
        total: boolean;
        suppliers: boolean;
    }>>,
    //orders: Order[],
    //setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
    const { name, value } = e.target;
    const isValidCost = String(products.find(product => product.id === Number(value))?.price || '');
    setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === 'goods' && {
            cost: isValidCost,
        }),
        ...(name === 'quantity' && {
            total: String((products.find(product => product.id === Number(formData.goods))?.price || 0) * Number(value)),
        }),
    }));

    if (name === 'goods') {
        const selectedProduct = products.find(product => product.id === Number(value));
        const isValidCost = selectedProduct && selectedProduct.price > 0;
        setValidity((prevValidity) => ({
            ...prevValidity,
            goods: value !== '' ? true : false,
            cost: isValidCost ? true : false,
            total: selectedProduct && prevValidity.quantity ? true : false
        }));
    }

    if (name === 'cost') {
        const costPattern = /^\s*\d+(\.\d{2})?$/; // Проверяем формат 500.00
        const isValidCost = value !== '' && costPattern.test(value)
        setValidity((prevValidity) => ({
            ...prevValidity,
            cost: isValidCost,
        }));
    }

    if (name === 'quantity') {
        const quantityPattern = /^\s*[1-9]\d*$/;
        const isValidQuantity = quantityPattern.test(value);
        const isNotNullQuantity = value !== '0';
        setValidity((prevValidity) => ({
            ...prevValidity,
            quantity: isValidQuantity,
            total: isNotNullQuantity && prevValidity.goods ? true : false
        }));
    }
    
    if (name === 'total' /*&& ["quantity", "cost", "address", "suppliers"].includes(name)*/) {
        //calculateTotal(formData, setFormData, orders);
        setValidity((prevValidity) => ({
            ...prevValidity,
            total: value !== '' ? true : false// Проверяем, что поле total не пустое
        }));
    }

    if (name === 'address') {
        const addressPattern = /^[A-Za-zА-Яа-яЁё\s]+,\s*[A-Za-zА-Яа-яЁё\s]+\s*\d+$/;
        setValidity((prevValidity) => ({
            ...prevValidity,
            address: addressPattern.test(value)
        }));
    }

    if (name === 'firstName') {
        const firstNamePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;
        setValidity((prevValidity) => ({
            ...prevValidity,
            firstName: firstNamePattern.test(value)
        }));
    }

    if (name === 'suppliers') {
        setValidity((prevValidity) => ({
            ...prevValidity,
            suppliers: value !== '' ? true : false
        }));
    }

    // if (["quantity", "cost", "address", "suppliers"].includes(name)) {
    //     calculateTotal(formData, setFormData, setError, orders);
    // }
};
