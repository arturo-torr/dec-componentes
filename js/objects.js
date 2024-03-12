import { EmptyValueException, InvalidValueException } from "./exceptions.js";

// Objeto que identifica los datos de un plato
class Dish {
  #name;
  #description;
  #ingredients;
  #image;

  // En el constructor sólo será obligatorio el nombre del plato
  constructor(name = " ") {
    name = name.trim();

    // Si no introducimos un valor, lanza una excepción
    if (name === "undefined" || name === "")
      throw new EmptyValueException("name");

    this.#name = name;
    this.#description = null;
    this.#ingredients = null;
    this.#image = null;
  }

  // --- Getters & Setters ---
  get name() {
    return this.#name;
  }

  set name(value = "EmptyDish") {
    value = value.trim();
    if (value === "undefined" || value === "EmptyDish" || value === "")
      throw new EmptyValueException("value");

    this.#name = value;
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    if (value === "undefined" || value == null)
      throw new EmptyValueException("description");

    this.#description = value;
  }

  get ingredients() {
    // referencia para habilitar el closure en el objeto
    let array = this.#ingredients;
    return {
      // Objeto iterable
      [Symbol.iterator]() {
        // Propiedad con la función que devuelve el iterador;
        let nextIndex = 0; // Inicialización del índice para cada iterador
        return {
          next: function () {
            return nextIndex < array.length
              ? { value: array[nextIndex++], done: false }
              : { done: true };
          },
        };
      },
    };
  }

  get stringIngredients() {
    return this.#ingredients.join(", ");
  }

  set ingredients(value = []) {
    this.#ingredients = value;
  }

  get image() {
    return this.#image;
  }

  set image(url) {
    if (url === "undefined" || url == null)
      throw new EmptyValueException("image");
    if (
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}(\:(\d){2,4})?(\/[a-zA-Z0-9_.$%._\+~#]+)*(\?(\w+=.*)(\&(\w+=.+))*)?$/.test(
        url
      ) === true ||
      /^(\/?[a-zA-Z0-9_.$%._\+~#]+)*(\?(\w+=.*)(\&(\w+=.+))*)?$/.test(url) ===
        true
    )
      this.#image = url;
    else throw new InvalidValueException("url", url);
  }

  // Imprime por pantalla las propiedades del objeto Dish
  toString() {
    return (
      "Dish name: " +
      this.#name +
      ", Description: " +
      this.#description +
      ", Image: " +
      this.#image +
      ", Ingredients: " +
      this.#ingredients.join()
    );
  }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
      ingredientes: this.#ingredients,
      image: this.#image,
    };
  }

  // Permite obtener un array de todos los ingredientes de ese plato
  getIngredients() {
    return [].concat(...this.ingredients);
  }
}

// Objeto con la que será creada la estructura de categorías
class Category {
  #name;
  #description;

  // En el constructor sólo será obligatorio el nombre de la categoría
  constructor(name = " ") {
    name = name.trim();

    // Si no introducimos un valor, lanza una excepción
    if (name === "undefined" || name === "")
      throw new EmptyValueException("name");

    this.#name = name;
    this.#description = null;
  }

  // --- Getters & Setters ---
  get name() {
    return this.#name;
  }

  set name(value = "EmptyCategory") {
    value = value.trim();
    if (value === "undefined" || value === "EmptyCategory" || value === "")
      throw new EmptyValueException("value");

    this.#name = value;
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    if (value === "undefined" || value == null)
      throw new EmptyValueException("description");

    this.#description = value;
  }

  // Imprime por pantalla las propiedades del objeto Category
  toString() {
    return (
      "Category name: " + this.#name + ", Description: " + this.#description
    );
  }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
    };
  }
}

// Objeto que representa los alérgenos que puede tener un determinado plato
class Allergen {
  #name;
  #description;

  // En el constructor sólo será obligatorio el nombre del alérgeno
  constructor(name = " ") {
    name = name.trim();

    // Si no introducimos un valor, lanza una excepción
    if (name === "undefined" || name === "")
      throw new EmptyValueException("name");

    this.#name = name;
    this.#description = null;
  }

  // --- Getters & Setters ---
  get name() {
    return this.#name;
  }

  set name(value = "EmptyAllergen") {
    value = value.trim();
    if (value === "undefined" || value === "EmptyAllergen" || value === "")
      throw new EmptyValueException("value");

    this.#name = value;
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    if (value === "undefined" || value == null)
      throw new EmptyValueException("description");

    this.#description = value;
  }

  // Imprime por pantalla las propiedades del objeto Allergen
  toString() {
    return (
      "Allergen name: " + this.#name + ", Description: " + this.#description
    );
  }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
    };
  }
}

// Objeto que representa el menú que tendrá el restaurante
class Menu {
  #name;
  #description;

  // En el constructor sólo será obligatorio el nombre del menú
  constructor(name = " ") {
    name = name.trim();

    // Si no introducimos un valor, lanza una excepción
    if (name === "undefined" || name === "")
      throw new EmptyValueException("name");

    this.#name = name;
    this.#description = null;
  }

  // --- Getters & Setters ---
  get name() {
    return this.#name;
  }

  set name(value = "EmptyMenu") {
    value = value.trim();
    if (value === "undefined" || value === "EmptyMenu" || value === "")
      throw new EmptyValueException("value");

    this.#name = value;
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    if (value === "undefined" || value == null)
      throw new EmptyValueException("description");

    this.#description = value;
  }

  // Imprime por pantalla las propiedades del objeto Menu
  toString() {
    return "Menu name: " + this.#name + ", Description: " + this.#description;
  }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
    };
  }
}

// Objeto que representa un recurso restaurante para formar parte de la cadena de restaurantes a gestionar
class Restaurant {
  #name;
  #description;
  #location;

  // En el constructor sólo será obligatorio el nombre del restaurante
  constructor(name = " ") {
    name = name.trim();

    // Si no introducimos un valor, lanza una excepción
    if (name === "undefined" || name === "")
      throw new EmptyValueException("name");

    this.#name = name;
    this.#description = null;
    this.#location = null;
  }

  // --- Getters & Setters ---
  get name() {
    return this.#name;
  }

  set name(value = "EmptyRestaurant") {
    value = value.trim();
    if (value === "undefined" || value === "EmptyRestaurant" || value === "")
      throw new EmptyValueException("value");

    this.#name = value;
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    if (value === "undefined" || value == null)
      throw new EmptyValueException("description");

    this.#description = value;
  }

  get location() {
    return this.#location;
  }

  set location(value) {
    if (value === "undefined" || value == null)
      throw new EmptyValueException("location");
    if (!value instanceof Coordinate)
      throw new InvalidValueException("location", value);
    this.#location = value;
  }

  // Imprime por pantalla las propiedades del objeto Restaurant
  toString() {
    return (
      "Restaurant name: " +
      this.#name +
      ", Description: " +
      this.#description +
      ", Location: " +
      this.#location
    );
  }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
      location: this.#location ? this.#location.toJSON() : null,
    };
  }
}

// Objeto Coordinate para definir coordenadas.
class Coordinate {
  #latitude;
  #longitude;

  constructor(latitude = 0, longitude = 0) {
    latitude = typeof latitude !== "undefined" ? Number(latitude).valueOf() : 0;
    if (Number.isNaN(latitude) || latitude < -90 || latitude > 90)
      throw new InvalidValueException("latitude", latitude);
    longitude =
      typeof longitude !== "undefined" ? Number(longitude).valueOf() : 0;
    if (Number.isNaN(longitude) || longitude < -180 || longitude > 180)
      throw new InvalidValueException("longitude", longitude);

    this.#latitude = latitude;
    this.#longitude = longitude;
  }

  get latitude() {
    return this.#latitude;
  }
  set latitude(value) {
    value = typeof value !== "undefined" ? Number(value).valueOf() : 0;
    if (Number.isNaN(value) || value < -90 || value > 90)
      throw new InvalidValueException("latitude", value);
    this.#latitude = value;
  }

  get longitude() {
    return this.#longitude;
  }
  set longitude(value) {
    value = typeof value !== "undefined" ? Number(value).valueOf() : 0;
    if (Number.isNaN(value) || value < -180 || value > 180)
      throw new InvalidValueException("longitude", value);
    this.#longitude = value;
  }

  toString() {
    return "Latitude: " + this.#latitude + " Longitude: " + this.#longitude;
  }

  toJSON() {
    return {
      latitude: this.#latitude,
      longitude: this.#longitude,
    };
  }
}

export { Dish, Category, Allergen, Menu, Restaurant, Coordinate };
