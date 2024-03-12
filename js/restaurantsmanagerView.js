import {
  newDishValidation,
  newCategoryValidation,
  newRestaurantValidation,
  newUpdateAssignValidation,
  newUpdateAllergenValidation,
  newChangePositionsValidation,
} from "./validation.js";

import { setCookie } from "./utils.js";
// Symbol dónde se introducirá la vista de RestaurantManager
const EXECUTE_HANDLER = Symbol("executeHandler");

class RestaurantsManagerView {
  constructor() {
    this.initzone = document.getElementById("init_zone");
    this.centralzone = document.getElementById("central_zone");
    this.menu = document.querySelector(".navbar");
    this.breadcrumb = document.querySelector(".breadcrumb");
    this.dishWindows = new Map();
    this.id = 0;
  }

  // Recibe la función manejadora del Controller, los argumentos en un array,
  // la cadena que permite seleccionar el objeto contenedor de la Vista, el objeto
  // con los datos de restauración del estado, la url y el objeto de evento
  // para poder cancelar la acción por defecto
  [EXECUTE_HANDLER](
    handler,
    handlerArguments,
    scrollElement,
    data,
    url,
    event
  ) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  // Función que permite visualizar platos en la zona inicial del HTML
  showRandomDishes(dishes) {
    if (this.initzone.children.length > 0) {
      this.initzone.children[0].remove();
    }
    // Creamos un nuevo div y le asignamos un id y las clases pertinentes
    const container = document.createElement("div");
    container.id = "random-list";
    container.classList.add("row", "mx-auto", "text-center");
    // Dentro del div ponemos una cabecera
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green bg__black my-3">Nuestros platos</h1>`
    );
    // Recorremos el array con los platos y le damos el formato necesario
    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-sm-4 col-lg-4 col-md-4 col-xl-4 my-1">
          <a
            class="text--green"
            data-dish="${dish.dish.name}"
            href="#single-dish">
            <div>
              <img
                alt="${dish.dish.title}"
                src="${dish.dish.image}"
                class="img-fluid rounded mb-4">
            </div>
            <div>
              <h3>${dish.dish.name}</h3>
              <div>${dish.dish.description}</div>
            </div>
          </a>
        </div>`
      );
    }
    // Insertamos el contenedor con el formato de platos en el html
    this.initzone.append(container);
  }

  // Función que permite imprimir en el HTML las categorías
  showCategories(categories) {
    this.centralzone.replaceChildren();

    // Crea un elemento div, se le asigna un id y las clases necesarias
    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("row", "mx-auto", "text-center");
    // Se inserta una cabecera dentro del div creado
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green bg__black mt-5">Nuestras categorías</h1>`
    );
    // Recorremos las categorías y le damos un formato visible para el HTML
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-sm-4 col-lg-4 col-md-4 col-xl-4 bg__black my-3">
          <a class="text--green" data-category="${category.category.name}" href="#dish-list">
            <div class="border--green rounded p-3">
              <h3>${category.category.name}</h3>
              <div>${category.category.description}</div>
            </div>
          </a>
        </div>`
      );
    }
    // Inserta en el HTML el contenedor que hemos creado
    this.centralzone.append(container);
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con las categorías
  showCategoriesInMenu(categories) {
    const navCats = document.getElementById("navCats");
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li class="hover-menu"><a data-category="${category.category.name}" class="dropdown-item fw-bold" href="#dish-list">${category.category.name}</a></li>`
      );
    }
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los alérgenos
  showAllergensInMenu(allergens) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class=" dropdown-toggle"
        href="#"
        id="navAllergens"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Alérgenos
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos los alérgenos y se insertarán dentro del desplegable
    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-allergen="${allergen.allergen.name}"
            class="dropdown-item"
            href="#dish-list"
          >
            ${allergen.allergen.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.menu.append(div);
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los menús registrados
  showMenusInNav(menus) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class=" dropdown-toggle"
        href="#"
        id="navMenus"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Menús
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos los menús y se insertarán dentro del desplegable
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-menu="${menu.menu.name}"
            class="dropdown-item"
            href="#dish-list"
          >
            ${menu.menu.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.menu.append(div);
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los restaurantes registrados
  showRestaurantsInMenu(restaurants) {
    const navRests = document.getElementById("navRests");
    const container = navRests.nextElementSibling;
    container.replaceChildren();
    for (const rest of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li class="hover-menu"><a data-rest="${rest.restaurant.name}" class="dropdown-item fw-bold" href="#restaurant">${rest.restaurant.name}</a></li>`
      );
    }
  }

  // Función que permite mostrar una tarjeta personalizada con la información de cada restaurante
  showRestaurant(res, page) {
    // Creación de las migas de pan, seleccionando el <ol> que las contiene y posteriormente sus <li>
    let ol = this.breadcrumb.closest("ol");
    let elements = ol.querySelectorAll("li");
    // Lo recorremos y eliminamos aquello que no sea el Inicio para limpiar en cada llamada las migas de pan
    for (const element of elements) {
      if (element !== ol.firstElementChild) element.remove();
    }
    // Elimina el atributo de aria-current
    ol.firstElementChild.removeAttribute("aria-current");
    // Creamos un elemento para el restaurante y le damos los estilos pertinentes
    let pageLi = document.createElement("li");
    pageLi.classList.add("breadcrumb-item", "text--green");
    pageLi.textContent = page;
    ol.appendChild(pageLi);

    // Creamos un li, le damos estilos y lo agregamos
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.ariaCurrent = "page";
    li.textContent = res.name;
    ol.append(li);

    this.centralzone.replaceChildren();
    // Crea el contenedor y le añade las clases
    const container = document.createElement("div");
    container.classList.add("container", "my-5");
    // Si se obtiene el plato correctamente, se le otorga un id y se da formato en HTML
    if (res) {
      container.id = "restaurant";
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row">
          <div class="col-12">
            <div class="card bg__grey border--green">
              <div class="row align-items-center">
                <div class="col-xl-12 text-center">
                  <div class="p-4">
                    <div class="mb-5">
                      <h2 class="text-uppercase text--green fw-bold fst-italic">${res.name}</h2>
                    </div>
                    <div class="mb-5">
                      <h5 class="text-uppercase text--green fw-bold">Ubicación ${res.name}</h5>
                      <p class="text--green">${res.location}</p>
                    </div>
                    <div class="mb-1">
                      <h6 class="text-uppercase text--green fw-bold">Descripción</h6>
                      <p class="text--green">${res.description}</p>
                    </div>
                    <div class="cart mt-3 align-items-center">
                      <button
                        data-name="${res.name}"
                        class="newfood__content__button text-uppercase mr-2 px-4"
                      >
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
      // Le da una cabecera justo al principio
      container.insertAdjacentHTML(
        "afterbegin",
        `<h1 class="text--green my-3">Ficha de restaurante</h1>`
      );
      this.centralzone.append(container);
    }
  }

  // Función que permite listar los platos
  listDishes(dishes, title, page) {
    // Creación de las migas de pan, seleccionando el <ol> que las contiene y posteriormente sus <li>
    let ol = this.breadcrumb.closest("ol");
    let elements = ol.querySelectorAll("li");

    // Lo recorremos y eliminamos aquello que no sea el Inicio para limpiar en cada llamada las migas de pan
    for (const element of elements) {
      if (element !== ol.firstElementChild) element.remove();
    }
    // Elimina el atributo de aria-current
    ol.firstElementChild.removeAttribute("aria-current");
    // Creamos un elemento para la categoría, alérgeno o menú y le damos los estilos pertinentes
    let pageLi = document.createElement("li");
    pageLi.classList.add("breadcrumb-item", "text--green");
    pageLi.textContent = page;
    // Lo introducimos en el ol
    ol.appendChild(pageLi);

    // Creamos un li, le damos estilos y lo agregamos
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.ariaCurrent = "page";
    li.textContent = title;
    ol.append(li);
    // Borra la zona central
    this.centralzone.replaceChildren();

    // Crea un elemento, le asigna el id y las clases pertinentes
    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("container", "my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    // Recorremos el array de platos
    for (const dish of dishes) {
      // Se crea un nuevo div, le damos formato con los platos
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card bg__black">
            <a data-dish="${dish.dish.name}" href="#single-dish" class="text--green text-center">
              <img class="img-fluid" src="${dish.dish.image}">
              <figcaption class="my-3">${dish.dish.name}</figcaption>
            </a>
        </figure>`
      );
      // Insertamos el div creado
      container.children[0].append(div);
    }
    // Le da una cabecera justo al principio indicando el nombre de la categoría, alérgeno, menú...
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="text--green my-3">${title}</h1>`
    );
    this.centralzone.append(container);
  }

  // Función que permite mostrar una tarjeta personalizada con la información de cada plato
  showDish(dish, message) {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    // Creamos un elemento con el nombre del plato y lo agrega a las migas de pan
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = dish.name;
    ol.appendChild(li);
    this.centralzone.replaceChildren();
    // Crea el contenedor y le añade las clases
    const container = document.createElement("div");
    container.classList.add("container", "my-5");
    // Si se obtiene el plato correctamente, se le otorga un id y se da formato en HTML
    if (dish) {
      container.id = "single-dish";
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row">
          <div class="col-12">
            <div class="card bg__grey border--green">
              <div class="row align-items-center">
                <div class="col-xl-6">
                  <div class="text-center p-4">
                    <img class="img-fluid rounded" src="${dish.image}" />
                  </div>
                </div>
                <div class="col-xl-6 text-center">
                  <div class="p-4">
                    <div class="mt-4 mb-3">
                      <h2 class="text-uppercase text--green fw-bold fst-italic">
                        ${dish.name}
                      </h2>
                    </div>
                    <div class="mt-4 mb-3">
                      <h6 class="text-uppercase text--green fw-bold">
                        Ingredientes
                      </h6>
                      <p class="text--green">${dish.stringIngredients}</p>
                    </div>
                    <div class="mt-5">
                      <h6 class="text-uppercase text--green fw-bold">
                        Descripción
                      </h6>
                      <p class="text--green">${dish.description}</p>
                    </div>
                    <div class="cart mt-4 align-items-center">
                      <button id="b-favorites"
                        data-dish="${dish.name}"
                        class="newfood__content__button text-uppercase mr-2 px-4"
                      >
                        Añadir a favoritos
                      </button>
               <button id="b-open"
                        data-dish="${dish.name}"
                        class="newfood__content__button text-uppercase mr-2 px-4"
                      >
                        Abrir en nueva ventana
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
      // Si no se encuentra el plato, lanza un mensaje de error
    } else {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center text--green">${message}</div>`
      );
    }
    this.centralzone.append(container);
  }

  // Enlaza con el controlador para mandarle el plato favorito seleccionado
  bindAddToFavorites(handler) {
    // Coge el menú para cerrar las ventanas
    const bFav = document.getElementById("b-favorites");
    // Cuando se haga click, se cierran aquellas que estén abiertas
    bFav.addEventListener("click", function (event) {
      handler(this.dataset.dish);
    });
  }

  // Función a la que pasamos un plato y la nueva ventana para mostrarlas
  showDishInNewWindow(dish, newWindow, message) {
    // Recoge el main y el header de dish.html y los limia
    const main = newWindow.document.querySelector("main");
    const header = newWindow.document.querySelector("header");
    main.replaceChildren();
    header.replaceChildren();
    // Formato para header
    header.classList.add("bg__grey", "p-3");

    // Crea un nuevo contenedor al que se le pasarán elementos si recoge un plato
    let container;

    if (dish) {
      // Formato de la nueva ventana con el plato correspondiente
      newWindow.document.title = `${dish.name} - ${dish.description}`;
      header.insertAdjacentHTML(
        "beforeend",
        `<h1 data-name="${dish.name}" class="text--green">${dish.name} - ${dish.description}</h1>`
      );
      container = newWindow.document.createElement("div");
      container.id = "single-dish";
      container.classList.add("container", "mt-5", "mb-5");
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row">
          <div class="col-12">
            <div class="card bg__grey border--green">
              <div class="row align-items-center">
                <div class="col-xl-6">
                  <div class="text-center p-4">
                    <img class="img-fluid rounded" src="${dish.image}" />
                  </div>
                </div>
                <div class="col-xl-6 text-center">
                  <div class="p-4">
                    <div class="mt-4 mb-3">
                      <h2 class="text-uppercase text--green fw-bold fst-italic">
                        ${dish.name}
                      </h2>
                    </div>
                    <div class="mt-4 mb-3">
                      <h6 class="text-uppercase text--green fw-bold">
                        Ingredientes
                      </h6>
                      <p class="text--green">${dish.stringIngredients}</p>
                    </div>
                    <div class="mt-5">
                      <h6 class="text-uppercase text--green fw-bold">
                        Descripción
                      </h6>
                      <p class="text--green">${dish.description}</p>
                    </div>
                    <div class="cart mt-4 align-items-center">
                      <button
                        data-dish="${dish.name}"
                        class="newfood__content__button text-uppercase mr-2 px-4"
                      >
                        Descubrir ahora
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
      container.insertAdjacentHTML(
        "beforeend",
        '<button class="newfood__content__button text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button>'
      );
      main.append(container);
      // Muestra mensaje de error si no se ha encontrado el plato
    } else {
      container = document.createElement("div");
      container.classList.add("container", "mt-5", "mb-5");
      container.classList.add("mt-5");
      container.classList.add("mb-5");
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">${message}</div>`
      );
    }
  }

  // Función que muestra en el menú de navegación un enlace para poder cerras las ventanas abiertas
  showCloseWindowsInMenu() {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "navbar__menu");
    // Le insertamos el HTML necesario
    div.insertAdjacentHTML(
      "beforeend",
      `<a href="#"
        id="b-close"
        role="button"
        aria-expanded="false">
        Cerrar ventanas
      </a>`
    );
    this.menu.append(div);
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con las categorías
  showAdminMenu() {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
          class=" dropdown-toggle"
          href="#"
          id="navAdministration"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          KAB Administración
        </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const subContainer = document.createElement("div");
    subContainer.classList.add("dropdown-menu");
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="newDish" class="dropdown-item text--green fw-bold" href="#new-dish">Crear plato</a>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="delDish" class="dropdown-item text--green fw-bold" href="#del-dish">Eliminar plato</a>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="updAssign" class="dropdown-item text--green fw-bold" href="#upd-assign">Modificar asignación</a></li>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="changePositions" class="dropdown-item text--green fw-bold" href="#change-positions">Cambiar posiciones</a>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="updAllergen" class="dropdown-item text--green fw-bold" href="#upd-allergen">Modificar alérgeno</a><li><hr class="dropdown-divider border--green1"></li>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="newCategory" class="dropdown-item text--green fw-bold" href="#new-category">Añadir categoría</a>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="delCategory" class="dropdown-item text--green fw-bold" href="#del-category">Eliminar categoría</a>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="newRestaurant" class="dropdown-item text--green fw-bold" href="#new-restaurant">Crear restaurante</a>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<li><hr class="dropdown-divider border--green1"></li><a id="queryFavourites" class="dropdown-item text--green fw-bold" href="#query-favourites">Consultar favoritos</a>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<li><hr class="dropdown-divider border--green1"></li><a id="backup" class="dropdown-item text--green fw-bold" href="#do-backup">Realizar backup</a>'
    );

    div.append(subContainer);
    // Inserta el menú de navegación creado
    this.menu.append(div);
  }

  // Muestra el formulario para la creación de un nuevo plato
  showNewDishForm(categories, allergens) {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    // Creamos un elemento con el nombre del plato y lo agrega a las migas de pan
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Crear plato";
    ol.appendChild(li);

    this.initzone.replaceChildren();
    this.centralzone.replaceChildren();

    // Crea un elemento form
    let form = document.createElement("form");
    form.name = "fNewDish";
    form.role = "form";
    form.classList.add("my-3");
    form.insertAdjacentHTML(
      "afterbegin",
      `
    <form class="row g-3" novalidate ></form>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3">
				<label class="form-label" for="ncName">Nombre de plato: *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="fa-solid fa-font"></i></span>
					<input type="text" class="form-control" id="ncName" name="ncName"
						placeholder="Nombre del plato" required>
					<div class="invalid-feedback">Debes introducir el nombre del plato obligatoriamente.</div>
					<div class="valid-feedback">Correcto!</div>
				</div>
			</div>
      <div class="col-md-12 mb-3">
				<label class="form-label" for="ncIngredients">Ingredientes: </label>
				<div class="input-group">
					<span class="input-group-text"><i class="fa-solid fa-carrot"></i></span>
					<input type="text" class="form-control" id="ncIngredients" name="ncIngredients"
						placeholder="Ej: Pimienta,Sal,Patata">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto!</div>
				</div>
			</div>
      <div class="col-md-12 mb-3">
       <label for="ncImage" class="form-label">Foto del plato:</label>
       <input class="form-control form-control-sm" id="ncImage" name="ncImage" type="file">
      </div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ncCategories">Seleccionar categoría: (una opción)</label>
        <div class="input-group">
            <select id="selectCategories" name="ncCategories" class="form-select" size="3" aria-label="Multiple select categorys">
            </select>
        </div>
      </div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ncAllergens">Seleccionar alérgeno: (múltiples opciones)</label>
        <div class="input-group">
            <select id="selectAllergens" name="ncAllergens" class="form-select" size="3" multiple aria-label="Multiple select allergens">
            </select>
        </div>
      </div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ncDescription">Descripción:</label>
       <div class="input-group">
          <span class="input-group-text"><i class="fa-regular fa-rectangle-list"></i></span>
          <input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
         <div class="invalid-feedback"></div>
          <div class="valid-feedback">Correcto.</div>
      </div>
    </div>
    
      <button class=" newfood__content__button" type="submit">Enviar</button>
      <button class=" newfood__content__button" type="reset">Cancelar</button>
    `
    );

    this.centralzone.append(form);

    // Recogemos los select del formulario para hacerlos dinámicos
    let selectCategory = document.getElementById("selectCategories");
    let selectAllergen = document.getElementById("selectAllergens");

    for (const category of categories) {
      selectCategory.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.category.name}">${category.category.name}</option>`
      );
    }

    for (const allergen of allergens) {
      selectAllergen.insertAdjacentHTML(
        "beforeend",
        `<option value="${allergen.allergen.name}">${allergen.allergen.name}</option>`
      );
    }

    // Inserta un título previo al formulario
    let div = document.createElement("div");
    div.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green fw-bold my-5 mx-2">Agregar un nuevo plato</h1>`
    );
    div.id = "new-dish";
    form.insertAdjacentElement("beforebegin", div);
  }

  // Función que vista todos los platos con un botón, permitiendo su posterior eliminación
  showRemoveDishForm(dishes) {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    // Creamos un elemento con el nombre del plato y lo agrega a las migas de pan
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Eliminar plato";
    ol.appendChild(li);

    this.centralzone.replaceChildren();
    this.initzone.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("container", "my-3");
    container.id = "remove-dish";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5 text--green mt-5">Eliminar un plato</h1>'
    );

    const row = document.createElement("div");
    row.classList.add("row");

    for (const dish of dishes) {
      row.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-3 col-md-6 my-3">
          <a data-dish="${dish.dish.name}" href="#dish-list" class="text--green">
            <div>
              <img alt="${dish.dish.name}" src="${dish.dish.image}" class="img-fluid" />
            </div>
            <div>
              <h3 class="text--green fw-bold mt-2">${dish.dish.name}</h3>
              <div class="text--green">${dish.dish.description}</div>
            </div>
            <div>
              <button
                class="newfood__content__button"
                data-dish="${dish.dish.name}"
                type="button"
              >
                Eliminar
              </button>
            </div>
          </a>
        </div>`
      );
    }
    container.append(row);
    this.centralzone.append(container);
  }

  // Muestra el formulario para la creación de una nueva categoría
  showNewCategoryForm() {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    // Creamos un elemento con el nombre del plato y lo agrega a las migas de pan
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Crear categoría";
    ol.appendChild(li);

    this.centralzone.replaceChildren();
    this.initzone.replaceChildren();

    // Crea un elemento form
    let form = document.createElement("form");
    form.name = "fNewCategory";
    form.role = "form";
    form.classList.add("my-5", "py-5");
    form.insertAdjacentHTML(
      "afterbegin",
      `
    <form class="row g-3" novalidate ></form>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3">
				<label class="form-label" for="ncName">Nombre de Categoría: *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="fa-solid fa-font"></i></span>
					<input type="text" class="form-control" id="ncName" name="ncName"
						placeholder="Nombre de la categoría" required>
					<div class="invalid-feedback">Debes introducir el nombre de la categoría obligatoriamente.</div>
					<div class="valid-feedback">Correcto!</div>
				</div>
			</div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ncDescription">Descripción:</label>
       <div class="input-group">
          <span class="input-group-text"><i class="fa-regular fa-rectangle-list"></i></span>
          <input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
         <div class="invalid-feedback"></div>
          <div class="valid-feedback">Correcto.</div>
      </div>
    </div>
    
      <button class=" newfood__content__button" type="submit">Enviar</button>
      <button class=" newfood__content__button" type="reset">Cancelar</button>
    `
    );

    this.centralzone.append(form);

    // Inserta un título previo al formulario
    let div = document.createElement("div");
    div.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green fw-bold my-5 mx-2">Agregar una nueva categoría</h1>`
    );
    div.id = "new-category";
    form.insertAdjacentElement("beforebegin", div);
  }

  // Muestra el formulario para la eliminación de las categorías
  showRemoveCategoryForm(categories) {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    // Creamos un elemento con el nombre y lo agrega a las migas de pan
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Eliminar categoría";
    ol.appendChild(li);

    this.centralzone.replaceChildren();
    this.initzone.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("container", "my-3");
    container.id = "remove-category";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5 text--green mt-5">Eliminar categorías</h1>'
    );

    const row = document.createElement("div");
    row.classList.add("row");

    for (const category of categories) {
      row.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-3 col-md-6 m-3 p-3 border--green rounded">
          <a data-category="${category.category.name}" class="text--green">
            <div>
              <h3 class="text--green fw-bold mt-2">${category.category.name}</h3>
              <div class="text--green">${category.category.description}</div>
            </div>
            <div>
              <button
                class="newfood__content__button"
                data-category="${category.category.name}"
                type="button"
              >
                Eliminar
              </button>
            </div>
          </a>
        </div>`
      );
    }
    container.append(row);
    this.centralzone.append(container);
  }

  // Muestra el formulario para la creación de un nuevo restaurante
  showNewRestaurantForm() {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Crear restaurante";
    ol.appendChild(li);

    this.initzone.replaceChildren();
    this.centralzone.replaceChildren();

    // Crea un elemento form
    let form = document.createElement("form");
    form.name = "fNewRestaurant";
    form.role = "form";
    form.classList.add("my-5", "p-3");
    form.insertAdjacentHTML(
      "afterbegin",
      `<form class="row g-3" novalidate ></form>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-4">
      <label class="form-label" for="ncName">Nombre del Restaurante: *</label>
      <div class="input-group">
          <span class="input-group-text"><i class="fa-solid fa-font"></i></span>
          <input type="text" class="form-control" id="ncName" name="ncName" placeholder="Nombre del Restaurante" required>
          <div class="invalid-feedback">Debes introducir el nombre del restaurante obligatoriamente.</div>
          <div class="valid-feedback">Correcto!</div>
      </div>
  </div>
  
  <div class="col-md-12 mb-4">
      <label class="form-label" for="ncDescription">Descripción:</label>
      <div class="input-group">
          <span class="input-group-text"><i class="fa-regular fa-rectangle-list"></i></span>
          <input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
          <div class="invalid-feedback"></div>
          <div class="valid-feedback">Correcto.</div>
      </div>
  </div>
  
  <div class="row">
      <div class="col-md-6 mb-4">
          <label class="form-label" for="ncLatitude">Latitud:</label>
          <div class="input-group">
              <span class="input-group-text"><i class="fa-solid fa-location-crosshairs"></i></span>
              <input type="text" class="form-control" placeholder="Ej: 25.283" id="ncLatitude" name="ncLatitude">
              <div class="invalid-feedback">La latitud debe ir entre -90 y 90.</div>
              <div class="valid-feedback">Correcto.</div>
          </div>
      </div>
  
      <div class="col-md-6 mb-4">
          <label class="form-label" for="ncLatitude">Longitud:</label>
          <div class="input-group">
              <span class="input-group-text"><i class="fa-solid fa-location-crosshairs"></i></span>
              <input type="text" class="form-control" placeholder="Ej: -55.283"  id="ncLongitude" name="ncLongitude">
              <div class="invalid-feedback">La longitud debe ir entre -180 y 180.</div>
              <div class="valid-feedback">Correcto.</div>
          </div>
      </div>
  </div>
  
  <button class="newfood__content__button" type="submit">Enviar</button>
  <button class="newfood__content__button" type="reset">Cancelar</button>`
    );

    this.centralzone.append(form);

    // Inserta un título previo al formulario
    let div = document.createElement("div");
    div.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green fw-bold my-4 mx-2">Agregar un nuevo restaurante</h1>`
    );
    div.id = "new-restaurant";
    form.insertAdjacentElement("beforebegin", div);
  }

  // Muestra el formulario para la modificación de asignación de platos a menús
  showUpdateAssignForm(dishes, menus) {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Modificar asignaciones";
    ol.appendChild(li);

    this.initzone.replaceChildren();
    this.centralzone.replaceChildren();

    // Crea un elemento form
    let form = document.createElement("form");
    form.name = "fUpdAssign";
    form.role = "form";
    form.classList.add("my-5", "p-3");
    form.insertAdjacentHTML(
      "afterbegin",
      `<form class="row g-3" novalidate ></form>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      ` 
          <div class="col-md-12 mb-4">
          <label class="form-label" for="ncMenus">Seleccionar menú: (una opción) *</label>
          <div class="input-group">
              <select id="selectMenu" name="ncMenus" class="form-select" size="3"  aria-label="Unique select menú" required>
              </select>
              <div class="invalid-feedback">Debe seleccionar obligatoriamente un menú para la asignación.</div>
              <div class="valid-feedback">Correcto!</div>
          </div>
        </div>
        <div class="col-md-12 mb-4">
          <label class="form-label" for="ncDishes">Seleccionar plato: (múltiples opciones) *</label>
          <div class="input-group">
              <select id="selectDishes" name="ncDishes" class="form-select" size="3" multiple aria-label="Multiple select burgers" required>
              </select>
              <div class="invalid-feedback">Debe seleccionar al menos un plato.</div>
              <div class="valid-feedback">Correcto!</div>
          </div>
        </div>
        <div class="col-md-12 mb-4 text-center">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="ncAssignOption" id="ncAssign" value="ncAssign" checked>
          <label class="form-check-label" for="ncAssign">Asignar</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="ncAssignOption" id="ncDesassign" value="ncDesassign">
          <label class="form-check-label" for="ncDesassign">Desasignar</label>
        </div>
        </div>
  
  
    <button class="newfood__content__button" type="submit">Enviar</button>
    <button class="newfood__content__button" type="reset">Cancelar</button>`
    );

    this.centralzone.append(form);

    // Recogemos los select del formulario para hacerlos dinámicos
    let selectMenu = document.getElementById("selectMenu");
    let selectDishes = document.getElementById("selectDishes");

    for (const menu of menus) {
      selectMenu.insertAdjacentHTML(
        "beforeend",
        `<option value="${menu.menu.name}">${menu.menu.name}</option>`
      );
    }

    for (const dish of dishes) {
      selectDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.dish.name}">${dish.dish.name}</option>`
      );
    }

    // Inserta un título previo al formulario
    let div = document.createElement("div");
    div.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green fw-bold my-4 mx-2">Modificar asignaciones</h1>`
    );
    div.id = "new-restaurant";
    form.insertAdjacentElement("beforebegin", div);
  }

  // Muestra el formulario para la modificación de platos a menús
  showUpdateAllergenForm(dishes, allergens) {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Modificar alérgenos";
    ol.appendChild(li);

    this.initzone.replaceChildren();
    this.centralzone.replaceChildren();

    // Crea un elemento form
    let form = document.createElement("form");
    form.name = "fUpdAllergen";
    form.role = "form";
    form.classList.add("my-5", "p-3");
    form.insertAdjacentHTML(
      "afterbegin",
      `<form class="row g-3" novalidate ></form>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-4">
        <label class="form-label" for="ncAllergens">Seleccionar alérgeno: (una opción) *</label>
            <div class="input-group">
                <select id="selectAllergens" name="ncAllergens" class="form-select" size="4" aria-label="Unique select allergens" required>
                </select>
                <div class="invalid-feedback">Debe seleccionar obligatoriamente al menos un alérgeno.</div>
                <div class="valid-feedback">Correcto!</div>
            </div>
          </div>
         <div class="col-md-12 mb-4">
          <label class="form-label" for="ncDishes">Seleccionar plato: (múltiples opciones) *</label>
          <div class="input-group">
              <select id="selectDishes" name="ncDishes" class="form-select" size="5" multiple aria-label="Multiple select burger" required>
              </select>
              <div class="invalid-feedback">Debe seleccionar obligatoriamente uno o más platos.</div>
              <div class="valid-feedback">Correcto!</div>
          </div>
        </div>
      <div class="col-md-12 mb-4 text-center">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="ncAssignOption" id="ncAdd" value="ncAdd" checked>
        <label class="form-check-label" for="ncAdd">Añadir alérgeno</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="ncAssignOption" id="ncRemove" value="ncRemove">
        <label class="form-check-label" for="ncRemove">Eliminar alérgeno</label>
      </div>
      </div>


  <button class="newfood__content__button" type="submit">Enviar</button>
  <button class="newfood__content__button" type="reset">Cancelar</button>`
    );

    this.centralzone.append(form);

    // Recogemos los select del formulario para hacerlos dinámicos
    let selectDishes = document.getElementById("selectDishes");
    let selectAllergens = document.getElementById("selectAllergens");

    for (const all of allergens) {
      selectAllergens.insertAdjacentHTML(
        "beforeend",
        `<option value="${all.allergen.name}">${all.allergen.name}</option>`
      );
    }

    for (const dish of dishes) {
      selectDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.dish.name}">${dish.dish.name}</option>`
      );
    }

    // Inserta un título previo al formulario
    let div = document.createElement("div");
    div.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green fw-bold my-4 mx-2">Modificar alérgenos</h1>`
    );
    div.id = "new-restaurant";
    form.insertAdjacentElement("beforebegin", div);
  }

  // Muestra el formulario para seleciconar aquel menú del cual queremos cambiar la posición de sus platos
  showChangePositionsForm(menus) {
    this.initzone.replaceChildren();
    this.centralzone.replaceChildren();
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Cambiar posiciones";
    ol.appendChild(li);

    const container = document.createElement("div");
    container.classList.add("container", "my-3");
    container.id = "change-positions";

    const form = document.createElement("form");
    form.name = "fChangePositions";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row", "g-3", "mx-auto");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3">
				<label class="form-label" for="cPmenus">Menús:</label>
				<div class="input-group">
					<select class="form-select" name="cPmenus" id="cPmenus">
						<option disabled selected>Selecciona un menú</option>
					</select>
				</div>
			</div>
      <div class="col-md-6 mb-3">
				<label class="form-label" for="cPfirstDish">Primer plato:</label>
				<div class="input-group">
					<select class="form-select" name="cPfirstDish" id="cPfirstDish">
						<option disabled selected>Selecciona un primer plato</option>
					</select>
				</div>
			</div>
      <div class="col-md-6 mb-3">
				<label class="form-label" for="cPsecondDish">Segundo plato:</label>
				<div class="input-group">
					<select class="form-select" name="cPsecondDish" id="cPsecondDish">
						<option disabled selected>Selecciona un segundo plato</option>
					</select>
          <div class="invalid-feedback">No puede seleccionar platos iguales.</div>
          <div class="valid-feedback">Correcto!</div>
				</div>
			</div>
      <div id="cPbuttons" class="col-md-12 mb-3"></div>`
    );
    const selectMenus = form.querySelector("#cPmenus");
    for (const menu of menus) {
      selectMenus.insertAdjacentHTML(
        "beforeend",
        `<option value="${menu.menu.name}">${menu.menu.name}</option>`
      );
    }

    container.append(form);

    // Inserta un título previo al formulario
    let div = document.createElement("div");
    div.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green fw-bold my-4 mx-2">Modificar las posiciones</h1>`
    );
    div.id = "new-restaurant";
    form.insertAdjacentElement("beforebegin", div);
    this.centralzone.append(container);
  }

  // Función que dentro del formulario de cambiar posiciones actualiza los selects en valor a los platosreferentes a ese menú
  showChangePositionsList(dishes) {
    const form = document.forms.fChangePositions;
    let firstSelect = form.querySelector("#cPfirstDish");
    firstSelect.replaceChildren();
    let secondSelect = form.querySelector("#cPsecondDish");
    secondSelect.replaceChildren();
    let buttons = form.querySelector("#cPbuttons");
    buttons.replaceChildren();

    firstSelect.insertAdjacentHTML(
      "beforeend",
      "<option disabled selected>Selecciona un primer plato</option>"
    );
    secondSelect.insertAdjacentHTML(
      "beforeend",
      "<option disabled selected>Selecciona un segundo plato</option>"
    );

    let exist = false;

    for (const dish of dishes) {
      exist = true;
      firstSelect.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.dish.name}">${dish.dish.name}</option>`
      );
      secondSelect.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.dish.name}">${dish.dish.name}</option>`
      );
    }
    if (!exist) {
      form.insertAdjacentHTML(
        "beforeend",
        '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen platos para este menú actualmente.</p>'
      );
    } else {
      buttons.insertAdjacentHTML(
        "beforeend",
        `<div class="col-md-12">
         <button class="newfood__content__button" type="submit">Intercambiar</button>
      <button class="newfood__content__button" type="reset">Cancelar</button>
      </div>`
      );
    }
  }

  /** -------------- PRACTICA 8 ------------ */
  // Crea una vista para el link de login en el menú
  showIdentificationLink() {
    const userArea = document.getElementById("userArea");
    userArea.replaceChildren();
    userArea.insertAdjacentHTML(
      "afterbegin",
      `<div>
        <a id="login" class="text--green mt-2" href="#"> Identificate </a>
      </div>`
    );
  }

  // Muestra el formulario de login en la zona central
  showLogin() {
    this.centralzone.replaceChildren();
    const login = `<hr class="text--green mt-5">
    <h1 class="text--green text-center">Formulario de login</h1>
    <div class="container mb-5">
    <div class="d-flex justify-content-center">
            <div class="d-flex justify-content-center form_container">
                <form name="fLogin" role="form" novalidate>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fa-regular fa-circle-user"></i></span>
                        <input type="text" name="username" class="form-control" value="" placeholder="Introduzca su usuario">
                    </div>
                    <div class="input-group mb-2">
                        <span class="input-group-text"><i class="fa-solid fa-key"></i></span>
                        <input type="password" name="password" class="form-control input_pass" value="" placeholder="Introduzca su contraseña">
                    </div>
                    <div class="form-group">
                            <input name="remember" type="checkbox" class="form-check-input"
                                id="customControlInline">
                            <label class="custom-control-label" for="customControlInline">Recuerdame</label>
                    </div>
                    <div class="d-flex justify-content-center mt-3">
                        <button class="btn btn--green fw-bold" type="submit">Acceder</button>
                    </div>
                </form>
            </div>
    </div>
</div>`;
    this.centralzone.insertAdjacentHTML("afterbegin", login);
  }

  // Muestra un mensaje personalizado de error en el caso de que se introduzca incorrectamente un dato del formulario de login
  showInvalidUserMessage() {
    this.centralzone.insertAdjacentHTML(
      "beforeend",
      `<div class="container my-3"><div class="bg__grey p-5 text--green border--green rounded" role="alert">
    <strong>El usuario y la contraseña no son válidos. Inténtelo
    nuevamente.</strong>
    </div>`
    );
    document.forms.fLogin.reset();
    document.forms.fLogin.username.focus();
  }

  // Muestra en el menú un mensaje personalizado para el usuario con su nombre y un enlace que permite cerrar la sesión
  showAuthUserProfile(user) {
    const userArea = document.getElementById("userArea");
    userArea.replaceChildren();
    userArea.insertAdjacentHTML(
      "afterbegin",
      `<div class="fst-italic text--green fw-normal">Bienvenido, <span class="fw-bold"><u>${user.username}</u></span> <br>
      <a id="aCloseSession" href="#" class="text--green fw-bold">Desconectar</a>
    </div>`
    );
  }

  // Manejador para el formulario de login
  bindLogin(handler) {
    const form = document.forms.fLogin;
    form.addEventListener("submit", (event) => {
      handler(form.username.value, form.password.value, form.remember.checked);
      event.preventDefault();
    });
  }

  // Bind para dotar de funcionalidad al link de login
  bindIdentificationLink(handler) {
    const login = document.getElementById("login");
    login.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        handler,
        [],
        "main",
        { action: "login" },
        "#",
        event
      );
    });
  }

  // Manejador para cerrar la sesión del usuario
  bindCloseSession(handler) {
    document
      .getElementById("aCloseSession")
      .addEventListener("click", (event) => {
        handler();
        event.preventDefault();
      });
  }

  // Reemplaza en el hisotry la acción de inicio
  initHistory() {
    history.replaceState({ action: "init" }, null);
  }

  // Método para activar una cookie en el usuario
  setUserCookie(user) {
    setCookie("activeUser", user.username, 1);
  }

  // Método para borrar la cookie de usuario
  deleteUserCookie() {
    setCookie("activeUser", "", 0);
  }

  // Método que borra el enlace de administración
  removeAdminMenu() {
    const adminMenu = document.getElementById("navAdministration");
    if (adminMenu) adminMenu.parentElement.remove();
  }

  // Función que vista todos los platos con un botón, permitiendo su posterior eliminación
  showFavouritesDishes(dishes, user) {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    // Creamos un elemento con el nombre del plato y lo agrega a las migas de pan
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Consultar favoritos";
    ol.appendChild(li);

    this.centralzone.replaceChildren();
    this.initzone.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("container", "my-3");
    container.id = "query-favourites";
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="display-5 text--green mt-2">Platos favoritos de <u>${user.username}</u></h1>`
    );

    const row = document.createElement("div");
    row.classList.add("row");
    for (const dish of dishes) {
      let favouriteDish = JSON.parse(localStorage.getItem(dish.dish.name));
      if (favouriteDish) {
        row.insertAdjacentHTML(
          "beforeend",
          `<div class="col-lg-3 col-md-6 my-3">
              <a data-dish="${favouriteDish.name}" href="#dish-list" class="text--green">
                <div>
                  <img alt="${favouriteDish.name}" src="${favouriteDish.image}" class="img-fluid" />
                </div>
                <div>
                  <h3 class="text--green fw-bold mt-2">${favouriteDish.name}</h3>
                  <div class="text--green">${favouriteDish.description}</div>
                </div>
              </a>
            </div>`
        );
      }
    }
    container.append(row);
    this.centralzone.append(container);
  }

  /** -------------- FIN PRACTICA 8 -------------- */

  // Muestra el botón necesario para realizar el volcado objetos
  showBackupForm() {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    // Creamos un elemento con el nombre del plato y lo agrega a las migas de pan
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Realizar backup";
    ol.appendChild(li);

    this.centralzone.replaceChildren();
    this.initzone.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("container", "my-3");
    container.id = "do-backup";
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="display-5 text--green mt-4 mb-4">Copia de seguridad</u></h1>`
    );

    const row = document.createElement("div");
    row.classList.add("row");
    row.insertAdjacentHTML(
      "afterbegin",
      `<div class="container w-50" style="min-height: 55vh;>
        <div class="form_container">
                <div class="mt-3 bg__grey border--green1 rounded p-3">
                <p class="text--green">Tenga en cuenta de que la siguiente operación generará un fichero JSON en su servidor.
                Por eso, de al botón solamente si está completamente seguro/a de querer realizar la copia de seguridad. Para más dudas,
                consulte con el administrador de la página, y resolverá las dudas que puedan haberse generado en esta sección.</p>
                <div class="d-flex justify-content-center">    
                  <button id="bPost" class="btn btn--green fw-bold" type="submit">Realizar copia de seguridad</button>
                </div>
        </div>
</div>`
    );
    container.append(row);
    this.centralzone.append(container);
  }

  bindBackup(handler) {
    document.getElementById("bPost").addEventListener("click", (event) => {
      handler();
    });
  }
  /** ----------- INICIO MODALES -----------  */

  // Modal que se abre cuando se crea un plato, indicando si se ha creado o no correctamente.
  showNewDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nuevo plato";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i> El plato <strong>${dish.name}</strong> ya está creado.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.ncName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  // Modal que se abre cuando se realiza el intento de eliminar un plato
  showRemoveDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Borrado de plato";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato
    <strong>${dish.name}</strong> ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i> El plato <strong>${dish.name}</strong> no se ha podido
    borrar.</div>`
      );
    }
    messageModal.show();
  }

  // Modal qeu se abre cuando se realiza el intento de insertar una nueva categoría
  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nueva Categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i> La categoría <strong>${cat.name}</strong> ya está creada.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.ncName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  // Modal que se abre cuando se realiza el intento de eliminar un plato
  showRemoveCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Borrado de categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría
    <strong>${cat.name}</strong> ha sido eliminada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i>La categoría <strong>${cat.name}</strong> no se ha podido
    borrar.</div>`
      );
    }
    messageModal.show();
  }

  // Modal que se abre cuando se realiza el intento de insertar un nuevo restaurante
  showNewRestaurantModal(done, rest, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nuevo Restaurante";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El restaurante <strong>${rest.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i>El restaurante <strong>${rest.name}</strong> ya está creada.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewRestaurant.reset();
      }
      document.fNewRestaurant.ncName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  // Modal que se abre cuando se crea un plato, indicando si se ha creado o no correctamente.
  showNewUpdateAssignModal(done, menu, dishes, option, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Modificación de asignación";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      if (option === "ncAssign") {
        body.insertAdjacentHTML(
          "afterbegin",
          `<div class="p-3">Se han asignado correctamente los platos <strong>${dishes.join(
            ", "
          )}</strong> al menú
           <strong>${menu.name}</strong></div>`
        );
      } else {
        body.insertAdjacentHTML(
          "afterbegin",
          `<div class="p-3">Se han desasignado correctamente los platos <strong>${dishes.join(
            ", "
          )}</strong> al menú
           <strong>${menu.name}</strong></div>`
        );
      }
    } else {
      if (option === "ncAssign") {
        body.insertAdjacentHTML(
          "afterbegin",
          `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i>
           Ha ocurrido un error al intentar asignar los platos <strong>${dishes.join(
             ", "
           )}</strong> al menú <strong>${menu.name}</strong>.</div>`
        );
      } else {
        body.insertAdjacentHTML(
          "afterbegin",
          `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i>
          Ha ocurrido un error al intentar desasignar los platos <strong>${dishes.join(
            ", "
          )}</strong> al menú <strong>${menu.name}</strong>.</div>`
        );
      }
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fUpdAssign.reset();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  // Modal que se abre cuando se crea un plato, indicando si se ha creado o no correctamente.
  showNewUpdateAllergenModal(done, allergen, dishes, option, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Modificación de alérgenos";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      if (option === "ncAdd") {
        body.insertAdjacentHTML(
          "afterbegin",
          `<div class="p-3">Se han añadido correctamente los platos <strong>${dishes.join(
            ", "
          )}</strong> al alérgeno
             <strong>${allergen.name}</strong></div>`
        );
      } else {
        body.insertAdjacentHTML(
          "afterbegin",
          `<div class="p-3">Se han eliminado correctamente los platos <strong>${dishes.join(
            ", "
          )}</strong> del alérgeno
             <strong>${allergen.name}</strong></div>`
        );
      }
    } else {
      if (option === "ncAdd") {
        body.insertAdjacentHTML(
          "afterbegin",
          `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i>
             Ha ocurrido un error al intentar añadir los platos <strong>${dishes.join(
               ", "
             )}</strong> al alérgeno <strong>${allergen.name}</strong>.</div>`
        );
      } else {
        body.insertAdjacentHTML(
          "afterbegin",
          `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i>
            Ha ocurrido un error al intentar eliminar los platos <strong>${dishes.join(
              ", "
            )}</strong> del alérgeno <strong>${allergen.name}</strong>.</div>`
        );
      }
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fUpdAllergen.reset();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  // Modal que se muestra cuando se cambian las posiciones de los platos en un menu
  showChangePositionsModal(done, menu, firstDish, secondDish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Modificación de posiciones";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El menú <strong>${menu.name}</strong> ha cambiado la posición de ${firstDish.name} por ${secondDish.name}</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i>Ha ocurrido un error inesperado en el cambio de posiciones.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fChangePositions.reset();
      }
      document.fChangePositions.cPmenus.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showCookiesMessage() {
    const toast = `<div class="fixed-top p-5 mt-5">
				<div
					id="cookies-message"
					class="toast fade show bg__grey border--green1 text-white w-50 mx-auto mw-100"
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
				>
					<div class="toast-header bg__grey border_bottom--green1">
						<h4 class="me-auto text--green fw-bold my-auto">Aviso de uso de cookies</h4>
            <button
							type="button"
							class="btn-close bg-danger"
							data-bs-dismiss="toast"
							aria-label="Close"
							id="btnDismissCookie"
						></button>
					</div>
					<div class="toast-body p-4 d-flex flex-column">
						<p>
							Este sitio web almacena datos en cookies para activar su
							funcionalidad, entre las que se encuentra datos analíticos y
							personalización. Para poder utilizar este sitio, estás
							automáticamente aceptando que utilizamos cookies.
						</p>
						<div class="ml-auto">
							<button
								type="button"
								class="btn btn--green btn--deny fw-bold mr-3 deny"
								id="btnDenyCookie"
								data-bs-dismiss="toast"
							>
								Denegar
							</button>
							<button
								type="button"
								class="btn btn--green fw-bold"
								id="btnAcceptCookie"
								data-bs-dismiss="toast"
							>
								Aceptar
							</button>
						</div>
					</div>
				</div>
			</div>`;
    document.body.insertAdjacentHTML("afterbegin", toast);

    // Busca la capa donde tenemos el toast y se le añade un manejador de eventos sobre 'hidden.bs.toast'
    // Con eso se captura un evento propio de Bootstrap que se ha generado manualmente por código
    // Cuando se cierra, se ejecuta el evento y se borra del DOM
    const cookiesMessage = document.getElementById("cookies-message");
    cookiesMessage.addEventListener("hidden.bs.toast", (event) => {
      // Coge y elimina el padre donde está ejecutándose el evento
      event.currentTarget.parentElement.remove();
    });

    const denyCookieFunction = (event) => {
      this.initzone.replaceChildren();
      this.initzone.insertAdjacentHTML(
        "afterbegin",
        `<div class="container my-3">
					<div class="alert bg__grey text--green text-center m-20percent py-5" role="alert">
						<strong>
							Para utilizar esta web es necesario aceptar el uso de cookies.
							Debe recargar la página y aceptar las condiciones para seguir
							navegando. Gracias.
						</strong>
					</div>
				</div>`
      );
      this.centralzone.remove();
      this.menu.remove();
    };

    const btnDenyCookie = document.getElementById("btnDenyCookie");
    btnDenyCookie.addEventListener("click", denyCookieFunction);
    const btnDismissCookie = document.getElementById("btnDismissCookie");
    btnDismissCookie.addEventListener("click", denyCookieFunction);

    const btnAcceptCookie = document.getElementById("btnAcceptCookie");
    btnAcceptCookie.addEventListener("click", (event) => {
      setCookie("acceptedCookieMessage", "true", 1);
    });
  }

  // Modal que se abre cuando se realiza el intento de añadir un plato como favorito
  showAddFavoritesModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Añadido a favoritos";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato
      <strong>${dish.name}</strong> ha sido añadido a favoritos correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i> El plato <strong>${dish.name}</strong> ya está añadido a favoritos</div>`
      );
    }
    messageModal.show();
  }

  // Modal que se abre cuando se realiza el intento de añadir un plato como favorito
  showNeedsLoginModal() {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Error de login";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();

    body.insertAdjacentHTML(
      "afterbegin",
      `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i> Debe realizar login para poder añadir platos a favoritos.</div>`
    );
    messageModal.show();
  }

  /** ----------- FIN MODALES -----------  */

  /** ------------------- MÉTODOS BIND ------------------- */

  // Manejadores para todos los formularios que se encuentran en el menú de navegación
  bindAdminMenu(
    hNewDish,
    hRemoveDish,
    hNewCategory,
    hRemoveCategory,
    hNewRest,
    hUpdAssign,
    hUpdAllergen,
    hChangePositions,
    hQueryFavourites,
    hBackUp
  ) {
    const newDishLink = document.getElementById("newDish");
    newDishLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hNewDish,
        [],
        "#new-dish",
        { action: "newDish" },
        "#",
        event
      );
    });

    const removeDishLink = document.getElementById("delDish");
    removeDishLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hRemoveDish,
        [],
        "#remove-dish",
        { action: "removeDish" },
        "#",
        event
      );
    });

    const newCategoryLink = document.getElementById("newCategory");
    newCategoryLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hNewCategory,
        [],
        "#new-category",
        { action: "newCategory" },
        "#",
        event
      );
    });

    const removeCategoryLink = document.getElementById("delCategory");
    removeCategoryLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hRemoveCategory,
        [],
        "#remove-category",
        { action: "removeCategory" },
        "#",
        event
      );
    });
    const newRestLink = document.getElementById("newRestaurant");
    newRestLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hNewRest,
        [],
        "#new-restaurant",
        { action: "newRestaurant" },
        "#",
        event
      );
    });
    const updAssignLink = document.getElementById("updAssign");
    updAssignLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hUpdAssign,
        [],
        "#upd-assign",
        { action: "updAssign" },
        "#",
        event
      );
    });
    const updAllergenLink = document.getElementById("updAllergen");
    updAllergenLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hUpdAllergen,
        [],
        "#upd-allergen",
        { action: "updAllergen" },
        "#",
        event
      );
    });
    const changePositionsLink = document.getElementById("changePositions");
    changePositionsLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hChangePositions,
        [],
        "#change-positions",
        { action: "changePositions" },
        "#",
        event
      );
    });
    const queryFavouritesLink = document.getElementById("queryFavourites");
    queryFavouritesLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hQueryFavourites,
        [],
        "#query-favourites",
        { action: "queryFavourites" },
        "#query-favourites",
        event
      );
    });
    const backupLink = document.getElementById("backup");
    backupLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hBackUp,
        [],
        "#do-backup",
        { action: "backup" },
        "#do-backup",
        event
      );
    });
  }

  // Manejador que se da cuando detecta el evento change en el formulario de cambiar las posiciones de los platos en un menú
  bindChangePositionsSelects(hMenus) {
    const selectMenus = document.getElementById("cPmenus");
    selectMenus.addEventListener("change", (event) => {
      this[EXECUTE_HANDLER](
        hMenus,
        [event.currentTarget.value],
        "#change-positions",
        { action: "changePositionsMenu", type: event.currentTarget.value },
        "#change-positions",
        event
      );
    });
  }

  // Manejadores que requieren de la validación del formulario
  bindNewDishForm(handler) {
    newDishValidation(handler);
  }

  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  bindNewRestaurantForm(handler) {
    newRestaurantValidation(handler);
  }

  bindUpdateAssignForm(handler) {
    newUpdateAssignValidation(handler);
  }

  bindUpdateAllergenForm(handler) {
    newUpdateAllergenValidation(handler);
  }

  bindChangePositionsForm(handler) {
    newChangePositionsValidation(handler);
  }

  // Vincula a cada botón de eliminar los platos el manejador, pasándole el plato a través del dataset
  bindRemoveDishForm(handler) {
    const removeContainer = document.getElementById("remove-dish");
    const buttons = removeContainer.getElementsByTagName("button");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.dish);
      });
    }
  }

  // Vincula a cada botón de eliminar categorías el manejador, pasándole la categoría a través del dataset
  bindRemoveCategoryForm(handler) {
    const removeContainer = document.getElementById("remove-category");
    const buttons = removeContainer.getElementsByTagName("button");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.category);
      });
    }
  }

  // Modificado el método para poder invocar a [EXECUTE_HANDLER]()
  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      // Creación de las migas de pan, seleccionando el <ol> que las contiene y posteriormente sus <li>
      let ol = this.breadcrumb.closest("ol");
      let elements = ol.querySelectorAll("li");

      // Lo recorremos y eliminamos aquello que no sea el Inicio para limpiar en cada llamada las migas de pan
      for (const element of elements) {
        if (element !== ol.firstElementChild) element.remove();
      }

      this[EXECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
    document.getElementById("logo").addEventListener("click", (event) => {
      // Creación de las migas de pan, seleccionando el <ol> que las contiene y posteriormente sus <li>
      let ol = this.breadcrumb.closest("ol");
      let elements = ol.querySelectorAll("li");

      // Lo recorremos y eliminamos aquello que no sea el Inicio para limpiar en cada llamada las migas de pan
      for (const element of elements) {
        if (element !== ol.firstElementChild) element.remove();
      }

      this[EXECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
  }

  // Manejador que se da cuando se realiza click en la zona con los platos aleatorios
  bindDishesRandomList(handler) {
    // Obtiene el elemento y aquellos que dentro se compongan con el tag <a>
    const randomList = document.getElementById("random-list");
    const links = randomList.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { dish } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [dish],
          "#single-dish",
          { action: "dishesRandomList", dish },
          "#single-dish",
          event
        );
      });
    }
  }

  // Manejador que se da cuando se realiza click en la zona central de categorías
  bindDishesCategoryList(handler) {
    // Obtiene el elemento y aquellos que dentro se compongan con el tag <a>
    const categoryList = document.getElementById("dish-list");
    const links = categoryList.querySelectorAll("a");
    // Los recorre y recupera el nombre de la categoría con el atributo personalizado dataset.category
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [category],
          "#dish-list",
          { action: "dishesCategoryList", category },
          "#dish-list",
          event
        );
      });
    }
  }

  // Manejador que se da cuando se realiza click en la zona de navegación de categorías
  bindDishesCategoryListInMenu(handler) {
    // Obtiene el elemento de navCats y recoge el siguiente hermano con el tag <a>
    const navCats = document.getElementById("navCats");
    const links = navCats.nextElementSibling.querySelectorAll("a");
    // Los recorre y recupera el nombre de la categoría con el atributo personalizado dataset.category
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [category],
          "#dish-list",
          { action: "dishesCategoryList", category },
          "#dish-list",
          event
        );
      });
    }
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de alérgenos
  bindDishesAllergenListInMenu(handler) {
    // Obtiene el elemento de navAllergens y recoge los tag <a>
    const navAllergens = document.getElementById("navAllergens");
    const links = navAllergens.nextSibling.querySelectorAll("a");
    // Los recorre y añade el manejador para aquellos que tienen el atributo allergen
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { allergen } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [allergen],
          "#dish-list",
          { action: "dishesAllergenList", allergen },
          "#dish-list",
          event
        );
      });
    }
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de menús
  bindMenuListInNav(handler) {
    // Obtiene el elemento de navMenus y recoge los tag <a>
    const navMenus = document.getElementById("navMenus");
    const links = navMenus.nextSibling.querySelectorAll("a");
    // Los recorre y añade el manejador para aquellos que tienen el atributo menú
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { menu } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [menu],
          "#dish-list",
          { action: "dishesMenuList", menu },
          "#dish-list",
          event
        );
      });
    }
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de restaurantes
  bindRestaurantListInMenu(handler) {
    // Obtiene el elemento de navRests y recoge los tag <a>
    const navRests = document.getElementById("navRests");
    const links = navRests.nextElementSibling.querySelectorAll("a");
    // Los recorre y añade un manejador de eventos para aquellos con el atributo rest
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { rest } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [rest],
          "#restaurant",
          { action: "restaurantList", rest },
          "#restaurant",
          event
        );
      });
    }
  }

  // Permite unir con el controlador el plato (de aquellos que formen parte de una lista, nunca de los platos iniciales aleatorios), añadiendo un manejador de eventos para cada plato
  bindShowDish(handler) {
    // Obtiene el elemento y los links
    const dishList = document.getElementById("dish-list");
    const links = dishList.querySelectorAll("a.text--green");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { dish } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [dish],
          "#single-dish",
          { action: "showDish", dish },
          "#single-dish",
          event
        );
      });
    }

    // También recoge las imágenes
    const images = dishList.querySelectorAll("figcaption a");
    for (const image of images) {
      image.addEventListener("click", (event) => {
        const { dish } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [dish],
          "#single-dish",
          { action: "showDish", dish },
          "#single-dish",
          event
        );
      });
    }
  }

  // Enlaza con el controlador para que cierre las ventanas de las fichas abiertas
  bindCloseWindowsInMenu(handler) {
    // Coge el menú para cerrar las ventanas
    const bClose = document.getElementById("b-close");
    // Cuando se haga click, se cierran aquellas que estén abiertas
    bClose.addEventListener("click", () => {
      for (const [dish, window] of this.dishWindows) {
        // Se le pasa la ventana para que sea cerrada y el plato para que sea eliminado del mapa
        handler(window, dish);
      }
    });
  }

  // Enlace que se da cuando se hace click en el botón "abrir en una ventana nueva"
  bindShowProductInNewWindow(handler) {
    const bOpen = document.getElementById("b-open");

    // Siempre que se haga click, se crea una nueva ventana, a la que le asignaremos un ID
    bOpen.addEventListener("click", (event) => {
      // Si el plato ya existe, quiere decir que ya hay una ventana abierta
      if (this.dishWindows.has(event.currentTarget.dataset.dish)) {
        // Obtenemos la referencia y ponemos en ella el foco
        let w = this.dishWindows.get(event.currentTarget.dataset.dish);
        w.focus();
      } else {
        // Si el plato no existe, creamos la nueva ventana con un identificador único y la guardamos en el mapa
        const newWindow = window.open(
          "dish.html",
          "DishWindow" + this.id++,
          "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
        );
        // Guarda la referencia a la nueva ventana en el mapa
        this.dishWindows.set(event.target.dataset.dish, newWindow);

        // Recorre el mapa y pasa la referencia del plato y la nueva ventana al controlador
        for (const [dish, window] of this.dishWindows) {
          window.addEventListener("DOMContentLoaded", () => {
            handler(dish, window);
          });
        }
      }
    });
  }
}

export default RestaurantsManagerView;
