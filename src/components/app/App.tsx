import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Todo imports
//import { Todo } from "../../types";
import styles from './app.module.css';

//Intervolga imports
import { Product } from "../../intervolga-types";
import { LabelKeys } from "../../intervolga-types";

function App() {
  //Todo states
  // const [todos, setTodos] = useState<Todo[]>([])
  // const [name, setName] = useState("")
  // const [editStatus, setEditStatus] = useState(false)
  // const [editName, setEditName] = useState('')
  // const [editTodo, setEditTodo] = useState<Todo | null>(null); 
  // const [openEditUI, setOpenEditUI] = useState(false)

  
  // const addTodoHandler = (): void => {
  //   const postTodo = async() => {
  //     const postTodoData = {
  //       name: name
  //     }
  //     const {data} = await axios.post('https://cd80175.tw1.ru/todos/', postTodoData)
  //     setTodos([...todos, data])
  //     setName("")
  //   }
  //   postTodo()
  // }

  // const editTodoHandler = async () => {
  //   if(editTodo) {
  //     const updatedTodo = {
  //       ...editTodo,
  //       name: editName, // Используем измененное имя
  //       status: editStatus, // Используем измененный статус
  //     };
  
  //     try {
  //       // Отправляем обновленные данные на сервер
  //       const { data } = await axios.patch(`https://cd80175.tw1.ru/todos/${editTodo.id}/`, updatedTodo);
  
  //       // Обновляем состояние todos с обновленным todo
  //       const updatedTodos = todos.map((todo) => (
  //         todo.id === editTodo.id ? data : todo // Предполагается, что сервер возвращает обновленный объект todo
  //       ));
  
  //       setTodos(updatedTodos);
        
  //       // Сброс состояний после успешного обновления
  //       setEditTodo(null);
  //       setEditName('');
  //       setEditStatus(false);
  //       //setOpenEditUI(false);
  //     } catch (error) {
  //       console.error("Ошибка обновления todo:", error);
  //       // Здесь может быть обработка ошибки, например, показ уведомления пользователю
  //     }
  //   }
  // };
  
  
  
  // const deleteTodoHandler = (id: number): void => {
  //   const deleteTodo = async() => {
  //     await axios.delete(`https://cd80175.tw1.ru/todos/${id}/`)
  //     const newTodos = todos.filter((todo) => todo.id !== id)
  //     setTodos(newTodos)
  //   }
  //   deleteTodo()
  // }

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     const {data} = await axios.get<Todo[]>('https://cd80175.tw1.ru/todos/')
  //     setTodos(data)
  //   }
  //   fetchTodos();
  // }, [])

  //Intervolga states
  // Состояние для хранения кэша продуктов
  const [cachedProducts, setCachedProducts] = useState<Product[] | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [openEditBasketUI, setOpenEditBasketUI] = useState(false);
  const [openViewOrdersUI, setOpenViewOrdersUI] = useState(false);
  const [openFormUI, setOpenFormUI] = useState(true);
  const [formCompleted, setFormCompleted] = useState(false);

  const goBascketHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (Object.values(validity).every(v => v === true)) {
      setOpenEditBasketUI(true);
      setOpenViewOrdersUI(false);
      setOpenFormUI(false);
    } else {
      const invalidFields = Object.entries(validity)
        .filter(([, value]) => value === false) // Фильтруем только те поля, где значение false
        .map(([key]) => labelTexts[key as LabelKeys]); // Извлекаем тексты меток

      alert(`${invalidFields.length > 1 ? "Поля :" : "Поле"} "${invalidFields.join('", "')}" ${invalidFields.length > 1 ?  "- не заполнены" : "- не заполнено"}`);
    }
  }

  const goOpenViewOrdersHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenViewOrdersUI(true);
    setOpenEditBasketUI(false);
    setOpenFormUI(false);
  }

  const goOpenFormHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenFormUI(true);
    setOpenEditBasketUI(false);
    setOpenViewOrdersUI(false);
  }

  const [formData, setFormData] = useState({
    firstName: '',
    address: '',
    goods: '',
    cost: '',
    quantity: '0',
    total: ''
  });

  //Intervolga utils
  const [validity, setValidity] = useState({
    firstName: false,
    address: false,
    goods: false,
    cost: false,
    quantity: false,
    total: false
  });

  const labelTexts: Record<LabelKeys, string> = {
    firstName: "Ваше имя",
    address: "Адрес доставки",
    goods: "Товары",
    cost: "Цена за еденицу",
    quantity: "Количество товара",
    total: "Цена за всё"
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newValidity = {
      firstName: !!formData.firstName,
      address: !!formData.address,
      goods: !!formData.goods,
      cost: /^\s*\d+(\.\d{2})?$/.test(formData.cost), // Проверяем формат подачи цены с бэка. Например 500.00
      quantity: !!formData.quantity && /^\s*[1-9]\d*$/.test(formData.quantity),
      total: !!formData.total
    };

    setValidity(newValidity);

    if (Object.values(newValidity).every(v => v)) {
      console.log('Form submitted:', formData);
    }
  };
  
  
  useEffect(() => {
    const quantityValue = Number(formData.quantity);
    const selectedProduct = products.find(product => product.id === Number(formData.goods));
    const costValue = Number(selectedProduct?.price || 0);
  
    if (formData.goods && quantityValue > 0 && formData.cost) {
      const newTotal = costValue * quantityValue;
      setFormData(prev => ({ ...prev, total: String(newTotal) }));
    } else {
      setFormData(prev => ({ ...prev, total: '' }));
    }

    const fetchProducts = async () => {
      // Проверьте, есть ли уже кэшированные данные
      if (!cachedProducts) {
        const { data } = await axios.get<Product[]>('http://127.0.0.1:8000/products/');
        setProducts(data);
        setCachedProducts(data); // Сохраните в кэш
      } else {
        setProducts(cachedProducts); // Используйте кэшированные данные
      }
    };
    
    if (Object.values(validity).every(v => v === true)) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }

    fetchProducts();
  }, [formData.goods, formData.quantity, formData.cost, products, cachedProducts, validity]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
  };

  return (
    <>
      <div className={`${styles.app_background_window} min-vh-100 ${openViewOrdersUI ? "" : "d-none"}`}>
        <div className={`${styles.app_background_sky} row opacity-75 min-vh-100`}>
          <div className="d-flex justify-content-center hstack gap-2">
            <h1 className={`${styles.app_h1} text-center text-light`}>Галерея заказов</h1>
            <div className={styles.applogo}></div>
          </div>
          <div className="col-md-4">
            <ul>
              <li className={`${openFormUI ? "" : "d-none"}`}><span>openFormUI</span></li>
              <li className={`${openEditBasketUI ? "" : "d-none"}`}><span>openEditBasketUI</span></li>
              <li className={`${openViewOrdersUI ? "" : "d-none"}`}><span>openViewOrdersUI</span></li>
            </ul>
          </div>
          <div className="col">
            <button onClick={goBascketHandler} className={`btn ${formCompleted ? "btn-success" : "btn-secondary"}`} type="button">К корзине</button>
          </div>
          <div className="col">
            <button onClick={goOpenFormHandler} className="btn btn-primary" type="button">К форме</button>
          </div>
          <div className="col-md-5"></div>

          {/* <div className="h-2 d-inline-block"></div>
          <h1 className={`${styles.app_h1} text-light h-2 d-inline-block text-center`}>Редактор задачи</h1>
          <div className="col-md-2"></div>
          <ul className="col bg-body-secondary rounded-4">
            <li className="d-flex justify-content-end hstack gap-2">
              <i onClick={() => setOpenEditUI(false)} className="text-danger fs-5 fa-solid fa-xmark"></i>
            </li>
            <li className="input-group">
              <textarea className="form-control" maxLength={200} value={editName} onChange={(e) => setEditName(e.target.value)}></textarea>
            </li>
            <li className="d-flex justify-content-start hstack gap-2">
              <i>статус</i>
              < input type="checkbox" checked={!editStatus} onChange={() => setEditStatus(!editStatus)}/>
            </li>
            <li className="text-center">
              <button onClick={() => editTodo && editTodoHandler()} className="btn btn-success">обновить</button>
            </li>
          </ul>
          <div className="col-md-2"></div>
          <div className="h-5 d-inline-block"></div> */}
        </div>
      </div>
      <div className={`${styles.app_background_window} min-vh-100 position-relative ${!openViewOrdersUI ? "" : "d-none"}`}>
        <div className={`${styles.app_background_sky} row opacity-75 min-vh-100`}>
          <div className="d-flex justify-content-center hstack gap-2">
            <h1 className={`${styles.app_h1} text-center text-light`}>Intervolga marketplace{`${openEditBasketUI ? "(корзина)" : ""}`}</h1>
            <div className={styles.applogo}></div>
          </div>
          {/* <div className="h-5 d-inline-block"></div>
          <div className="d-flex justify-content-center hstack gap-2 p-3">
            <h1 className={`${styles.app_h1} text-center text-light`}>Intervolga marketplace</h1>
            <div className={styles.applogo}></div>
          </div>
          <div className="row input-group input-group-sm mb-3 d-none">
            <div className="col-md-3"></div>
            <input 
              type="text"
              id="myInput" 
              maxLength={200}
              className={`form-control col bg-body-secondary ${name.trim() === "" ? "rounded-pill" : "rounded-start-pill"}`}
              placeholder="Добавьте задачу здесь..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div onClick={addTodoHandler} className={`col-md-1 w-20 bg-body-secondary rounded-end-pill border border-dark-subtle border-3 ${name.trim() === "" ? "invisible" : ""}`}>
              <i className="text-success fa-solid fa-square-plus"></i>
            </div>
            <div className={name.trim() === "" ? "col-md-2" : "col-md-3"}></div>
          </div>
          <div className="h-5 d-inline-block"></div>
          <div className="row d-none">
            <div className="col-md-3"></div>
            <ul className="col d-inline-block list-group">
              {todos?.map((todo: Todo) => {
                const chunkedName = todo.name.match(/.{1,49}/g);
                return (
                  <li key={todo.id} className="col bg-secondary-subtle mb-1 rounded-4 list-group-item">
                    <p className="text-center" onClick={() => {
                      setEditStatus(todo.status)
                      setEditName(todo.name)
                      setEditTodo(todo)
                      //setOpenEditUI(true)
                    }}>
                      <div key={todo.id} className="todo-item">
                        {chunkedName && chunkedName.map((chunk, chunkIndex) => (
                          <span key={chunkIndex}>
                            {chunk}
                            {chunkIndex < chunkedName.length - 1 && <i>&#8211;<br></br></i>}
                          </span>
                        ))}
                      </div>
                    </p>
                    {" "}
                    <div className="row">
                      <span className="col-md-7 text-end text-light-emphasis">{!todo.status ? "выполнена" : "не выполнена"}</span>
                      <i onClick={() => deleteTodoHandler(todo.id)} className="col-md-5 text-end text-danger fs-3 bottom-0 end-0 fa-regular fa-trash-can"></i>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="col-md-3"></div>
          </div> */}

          <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="col-md-1"></div>
            <div className="col-md-3 position-relative">
              <label htmlFor="firstName" className="form-label">Ваше имя</label>
              <input
                type="text"
                className={`form-control ${validity.firstName ? 'is-valid' : 'is-invalid'}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e)}
                required
                readOnly={openEditBasketUI}
              />
              <div className={`${validity.firstName ? 'valid-tooltip' : 'invalid-tooltip'}`}>
                {`${validity.firstName ? 'OK' : 'Пожалуйста введите ваше имя.'}`}
              </div>
            </div>
            <div className="col-md-4 position-relative">
              <label htmlFor="address" className="form-label">Адрес доставки</label>
              <input
                type="text"
                className={`form-control ${validity.address ? 'is-valid' : 'is-invalid'}`}
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="город, улица, номер дома"
                onKeyDown={(e) => handleKeyDown(e)}
                required
                readOnly={openEditBasketUI}
              />
              <div className={`${validity.address ? 'valid-tooltip' : 'invalid-tooltip'}`}>
                {`${validity.address ? 'OK' : 'Пожалуйста укажите адрес доставки.'}`}
              </div>
            </div>
            <div className="col-md-3 position-relative">
              <label htmlFor="" className="form-label">Товары</label>
              <select
                className={`form-select ${validity.goods ? 'is-valid' : 'is-invalid'}`}
                id="goods"
                name="goods"
                value={formData.goods}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e)}
                required
                disabled={openEditBasketUI}
              >
                <option>{''}</option>
                {cachedProducts?.map((product: Product) => {
                  return(
                    <option key={product.id} value={product.id}>{product.name}</option>
                  )
                })}
              </select>
              <div className={`${validity.goods ? 'valid-tooltip' : 'invalid-tooltip'}`}>
                {`${validity.goods ? 'OK' : 'Пожалуйста, выберите предмет доставки.'}`}
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="h-5 d-inline-block"></div>
            <div className="col-md-3"></div>
            <div className="col position-relative">
              <label htmlFor="cost" className="form-label">Цена за еденицу</label>
              <input
                type="text"
                className={`form-control ${validity.cost ? 'is-valid' : 'is-invalid'}`}
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e)}
                required
                readOnly
              />
              <div className={`${validity.cost ? 'valid-tooltip' : 'invalid-tooltip'}`}>
                {`${validity.cost ? 'OK' : 'данные не получены.'}`}
              </div>
            </div>
            <div className="col position-relative">
              <label htmlFor="quantity" className="form-label">Количество товара</label>
              <input
                type="number"
                className={`form-control ${validity.quantity ? 'is-valid' : 'is-invalid'}`}
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  // Проверяем, что новое значение не меньше 0
                  if (newValue >= 0) {
                    handleChange(e); // Вызываем основной обработчик изменения
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e)}
                required
                readOnly={openEditBasketUI}
              />
              <div className={`${validity.quantity ? 'valid-tooltip' : 'invalid-tooltip'}`}>
                {`${validity.quantity ? 'OK' : 'введите количество товара.'}`}
              </div>
            </div>
            <div className="col position-relative">
              <label htmlFor="total" className="form-label">Цена за всё</label>
              <input
                type="text"
                className={`form-control ${validity.total ? 'is-valid' : 'is-invalid'}`}
                id="total"
                name="total"
                value={formData.total}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e)}
                required
                readOnly
              />
              <div className={`${validity.total ? 'valid-tooltip' : 'invalid-tooltip'}`}>
                {`${validity.total ? 'OK' : 'данные не получены.'}`}
              </div>
            </div>
            <div className="col-md-3"></div>

            <div className="h-5 d-inline-block">
              <ul>
                <li className={`${openFormUI ? "" : "d-none"}`}><span>openFormUI</span></li>
                <li className={`${openEditBasketUI ? "" : "d-none"}`}><span>openEditBasketUI</span></li>
                <li className={`${openViewOrdersUI ? "" : "d-none"}`}><span>openViewOrdersUI</span></li>
              </ul>
            </div>

            <div className="col-4"></div>
            <div className="col">
              <button onClick={goOpenViewOrdersHandler} className="btn btn-primary" type="button">К заказам</button>
            </div>
            <div className="col">
              <button onClick={openFormUI ? goBascketHandler : goOpenFormHandler} className={`btn ${formCompleted ? "btn-success" : "btn-secondary"}`} type="button">{openFormUI ? "Положить в корзину" : "Назад к форме"}</button>
            </div>
            {/* <div className="col">
              <button onClick={goOpenFormHandler} className="btn btn-primary" type="button">К форме</button>
            </div> */}
            <div className="col-4"></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
