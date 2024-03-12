// Muestra el feedback al usuario por si se ha equivocado al introducir algún dato o no es válido
function showFeedBack(input, valid, message) {
  const validClass = valid ? "is-valid" : "is-invalid";
  const messageDiv = valid
    ? input.parentElement.querySelector("div.valid-feedback")
    : input.parentElement.querySelector("div.invalid-feedback");
  for (const div of input.parentElement.getElementsByTagName("div")) {
    div.classList.remove("d-block");
  }
  messageDiv.classList.remove("d-none");
  messageDiv.classList.add("d-block");
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
  input.classList.add(validClass);
  if (message) {
    messageDiv.innerHTML = message;
  }
}

function defaultCheckElement(event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack(this, false);
  } else {
    showFeedBack(this, true);
  }
}

// Función de validación para la creación de los platos
function newDishValidation(handler) {
  const form = document.forms.fNewDish;

  form.setAttribute("novalidate", true);

  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncName.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncName, false);
      firstInvalidElement = this.ncName;
    } else {
      showFeedBack(this.ncName, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      // Transformación de los alérgenos seleccionadas en array
      let alls = Array.from(this.ncAllergens.selectedOptions).map(
        (option) => option.value
      );

      // La imagen la cogemos de forma local
      let img = this.ncImage.value.split("\\");
      img = "img/" + img[2];
      // Manda al controlador los datos necesarios para la creación de un plato
      handler(
        this.ncName.value,
        this.ncIngredients.value,
        this.ncCategories.value,
        alls,
        img,
        this.ncDescription.value
      );
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncName.focus();
  });

  form.ncName.addEventListener("change", defaultCheckElement);
}

// Función para la validación de una nueva categoría
function newCategoryValidation(handler) {
  const form = document.forms.fNewCategory;

  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncName.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncName, false);
      firstInvalidElement = this.ncName;
    } else {
      showFeedBack(this.ncName, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.ncName.value, this.ncDescription.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback,div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncName.focus();
  });
  form.ncName.addEventListener("change", defaultCheckElement);
}

// Función para la validación de un nuevo restaurante
function newRestaurantValidation(handler) {
  const form = document.forms.fNewRestaurant;
  const addresses = document.getElementById("geocoderAddresses");
  const mapContainer = document.getElementById("geocoderMap");
  let map = null;

  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.append("format", "json");
    url.searchParams.append("limit", 3);
    url.searchParams.append("q", this.q.value);
    fetch(url, {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        const list = document.createElement("div");
        list.classList.add("list-group");
        data.forEach((address) => {
          list.insertAdjacentHTML(
            "beforeend",
            `<a href="#" data-lat="${address.lat}" data-lon="${address.lon}" class="list-group-item list-group-item-action">
      ${address.display_name}</a>`
          );
        });
        addresses.replaceChildren();
        addresses.append(list);
        const links = document.getElementsByTagName("a");
        for (const link of links) {
          link.addEventListener("click", (event) => {
            for (const link of links) {
              link.classList.remove("bg__grey", "text--green", "border--green");
            }
            event.currentTarget.classList.add(
              "bg__grey",
              "text--green",
              "border--green"
            );
            if (map) {
              map.setView(
                new L.LatLng(
                  event.currentTarget.dataset.lat,
                  event.currentTarget.dataset.lon
                ),
                15
              );
            } else {
              mapContainer.style.height = "300px";
              mapContainer.classList.add(
                "mx-auto",
                "border--green1",
                "rounded"
              );
              map = L.map("geocoderMap").setView(
                [
                  event.currentTarget.dataset.lat,
                  event.currentTarget.dataset.lon,
                ],
                15
              );
              L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                  'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18,
              }).addTo(map);
            }
            L.marker([
              event.currentTarget.dataset.lat,
              event.currentTarget.dataset.lon,
            ]).addTo(map);
            event.preventDefault();
          });
        }
      })
      .catch((error) => {
        addresses.replaceChildren();
        addresses.insertAdjacentHTML(
          "afterbefin",
          `<div class="textdanger">
        <i class="bi bi-exclamation-circle-fill"></i>
        No se ha podido establecer la conexión con el servidor de mapas.
        </div>`
        );
      });
    event.preventDefault();

    // Expresiones regulares para, si recibe latitud o longitud, comprobar que sean correctas
    let regExLat = /^(-?[0-8]?\d(?:\.\d{1,6})?|-?90(?:\.0{1,6})?)$/;
    let regExLon =
      /^(-?(?:1[0-7]\d|\d{1,2})(?:\.\d{1,6})?|-?180(?:\.0{1,6})?)$/;

    let isValid = true;
    let firstInvalidElement = null;

    if (this.ncLatitude.value) {
      if (!regExLat.test(this.ncLatitude.value)) {
        isValid = false;
        showFeedBack(this.ncLatitude, false);
        firstInvalidElement = this.ncLatitude;
      } else {
        showFeedBack(this.ncLatitude, true);
      }
    }

    if (this.ncLongitude.value) {
      if (!regExLon.test(this.ncLongitude.value)) {
        isValid = false;
        showFeedBack(this.ncLongitude, false);
        firstInvalidElement = this.ncLongitude;
      } else {
        showFeedBack(this.ncLongitude, true);
      }
    }

    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncName.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncName, false);
      firstInvalidElement = this.ncName;
    } else {
      showFeedBack(this.ncName, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(
        this.ncName.value,
        this.ncDescription.value,
        this.ncLatitude.value,
        this.ncLongitude.value
      );
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback,div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncName.focus();
  });
  form.ncName.addEventListener("change", defaultCheckElement);
}

// Permite realizar la validación del formulario de la asignación
function newUpdateAssignValidation(handler) {
  const form = document.forms.fUpdAssign;

  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    // Se tiene que escoger un plato como mínimo
    if (this.ncDishes.selectedOptions.length < 1) {
      isValid = false;
      showFeedBack(this.ncDishes, false);
      firstInvalidElement = this.ncDishes;
    } else {
      showFeedBack(this.ncDishes, true);
    }

    // Se tiene que escoger obligatoriamente un menú
    if (this.ncMenus.selectedOptions.length != 1) {
      isValid = false;
      showFeedBack(this.ncMenus, false);
      firstInvalidElement = this.ncMenus;
    } else {
      showFeedBack(this.ncMenus, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      // Transformación de los platos seleccionadas en array
      let dishes = Array.from(this.ncDishes.selectedOptions).map(
        (option) => option.value
      );
      handler(this.ncMenus.value, dishes, this.ncAssignOption.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback,div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncMenus.focus();
  });
}

// Validación de formulario para modificación de alérgeno a platos
function newUpdateAllergenValidation(handler) {
  const form = document.forms.fUpdAllergen;

  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    // Se tiene que escoger un alérgeno obligatoriamente
    if (this.ncAllergens.selectedOptions.length != 1) {
      isValid = false;
      showFeedBack(this.ncAllergens, false);
      firstInvalidElement = this.ncAllergens;
    } else {
      showFeedBack(this.ncAllergens, true);
    }

    // Se tiene que escoger obligatoriamente un plato como mínimo
    if (this.ncDishes.selectedOptions.length < 1) {
      isValid = false;
      showFeedBack(this.ncDishes, false);
      firstInvalidElement = this.ncDishes;
    } else {
      showFeedBack(this.ncDishes, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      // Transformación de los platos seleccionadas en array
      let dishes = Array.from(this.ncDishes.selectedOptions).map(
        (option) => option.value
      );
      handler(this.ncAllergens.value, dishes, this.ncAssignOption.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback,div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncDishes.focus();
  });
}

// Validación del formulario para cambiar las posiciones de un determinado menú
function newChangePositionsValidation(handler) {
  const form = document.forms.fChangePositions;
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (this.cPfirstDish.value === this.cPsecondDish.value) {
      isValid = false;
      showFeedBack(this.cPsecondDish, false);
      firstInvalidElement = this.cPsecondDish;
    } else {
      showFeedBack(this.cPsecondDish, true);
      isValid = true;
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      console.log(this.cPfirstDish.value);
      handler(
        this.cPmenus.value,
        this.cPfirstDish.value,
        this.cPsecondDish.value
      );
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback,div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    for (const input of this.querySelectorAll("select")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.cPmenus.focus();
  });
}

export {
  newDishValidation,
  newCategoryValidation,
  newRestaurantValidation,
  newUpdateAssignValidation,
  newUpdateAllergenValidation,
  newChangePositionsValidation,
};
