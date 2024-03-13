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
        // Recoge los datos de los alérgenos del JSON
        let arrAllergens = data.Allergens;
        // Introduce en el modelo los alérgenos que se recogen
        for (const all of arrAllergens) {
          let allergen = this[MODEL].createAllergen(
            all.name,
            RestaurantsManager.Allergen
          );
          this[MODEL].addAllergen(allergen);
        }
        // Recoge los datos de categorías del JSON
        let arrCategories = data.Categories;
        // Introduce en el modelo las categorías que se recogen
        for (const cat of arrCategories) {
          let category = this[MODEL].createCategory(
            cat.name,
            RestaurantsManager.Category
          );
          category.description = cat.description;
          this[MODEL].addCategory(category);
        }
        // Recoge los datos de menus del JSON
        let arrMenus = data.Menus;
        // Introduce en el modelo los menús que se recogen
        for (const men of arrMenus) {
          let menu = this[MODEL].createMenu(men.name, RestaurantsManager.Menu);
          this[MODEL].addMenu(menu);
        }

        // Recoge los datos de restaurantes del JSON
        let arrRestaurants = data.Restaurants;
        // Introduce en el modelo los restaurantes que se recogen
        for (const res of arrRestaurants) {
          let restaurant = this[MODEL].createRestaurant(
            res.name,
            RestaurantsManager.Restaurant
          );
          restaurant.description = res.description;
          restaurant.location = new Coordinate(
            res.location.Coordinate.latitude,
            res.location.Coordinate.longitude
          );
          this[MODEL].addRestaurant(restaurant);
        }

        // Recoge los datos de platos del JSON
        let arrDishes = data.Dishes;
        // Introduce en el modelo los platos que se recogen
        for (const d of arrDishes) {
          let dish = this[MODEL].createDish(d.name, RestaurantsManager.Dish);
          dish.ingredients = d.ingredients;
          dish.description = d.description;
          dish.image = d.image;
          this[MODEL].addDish(dish);

          // Si el plato tiene alérgenos, los recorre y los va integrando en el modelo
          if (d.allergen) {
            for (const allergen of d.allergen) {
              let all = this[MODEL].createAllergen(
                allergen,
                RestaurantsManager.Allergen
              );
              this[MODEL].assignAllergenToDish(all, dish);
            }
          }

          // Recoge una categoría, y si el plato la tiene, se la asigna
          let cat = this[MODEL].createCategory(
            d.category,
            RestaurantsManager.Category
          );
          if (cat) this[MODEL].assignCategoryToDish(cat, dish);

          // Recoge un menú, y si el plato lo tiene, se lo asigna
          if (d.menu) {
            let men = this[MODEL].createMenu(d.menu, RestaurantsManager.Menu);
            this[MODEL].assignDishToMenu(men, dish);
          }
        }
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
    // Muestra en el menú el enlace para mostrar el mapa con sus restaurantes y sus popups
    this[VIEW].showLocationInMenu();
    this[VIEW].bindLocation(this.handleLocationInMenu);
  };

  // Manejador que invoca al método para la vista del mapa
  handleLocationInMenu = () => {
    this[VIEW].showLocations(this[MODEL].restaurants);
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
