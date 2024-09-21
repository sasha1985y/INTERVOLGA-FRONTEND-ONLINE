//Библиотеки
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Стили
import styles from './app.module.css';

//Типы
import {
  Product
} from "../../intervolga-types";

//Функции
import { fetchSafeServerOrders } from "../../api/index";
import { Timer } from "../../api/timer";

//Обработчики
import {
  goBascketHandler,
  goOpenViewOrdersHandler,
  goOpenFormHandler,
  handleKeyDown,
  handleChange
} from "../../handlers";

//Константы

//Хуки
import { useAppState } from '../../hooks/useappstate.hook';

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
  
  const {
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
    setValidity
  } = useAppState();

  /**
   * @description Обработчик события нажатия кнопки Submit
   * @date 11/09/2024/17:41:35
   * @param {React.FormEvent<HTMLFormElement>} e
   * @template {Order}
   * понять двойное отрицание можно на примере:
   * if (x != null)
   *  return true;
   * else
   *  return false;
   * или просто return !!x;
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();//отменяем действие по умолчанию чтобы не было перезагрузки страницы
    const newValidity = {
      firstName: !!formData.firstName,//Если firstName не пустое (например, не undefined, null или пустая строка), то результат будет true, иначе — false.
      address: !!formData.address,//Если адрес указан, то будет true, иначе — false.
      goods: !!formData.goods,//Если есть значение, то будет true, иначе — false.
      cost: /^\s*\d+(\.\d{2})?$/.test(formData.cost), // Проверяем формат подачи цены с бэка. Например 500.00
      quantity: !!formData.quantity && /^\s*[1-9]\d*$/.test(formData.quantity),// Проверяем формат количества - все цифры кроме 0
      total: !!formData.total//Проверяет, заполнено ли поле "Итого". Если указано значение, то будет true, иначе — false.
    };

    setValidity(newValidity);
    //Если все поля валидны (все значения в newValidity равны true),
    // тогда форма может быть отправлена, и данные будут выведены в консоль.
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
    
    if (Object.values(validity).every(v => v === true)) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }

    const intervalId = setInterval(() => {
      fetchSafeServerOrders(
        cashedOrders,
        cashedPlants,
        cashedWarehouses,
        cashedProducts,
        setError,
        setOrders,
        setCashedOrders,
        setWarehouses,
        setCashedWarehouses,
        setPlants,
        setCashedPlants,
        setProducts,
        setCashedProducts,
      );
    }, 30000); // Проверяем каждые 30 секунд

    // Очищаем интервал, когда компонент размонтируется
    return () => clearInterval(intervalId);

  }, [
    formData.goods,
    formData.quantity,
    formData.cost,
    orders,
    cashedOrders,
    products,
    cashedProducts,
    plants,
    cashedPlants,
    warehouses,
    cashedWarehouses,
    validity,
    setFormData,
    setProducts,
    setCashedProducts,
    setError,
    setPlants,
    setCashedPlants,
    setWarehouses,
    setCashedWarehouses,
    setFormCompleted,
    setOrders,
    setCashedOrders
  ]
  );

  return (
    <>
      <div className={`${styles.app_background_window} min-vh-100 ${openViewOrdersUI ? "" : "d-none"}`}>
        <div className={`${styles.app_background_sky} row opacity-75 min-vh-100`}>
          <div className="position-relative">
            <p className={`${styles.app_dadata_msg} message fs-4 text-warning bg-dark text-center`}></p>
            <span className={`${styles.app_dadata_msg} invisible timer fs-4 text-dark text-end position-absolute bottom-60 end-50`}>{Timer()} ...(Но это неточно)</span>
          </div>
          <div className="d-flex justify-content-center hstack gap-2">
            <h1 className={`${styles.app_h1} text-center text-light`}>Галерея заказов</h1>
            <div className={styles.applogo}></div>
          </div>
          {/*'Карусель'*/}
          <div id="carouselExampleFade" className="carousel slide carousel-fade z-0">
            <div className="carousel-inner">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={order.id}>
                    <img src={`https://via.placeholder.com/800x400?text=Order+${order.id}`} className="d-block min-vh-100 opacity-0" alt={`Order ${order.id}`} />
                    <div className="rounded bg-primary text-light fs-6 carousel-caption d-none d-md-block">
                      {order.carts.map((cart) => (
                        <>
                          <div className="container text-center" key={cart.id}>
                            <div className="row row-cols-2 row-cols-lg-6 g-1 g-lg-1">
                              <div className="col">
                                <div className="text-info bg-black rounded-start">Название</div>
                              </div>
                              <div className="col">
                                <div className="text-info bg-black bg-gradient">Количество</div>
                              </div>
                              <div className="col">
                                <div className="text-info bg-dark">Цена/шт.</div>
                              </div>
                              <div className="col">
                                <div className="text-info bg-dark bg-gradient">Поставщик</div>
                              </div>
                              <div className="col">
                                <div className="text-info bg-secondary">Время доставки</div>
                              </div>
                              <div className="col">
                                <div className="text-info bg-secondary bg-gradient rounded-end">цена с доставкой</div>
                              </div>
                              {cart.cart_products.map((product) => (
                                <>
                                  <div className="col">
                                    <div className={
                                      product.product_name === "двутавр" ? "bg-info rounded-start" :
                                      product.product_name === "уголок" ? "bg-warning rounded-start" :
                                      product.product_name === "швеллер" ? "bg-success rounded-start" :
                                      "bg-dark rounded-start"
                                    }>
                                      {product.product_name}
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="bg-secondary">{product.quantity}</div>
                                  </div>
                                  <div className="col">
                                    <div className="bg-dark bg-gradient">{product.product_price}</div>
                                  </div>
                                  <div className="col">
                                    <div className="bg-dark">
                                      {/*product.plant_name !== null && typeof product.plant_name === 'string' && product.plant_name.length >= 10 ? "" : "Завод "*/}
                                      {product.warehouse_dealer !== null ? product.warehouse_dealer : product.plant_name}
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="bg-black bg-gradient">{product.deliveries[0].estimated_time} ч.</div>
                                  </div>
                                  <div className="col">
                                    <div className="bg-black rounded-end">{product.deliveries[0].delivery_cost}</div>
                                  </div>
                                </>
                              ))}
                            </div>
                            <ul className="list-group list-group-horizontal">
                              <li className="list-group-item">ID: {order.id}</li>
                              <li className="list-group-item">Заказчик: {order.name}</li>
                              <li className="list-group-item">Общая стоимость: {cart.general_cost}</li>
                              <li className="list-group-item">Создано: {cart.created_at}</li>
                            </ul>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="row">
                  <div className="col-5"></div>
                  <div className="col spinner-grow text-light" role="status"></div>
                  <div className="col spinner-grow text-primary" role="status"></div>
                  <div className="col spinner-grow text-danger" role="status"></div>
                  <div className="col-5"></div>
                </div>
              )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="col-md-4">
            <ul>
              <li className={`${openFormUI ? "" : "d-none"}`}><span>openFormUI</span></li>
              <li className={`${openEditBasketUI ? "" : "d-none"}`}><span>openEditBasketUI</span></li>
              <li className={`${openViewOrdersUI ? "" : "d-none"}`}><span>openViewOrdersUI</span></li>
            </ul>
          </div>
          <div className="col">
            <button
            onClick={(e) => {
              goBascketHandler(
                e,
                setOpenEditBasketUI,
                setOpenViewOrdersUI,
                setOpenFormUI,
                validity
              );
            }}
            className={`btn ${formCompleted ? "btn-success" : "btn-secondary"}`}
            type="button">К корзине</button>
          </div>
          <div className="col">
            <button onClick={(e) => {
              goOpenFormHandler(
                e,
                setOpenEditBasketUI,
                setOpenViewOrdersUI,
                setOpenFormUI,
              );
            }} className="btn btn-primary" type="button">К форме</button>
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
                onChange={(e) => handleChange(
                  e,
                  products,
                  formData,
                  setFormData,
                  setValidity
                )}
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
                onChange={(e) => handleChange(
                  e,
                  products,
                  formData,
                  setFormData,
                  setValidity
                )}
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
                onChange={(e) => handleChange(
                  e,
                  products,
                  formData,
                  setFormData,
                  setValidity
                )}
                onKeyDown={(e) => handleKeyDown(e)}
                required
                disabled={openEditBasketUI}
              >
                <option className="spinner-border text-warning" >{error ? 'Сервер недоступен' : ''}</option>
                {cashedProducts?.map((product: Product) => {
                  return(
                    <option key={product.id} value={product.id}>{product.name}</option>
                  )
                })}
              </select>
              {
                error ? 
                <div className="spinner-border text-danger" role="status"></div>
                  :
                <div className={`${validity.goods ? 'valid-tooltip' : 'invalid-tooltip'}`}>
                  {`${validity.goods ? 'OK' : 'Пожалуйста, выберите предмет доставки.'}`}
                </div>
              }
            </div>
            <div className="col-md-1"></div>
            <div className="h-5 d-inline-block"></div>
            <div className={`${openFormUI ? "col-md-3" : "col-md-1"}`}></div>
            <div className="col position-relative">
              <label htmlFor="cost" className="form-label">Цена за еденицу</label>
              <input
                type="text"
                className={`form-control ${validity.cost ? 'is-valid' : 'is-invalid'}`}
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={(e) => handleChange(
                  e,
                  products,
                  formData,
                  setFormData,
                  setValidity
                )}
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
                    handleChange(
                      e,
                      products,
                      formData,
                      setFormData,
                      setValidity
                    ); // Вызываем основной обработчик изменения
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
                onChange={(e) => handleChange(
                  e,
                  products,
                  formData,
                  setFormData,
                  setValidity
                )}
                onKeyDown={(e) => handleKeyDown(e)}
                required
                readOnly
              />
              <div className={`${validity.total ? 'valid-tooltip' : 'invalid-tooltip'}`}>
                {`${validity.total ? 'OK' : 'данные не получены.'}`}
              </div>
            </div>
            <div className={`col-md-2 ${openEditBasketUI ? "" : "d-none"}`}>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    заводы
                  </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    склады
                  </label>
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
              <button onClick={(e) => {
                goOpenViewOrdersHandler(
                  e,
                  setOpenEditBasketUI,
                  setOpenViewOrdersUI,
                  setOpenFormUI
                );
              }} className="btn btn-primary" type="button">К заказам</button>
            </div>
            <div className="col">
              <button
                onClick={(e) => openFormUI
                  ? goBascketHandler(e, setOpenEditBasketUI, setOpenViewOrdersUI, setOpenFormUI, validity)
                  : goOpenFormHandler(e, setOpenEditBasketUI, setOpenViewOrdersUI, setOpenFormUI)}
                className={`btn ${formCompleted ? "btn-success" : "btn-secondary"}`}
                type="button"
              >
                {openFormUI ? "Положить в корзину" : "Назад к форме"}
              </button>
            </div>
            <div className="col-4"></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
