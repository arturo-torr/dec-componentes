// Importado de los módulos necesarios
import RestaurantsManager, {
  Dish,
  Category,
  Allergen,
  Menu,
  Restaurant,
  Coordinate,
} from "./restaurantsmanager.js";

// Importado de cookie
import { getCookie } from "./utils.js";

// Modelo y vista como constantes privadas
const MODEL = Symbol("RestaurantsManagerModel");
const VIEW = Symbol("RestaurantsManagerView");

// Symbol para autenticación y usuario
const AUTH = Symbol("AUTH");
const USER = Symbol("USER");

class RestaurantsManagerController {
  constructor(model, view, auth) {
    this[MODEL] = model;
    this[VIEW] = view;
    this[AUTH] = auth;
    this[USER] = null;

    this.onLoad();
  }

  // Funciones que solo se ejecutan una sola vez
  onLoad = () => {
    fetch("localhost/../data/objects.json")
      .then((response) => response.json())
      .then((data) => {
        const all1 = this[MODEL].createAllergen(
          data["all1"].name,
          RestaurantsManager.Allergen
        );
        const all2 = this[MODEL].createAllergen(
          data["all2"].name,
          RestaurantsManager.Allergen
        );
        const all3 = this[MODEL].createAllergen(
          data["all3"].name,
          RestaurantsManager.Allergen
        );
        const all4 = this[MODEL].createAllergen(
          data["all4"].name,
          RestaurantsManager.Allergen
        );
        const cat1 = this[MODEL].createCategory(
          data["cat1"].name,
          RestaurantsManager.Category
        );
        cat1.description = data["cat1"].description;

        const cat2 = this[MODEL].createCategory(
          data["cat2"].name,
          RestaurantsManager.Category
        );
        cat2.description = data["cat2"].description;
        const cat3 = this[MODEL].createCategory(
          data["cat3"].name,
          RestaurantsManager.Category
        );
        cat3.description = data["cat3"].description;

        const dish1 = this[MODEL].createDish(
          data["dish1"].name,
          RestaurantsManager.Dish
        );
        dish1.ingredients = data["dish1"].ingredients;
        dish1.description = data["dish1"].description;
        dish1.image = data["dish1"].image;

        const dish2 = this[MODEL].createDish(
          data["dish2"].name,
          RestaurantsManager.Dish
        );
        dish2.ingredients = data["dish2"].ingredients;
        dish2.description = data["dish2"].description;
        dish2.image = data["dish2"].image;

        const dish3 = this[MODEL].createDish(
          data["dish3"].name,
          RestaurantsManager.Dish
        );
        dish3.ingredients = data["dish3"].ingredients;
        dish3.description = data["dish3"].description;
        dish3.image = data["dish3"].image;

        const dish4 = this[MODEL].createDish(
          data["dish4"].name,
          RestaurantsManager.Dish
        );
        dish4.ingredients = data["dish4"].ingredients;
        dish4.description = data["dish4"].description;
        dish4.image = data["dish4"].image;

        const dish5 = this[MODEL].createDish(
          data["dish5"].name,
          RestaurantsManager.Dish
        );
        dish5.ingredients = data["dish5"].ingredients;
        dish5.description = data["dish5"].description;
        dish5.image = data["dish5"].image;

        const dish6 = this[MODEL].createDish(
          data["dish6"].name,
          RestaurantsManager.Dish
        );
        dish6.ingredients = data["dish6"].ingredients;
        dish6.description = data["dish6"].description;
        dish6.image = data["dish6"].image;

        const dish7 = this[MODEL].createDish(
          data["dish7"].name,
          RestaurantsManager.Dish
        );
        dish7.ingredients = data["dish7"].ingredients;
        dish7.description = data["dish7"].description;
        dish7.image = data["dish7"].image;

        const dish8 = this[MODEL].createDish(
          data["dish8"].name,
          RestaurantsManager.Dish
        );
        dish8.ingredients = data["dish8"].ingredients;
        dish8.description = data["dish8"].description;
        dish8.image = data["dish8"].image;

        const dish9 = this[MODEL].createDish(
          data["dish9"].name,
          RestaurantsManager.Dish
        );
        dish9.ingredients = data["dish9"].ingredients;
        dish9.description = data["dish9"].description;
        dish9.image = data["dish9"].image;

        const dish10 = this[MODEL].createDish(
          data["dish10"].name,
          RestaurantsManager.Dish
        );
        dish10.ingredients = data["dish10"].ingredients;
        dish10.description = data["dish10"].description;
        dish10.image = data["dish10"].image;

        const dish11 = this[MODEL].createDish(
          data["dish11"].name,
          RestaurantsManager.Dish
        );
        dish11.ingredients = data["dish11"].ingredients;
        dish11.description = data["dish11"].description;
        dish11.image = data["dish11"].image;

        const dish12 = this[MODEL].createDish(
          data["dish12"].name,
          RestaurantsManager.Dish
        );
        dish12.ingredients = data["dish12"].ingredients;
        dish12.description = data["dish12"].description;
        dish12.image = data["dish12"].image;

        this[MODEL].addAllergen(all1, all2, all3, all4);
        this[MODEL].assignAllergenToDish(
          all1,
          dish11,
          dish12,
          dish10,
          dish9,
          dish4,
          dish3,
          dish2
        );
        this[MODEL].assignAllergenToDish(
          all2,
          dish3,
          dish4,
          dish5,
          dish7,
          dish10
        );
        this[MODEL].assignAllergenToDish(all3, dish5, dish6, dish7);
        this[MODEL].assignAllergenToDish(all4, dish2, dish3, dish4);
        // Creación de menús
        let menu1 = this[MODEL].createMenu(
          data["menu1"].name,
          RestaurantsManager.Menu
        );
        let menu2 = this[MODEL].createMenu(
          data["menu2"].name,
          RestaurantsManager.Menu
        );
        let menu3 = this[MODEL].createMenu(
          data["menu3"].name,
          RestaurantsManager.Menu
        );

        // Asignación de platos a categorías y menús
        this[MODEL].assignCategoryToDish(cat1, dish2, dish3, dish4, dish5);
        this[MODEL].assignCategoryToDish(cat2, dish1, dish6, dish7, dish8);
        this[MODEL].assignCategoryToDish(cat3, dish9, dish10, dish11, dish12);
        this[MODEL].assignDishToMenu(menu1, dish2, dish1, dish9);
        this[MODEL].assignDishToMenu(menu2, dish3, dish6, dish10);
        this[MODEL].assignDishToMenu(menu3, dish4, dish7, dish11);
        // Creación de restaurantes
        let res1 = this[MODEL].createRestaurant(
          data["res1"].name,
          RestaurantsManager.Restaurant
        );
        res1.description = data["res1"].description;
        res1.location = new Coordinate(
          data["res1"].location.Coordinate.latitude,
          data["res1"].location.Coordinate.longitude
        );

        let res2 = this[MODEL].createRestaurant(
          data["res2"].name,
          RestaurantsManager.Restaurant
        );
        res2.description = data["res2"].description;
        res2.location = new Coordinate(
          data["res2"].location.Coordinate.latitude,
          data["res2"].location.Coordinate.longitude
        );
        let res3 = this[MODEL].createRestaurant(
          data["res3"].name,
          RestaurantsManager.Restaurant
        );
        res3.description = data["res3"].description;
        res3.location = new Coordinate(
          data["res3"].location.Coordinate.latitude,
          data["res3"].location.Coordinate.longitude
        );
        this[MODEL].addRestaurant(res1, res2, res3);
      })
      .then(() => {
        this.onInit();
        this[VIEW].bindInit(this.handleInit);
        this.onAddCategory();
        this.onAddCategory();
        this.onAddAllergen();
        this.onAddMenu();
        this.onAddRestaurant();
        this.onAddClose();

        // Busca si hemos aceptado el mensaje de cookies, es decir, hay una cookie creada
        if (getCookie("acceptedCookieMessage") !== "true") {
          this[VIEW].showCookiesMessage();
        }

        // Recupera si hay un usuario que ha mantenido la sesión
        const userCookie = getCookie("activeUser");
        // Si existe, recibe el usuario
        if (userCookie) {
          const user = this[AUTH].getUser(userCookie);
          // Asigna el usuario y abre una sesión con ese usuario
          if (user) {
            this[USER] = user;
            this.onOpenSession();
          }
        } else {
          this.onCloseSession();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Funciones que se ejecutan al clickear inicio
  onInit = () => {
    this[VIEW].showCategories(this[MODEL].categories);
    this[VIEW].showRandomDishes(this[MODEL].getRandomDishes());
    this[VIEW].bindDishesCategoryList(this.handleDishesCategoryList);
    this[VIEW].bindDishesRandomList(this.handleDishesRandomList);
  };

  handleInit = () => {
    this.onInit();
  };

  // Mostrado de categorías en navegación y manejador
  onAddCategory = () => {
    this[VIEW].showCategoriesInMenu(this[MODEL].categories);
    this[VIEW].bindDishesCategoryListInMenu(this.handleDishesCategoryList);
  };

  // Mostrado de alérgenos en navegación y manejador
  onAddAllergen = () => {
    this[VIEW].showAllergensInMenu(this[MODEL].allergens);
    this[VIEW].bindDishesAllergenListInMenu(this.handleDishesAllergenList);
  };

  // Mostrado de menú en navegación y manejador
  onAddMenu = () => {
    this[VIEW].showMenusInNav(this[MODEL].menus);
    this[VIEW].bindMenuListInNav(this.handleDishesMenuList);
  };

  // Mostrado de restaurantes en navegación y manejador
  onAddRestaurant = () => {
    this[VIEW].showRestaurantsInMenu(this[MODEL].restaurants);
    this[VIEW].bindRestaurantListInMenu(this.handleRestaurantsMenuList);
  };

  // Mostrado de enlace para cerrar ventanas y manejador
  onAddClose = () => {
    this[VIEW].showCloseWindowsInMenu();
    this[VIEW].bindCloseWindowsInMenu(this.handleCloseWindowsInMenu);
  };

  /** -------------- PRACTICA 8 ----------------- */

  // Muestra las acciones necesarias si hay una sesión de usuario, mostrando el menú de administración
  onOpenSession() {
    this.onInit();
    this[VIEW].initHistory();
    // Muestra el perfil de usuario
    this[VIEW].showAuthUserProfile(this[USER]);
    // Enlazador para cerrar la sesión
    this[VIEW].bindCloseSession(this.handleCloseSession);
    this[VIEW].showAdminMenu();
    this[VIEW].bindAdminMenu(
      this.handleNewDishForm,
      this.handleRemoveDishForm,
      this.handleNewCategoryForm,
      this.handleRemoveCategoryForm,
      this.handleNewRestaurantForm,
      this.handleUpdAssignForm,
      this.handleUpdAllergenForm,
      this.handleChangePositionsForm,
      this.handleQueryFavourites,
      this.handleBackup
    );
  }

  // Muestra las acciones pertinentes al cerrar una sesión de usuario
  onCloseSession() {
    this[USER] = null;
    this[VIEW].deleteUserCookie();
    this[VIEW].showIdentificationLink();
    this[VIEW].bindIdentificationLink(this.handleLoginForm);
    this[VIEW].removeAdminMenu();
  }

  // Manejador para mostrar el formulario de login
  handleLoginForm = () => {
    this[VIEW].showLogin();
    this[VIEW].bindLogin(this.handleLogin);
  };

  // El argumento remember es para mantener la sesión si el usuario ha clickeado "Recuérdame"
  handleLogin = (username, password, remember) => {
    // Lo valida, y si es correcto, tendremos un objeto usuario
    if (this[AUTH].validateUser(username, password)) {
      // Lo guardamos para poder reutilizarlo cuando queramos
      this[USER] = this[AUTH].getUser(username);
      this.onOpenSession();
      if (remember) {
        this[VIEW].setUserCookie(this[USER]);
      }
      // SI no existe, mostramos un mensaje de que el usuario es incorrecto
    } else {
      this[VIEW].showInvalidUserMessage();
    }
  };

  // Manejador para el cerrado de sesión
  handleCloseSession = () => {
    this.onCloseSession();
    this.onInit();
    this[VIEW].initHistory();
  };

  // Manejador que permite añadir a localStorage los platos favoritos que selecciona un suuario
  handleAddToFavorites = (dish) => {
    let done;
    let error;
    if (!this[USER]) {
      this[VIEW].showNeedsLoginModal();
    } else {
      dish = this[MODEL].createDish(dish, RestaurantsManager.Dish);
      if (!localStorage.getItem(dish.name)) {
        done = true;
        localStorage.setItem(dish.name, JSON.stringify(dish.toJSON()));
      } else {
        done = false;
      }
      this[VIEW].showAddFavoritesModal(done, dish, error);
    }
  };

  // Manejador que muestra los platos favoritos de un usuario
  handleQueryFavourites = () => {
    this[VIEW].showFavouritesDishes(this[MODEL].dishes, this[USER]);
  };

  // Manejador que muestra el formulario de backup
  handleBackup = () => {
    this[VIEW].showBackupForm();
    this[VIEW].bindBackup(this.handleBackUpToJSON);
  };

  // Manejador que gestiona la promesa para crear un fichero JSON de backup
  handleBackUpToJSON = () => {
    let formData = new FormData();

    // Objetos literales que llevarán individualmente las categorías, alérgenos... y sus propiedades
    const allCategories = {};
    const allAllergens = {};
    const allDishes = {};
    const allMenus = {};
    const allRestaurants = {};

    // Recorre las categorías y en el objeto literal crea un clave-valor con el Nombre y el JSON correspondiente
    for (const category of this[MODEL].categories) {
      allCategories[category.category.name] = category.category.toJSON();
    }
    // Recorre los alérgenos y en el objeto literal crea un clave-valor con el Nombre y el JSON correspondiente
    for (const all of this[MODEL].allergens) {
      allAllergens[all.allergen.name] = all.allergen.toJSON();
    }
    // Recorre los menús y en el objeto literal crea un clave-valor con el Nombre y el JSON correspondiente
    for (const menu of this[MODEL].menus) {
      allMenus[menu.menu.name] = menu.menu.toJSON();
    }
    // Recorre los platos y en el objeto literal crea un clave-valor con el Nombre y el JSON correspondiente
    for (const dish of this[MODEL].dishes) {
      allDishes[dish.dish.name] = dish.dish.toJSON();
    }

    // Recorre los restaurantes y en el objeto literal crea un clave-valor con el Nombre y el JSON correspondiente
    for (const rest of this[MODEL].restaurants) {
      allRestaurants[rest.restaurant.name] = rest.restaurant.toJSON();
    }

    // Agregación de los arrays con los objetos obtenidos al FormData
    formData.append("jsonCategories", JSON.stringify(allCategories));
    formData.append("jsonAllergens", JSON.stringify(allAllergens));
    formData.append("jsonMenus", JSON.stringify(allMenus));
    formData.append("jsonDishes", JSON.stringify(allDishes));
    formData.append("jsonRestaurants", JSON.stringify(allRestaurants));

    // Realización de la comunicación asíncrona llamando al php que gestiona los arrays para poder crear el JSON
    fetch("backupaction.php", {
      method: "post",
      body: formData,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.error("Error al procesar la respuesta:", err);
      });
  };

  // Manejador que permite cerrar la ventana y eliminarlo de las referencias guardadas
  handleCloseWindowsInMenu = (window, dish) => {
    window.close();
    this[VIEW].dishWindows.delete(dish);
    // Resetea los ID que se asignan a las ventanas
    this[VIEW].id = 0;
  };

  // Manejador para mostrar fichas de los platos aleatorios
  handleDishesRandomList = (name) => {
    const dish = this[MODEL].createDish(name, RestaurantsManager.Dish);
    this.handleShowDish(dish.name);
  };

  // Manejador de los platos de una categoría en la barra de navegación o en la sección central
  handleDishesCategoryList = (name) => {
    const category = this[MODEL].createCategory(
      name,
      RestaurantsManager.Category
    );
    this[VIEW].listDishes(
      this[MODEL].getDishesInCategory(category),
      category.name,
      "Categorías"
    );
    this[VIEW].bindShowDish(this.handleShowDish);
  };

  // Manejador para los alérgenos en la barra de navegación
  handleDishesAllergenList = (name) => {
    const allergen = this[MODEL].createAllergen(
      name,
      RestaurantsManager.Allergen
    );
    this[VIEW].listDishes(
      this[MODEL].getDishesWithAllergen(allergen),
      allergen.name,
      "Alérgenos"
    );
    this[VIEW].bindShowDish(this.handleShowDish);
  };

  // Manejador para platos de un menú en barra de navegación
  handleDishesMenuList = (name) => {
    const menu = this[MODEL].createMenu(name, RestaurantsManager.Menu);
    this[VIEW].listDishes(
      this[MODEL].getDishesInMenu(menu),
      menu.name,
      "Menús"
    );
    this[VIEW].bindShowDish(this.handleShowDish);
  };

  // Manejador para mostrar el restaurante desde la barra de navegación
  handleRestaurantsMenuList = (name) => {
    const rest = this[MODEL].createRestaurant(
      name,
      RestaurantsManager.Restaurant
    );
    this[VIEW].showRestaurant(rest, "Restaurantes");
  };

  // Manejador para el mostrado de platos
  handleShowDish = (name) => {
    try {
      const dish = this[MODEL].createDish(name, RestaurantsManager.Dish);
      this[VIEW].showDish(dish);
      this[VIEW].bindShowProductInNewWindow(this.handleShowDishInNewWindow);
      this[VIEW].bindAddToFavorites(this.handleAddToFavorites);
    } catch (error) {
      this[VIEW].showDish(
        null,
        "No existe este plato actualmente en la página."
      );
    }
  };

  // Manejador para el mostrado de platos en una nueva ventana
  handleShowDishInNewWindow = (name, newWindow) => {
    try {
      const dish = this[MODEL].createDish(name, RestaurantsManager.Dish);
      this[VIEW].showDishInNewWindow(dish, newWindow);
    } catch (error) {
      this[VIEW].showDishInNewWindow(
        null,
        "No existe este producto en la página."
      );
    }
  };

  /** --- PRACTICA 7 -- MANEJADORES --- */

  // Formulario de creación de plato
  handleNewDishForm = () => {
    this[VIEW].showNewDishForm(this[MODEL].categories, this[MODEL].allergens);
    this[VIEW].bindNewDishForm(this.handleCreateDish);
  };

  // Formulario de eliminación de plato
  handleRemoveDishForm = () => {
    this[VIEW].showRemoveDishForm(this[MODEL].dishes);
    this[VIEW].bindRemoveDishForm(this.handleRemoveDish);
  };

  // Formulario de nueva categoría
  handleNewCategoryForm = () => {
    this[VIEW].showNewCategoryForm();
    this[VIEW].bindNewCategoryForm(this.handleCreateCategory);
  };

  // Formulario de eliminar categoría
  handleRemoveCategoryForm = () => {
    this[VIEW].showRemoveCategoryForm(this[MODEL].categories);
    this[VIEW].bindRemoveCategoryForm(this.handleRemoveCategory);
  };

  // Formulario de nuvo restaurante
  handleNewRestaurantForm = () => {
    this[VIEW].showNewRestaurantForm();
    this[VIEW].bindNewRestaurantForm(this.handleCreateRestaurant);
  };

  // Formulario de actualizar asignaciones a menu
  handleUpdAssignForm = () => {
    this[VIEW].showUpdateAssignForm(this[MODEL].dishes, this[MODEL].menus);
    this[VIEW].bindUpdateAssignForm(this.handleUpdateMenus);
  };

  // Formulario de actualizar alérgenos
  handleUpdAllergenForm = () => {
    this[VIEW].showUpdateAllergenForm(
      this[MODEL].dishes,
      this[MODEL].allergens
    );
    this[VIEW].bindUpdateAllergenForm(this.handleUpdateAllergens);
  };

  // Formularios de cambiar las posiciones (uno para seleccionar menu, otro se lanza en evento change)
  handleChangePositionsForm = () => {
    this[VIEW].showChangePositionsForm(this[MODEL].menus);
    this[VIEW].bindChangePositionsSelects(this.handleChangePositionsMenu);
  };

  handleChangePositionsMenu = (menu) => {
    const men = this[MODEL].createMenu(menu, RestaurantsManager.Menu);
    this[VIEW].showChangePositionsList(this[MODEL].getDishesInMenu(men));
    this[VIEW].bindChangePositionsForm(this.handleChangePositions);
  };

  // Manejador que recibe los datos del formulario de creación de platos
  handleCreateDish = (name, ingredients, category, allergens, image, desc) => {
    // Crea el plato
    const dish = this[MODEL].createDish(name, RestaurantsManager.Dish);
    // Le asigna valores si los ha recibido
    if (desc) dish.description = desc;
    if (image) dish.image = image;
    if (ingredients) dish.ingredients = ingredients.split(",");

    let cat;
    if (category) {
      // Recupera el objeto de categoría
      cat = this[MODEL].createCategory(category, RestaurantsManager.Category);
    }

    let done;
    let error;
    try {
      // Añade el plato al array
      this[MODEL].addDish(dish);

      // Si ha recibido una categoría, se la asigna al plato
      if (cat) this[MODEL].assignCategoryToDish(cat, dish);

      // Si ha recibido alérgenos, los recorre y los va asignando al plato
      for (let all of allergens) {
        let auxAll = this[MODEL].createAllergen(
          all,
          RestaurantsManager.Allergen
        );
        this[MODEL].assignAllergenToDish(auxAll, dish);
      }

      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewDishModal(done, dish, error);
  };

  // Manejador que recibe el nombre de un plato y procede a su borrado
  handleRemoveDish = (name) => {
    let done;
    let error;
    let dish;

    try {
      dish = this[MODEL].createDish(name, RestaurantsManager.Dish);
      this[MODEL].removeDish(dish);
      done = true;
      // Vuelve a invocar al formulario para que aparezca actualizado
      this.handleRemoveDishForm();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showRemoveDishModal(done, dish, error);
  };

  // Recibe el nombre y descripción (si la tiene) de una categoría, la crea y actualiza los menús
  // Posteriormente lanza el modal
  handleCreateCategory = (name, desc) => {
    const cat = this[MODEL].createCategory(name, RestaurantsManager.Category);
    if (cat) cat.description = desc;

    let done;
    let error;
    try {
      this[MODEL].addCategory(cat);
      // Actualiza el menú para que se muestre la nueva categoría creada
      this.onAddCategory();
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewCategoryModal(done, cat, error);
  };

  // Manejador que recibe el nombre de una categoría y procede a su borrado
  handleRemoveCategory = (name) => {
    let done;
    let error;
    let cat;

    try {
      cat = this[MODEL].createDish(name, RestaurantsManager.Category);
      this[MODEL].removeCategory(cat);
      done = true;
      // Vuelve a invocar al formulario para que aparezca actualizado
      this.handleRemoveCategoryForm();
      // Actualiza el menú para no mostrar la categoría borrada
      this.onAddCategory();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showRemoveCategoryModal(done, cat, error);
  };

  // Recibe el nombre, descripción y coordenadas de un restaurante, lo crea y actualiza los menús
  // Posteriormente lanza el modal
  handleCreateRestaurant = (name, desc, lat, long) => {
    const rest = this[MODEL].createRestaurant(
      name,
      RestaurantsManager.Restaurant
    );
    if (rest) rest.description = desc;
    if (lat && long) rest.location = new Coordinate(lat, long);

    let done;
    let error;
    try {
      this[MODEL].addRestaurant(rest);
      // Actualiza el menú para que se muestre el nuevo restaurante creado
      this.onAddRestaurant();
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewRestaurantModal(done, rest, error);
  };

  // Manejador que recibe el nombre del menú, los platos y la opción (Asignar o desasignar) plara realizar
  // una modificación sobre los platos que están asignados a un menú
  handleUpdateMenus = (menuName, dishes, option) => {
    let auxDish;
    let done;
    let error;

    const menu = this[MODEL].createMenu(menuName, RestaurantsManager.Menu);

    try {
      if (option === "ncAssign") {
        for (const dish of dishes) {
          auxDish = this[MODEL].createDish(dish, RestaurantsManager.Dish);
          this[MODEL].assignDishToMenu(menu, auxDish);
        }
      } else {
        for (const dish of dishes) {
          auxDish = this[MODEL].createDish(dish, RestaurantsManager.Dish);
          this[MODEL].desassignDishToMenu(menu, auxDish);
        }
      }
      done = true;
    } catch (exception) {
      // Si se intenta añadir un plato a un menú y ya están asignados, o desasignar uno que no se corresponde, lanzará el error
      done = false;
      error = exception;
    }

    this[VIEW].showNewUpdateAssignModal(done, menu, dishes, option, error);
  };

  // Manejador que recoge el nombre del alérgeno, los platos seleccionados y el radio (añadir o eliminar) para
  // asignar o desasignar alérgenos a los platos
  handleUpdateAllergens = (allName, dishes, option) => {
    let auxDish;
    let done;
    let error;

    const allergen = this[MODEL].createAllergen(
      allName,
      RestaurantsManager.Allergen
    );

    try {
      if (option === "ncAdd") {
        for (const dish of dishes) {
          auxDish = this[MODEL].createDish(dish, RestaurantsManager.Dish);
          this[MODEL].assignAllergenToDish(allergen, auxDish);
        }
      } else {
        for (const dish of dishes) {
          auxDish = this[MODEL].createDish(dish, RestaurantsManager.Dish);
          this[MODEL].desassignAllergenToDish(allergen, auxDish);
        }
      }
      done = true;
    } catch (exception) {
      // Si se intenta añadir un plato a un alérgeno y ya están asignados, o desasignar uno que no se corresponde, lanzará el error
      done = false;
      error = exception;
    }

    this[VIEW].showNewUpdateAllergenModal(
      done,
      allergen,
      dishes,
      option,
      error
    );
  };

  handleChangePositions = (menu, firstDish, secondDish) => {
    const men = this[MODEL].createMenu(menu, RestaurantsManager.Menu);
    const fDish = this[MODEL].createDish(firstDish, RestaurantsManager.Dish);
    const sDish = this[MODEL].createDish(secondDish, RestaurantsManager.Dish);

    let done;
    let error;
    try {
      this[MODEL].changeDishesPositionsInMenu(men, fDish, sDish);
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showChangePositionsModal(done, men, fDish, sDish, error);
  };

  /** --- FIN PRACTICA 7 --- */
}

export default RestaurantsManagerController;
