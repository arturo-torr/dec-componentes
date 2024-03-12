import {
  Dish,
  Category,
  Allergen,
  Menu,
  Restaurant,
  Coordinate,
} from "./objects.js";

import RestaurantsManager from "./restaurantsmanager.js";

function testObjects() {
  try {
    console.log("--- Testeando Dish ---");

    let dish = new Dish("Cosido");

    dish.name = "Cocido";
    dish.description = "Cocido de Parla";
    dish.ingredients = ["Garbanzos", "Pollo", "Codillo", "Patata"];

    console.log(dish.toString());

    console.log("--- Iterador ingredientes de Dish ---");
    let iterable = dish.ingredients; // Obtenemos el iterable de la lista.
    const iterator = iterable[Symbol.iterator](); // Obtenemos iterador de iterable;

    let obj = iterator.next();
    while (!obj.done) {
      // Iteramos con while
      let element = obj.value;
      console.log(element);
      obj = iterator.next();
    }
  } catch (error) {
    console.log(error.message);
  }

  try {
    console.log("--- Testeando Category ---");

    let category = new Category("Categoria");
    category.description = "Descripción de la categoría";

    console.log(category.toString());
  } catch (error) {
    console.log(error.message);
  }

  try {
    console.log("--- Testeando Allergen ---");

    let allergen = new Allergen("Alérgeno");
    allergen.description = "Descripción del alérgeno";

    console.log(allergen.toString());
  } catch (error) {
    console.log(error.message);
  }

  try {
    console.log("--- Testeando Menú ---");

    let menu = new Menu("Menú");
    menu.description = "Descripción del menú";

    console.log(menu.toString());
  } catch (error) {
    console.log(error.message);
  }

  try {
    console.log("--- Testeando Restaurant y Coordinate ---");
    let coords = new Coordinate(60, 90);
    let rest = new Restaurant(
      "Casa Pepe",
      "Restaurante familiar para bodas y eventos"
    );

    rest.location = coords;

    console.log("Coordenadas: " + coords.toString());
    console.log("Restaurante: " + rest.toString());
  } catch (error) {
    console.log(error.message);
  }
}

function testManager() {
  try {
    // Creación de los objetos a través del patrón FlyWeight
    let rm = RestaurantsManager.getInstance();

    let dish1 = rm.createDish("Patatas fritas", RestaurantsManager.Dish);
    let dish2 = rm.createDish("Lentejas con Arroz", RestaurantsManager.Dish);
    let dish3 = rm.createDish("Tortilla de Patatas", RestaurantsManager.Dish);
    let dish4 = rm.createDish("Arroz con caldo", RestaurantsManager.Dish);
    let dish5 = rm.createDish("Sopa de cocido", RestaurantsManager.Dish);
    dish1.ingredients = ["Patatas", "Sal"];
    dish1.description = "Patatas fritas realizadas con aceite de girasol";
    dish2.ingredients = [
      "Lentejas",
      "Arroz",
      "Tomate Frito",
      "Chorizo",
      "Laurel",
      "Pimienta",
      "Pimenton",
      "Patata",
      "Ajo",
      "Cebolla",
    ];
    dish2.description = "Comida tradicional para el invierno";
    dish3.ingredients = ["Patatas", "Sal", "Aceite", "Huevo"];
    dish3.description = "Comida campera por excelencia para tapa";
    dish4.ingredients = [
      "Ajo",
      "Cebolla",
      "Pimenton",
      "Colorante",
      "Pimienta",
      "Magro",
      "Pollo",
      "Arroz",
      "Tomate",
    ];
    dish4.description = "Comida de calidad para los domingos";
    dish5.ingredients = [
      "Patata",
      "Garbanzos",
      "Pollo",
      "Jamon",
      "Fideos",
      "Sal",
      "Colorante",
    ];
    dish5.description = "Comida excelente para el frío";

    // Creación de categorías
    let cat1 = rm.createCategory(
      "Categoria numero 1",
      RestaurantsManager.Category
    );
    let cat2 = rm.createCategory(
      "Categoria numero 2",
      RestaurantsManager.Category
    );
    let cat3 = rm.createCategory(
      "Categoria numero 3",
      RestaurantsManager.Category
    );
    let cat4 = rm.createCategory(
      "Categoria numero 4",
      RestaurantsManager.Category
    );
    let cat5 = rm.createCategory(
      "Categoria numero 5",
      RestaurantsManager.Category
    );

    // Creación de alérgenos
    let all1 = rm.createAllergen("Lactosa", RestaurantsManager.Allergen);
    let all2 = rm.createAllergen("Gluten", RestaurantsManager.Allergen);
    let all3 = rm.createAllergen("Soja", RestaurantsManager.Allergen);
    let all4 = rm.createAllergen("Frutos Secos", RestaurantsManager.Allergen);
    let all5 = rm.createAllergen("Marisco", RestaurantsManager.Allergen);

    // Creación de menús
    let menu1 = rm.createMenu("Menu del Lunes", RestaurantsManager.Menu);
    let menu2 = rm.createMenu("Menu del Martes", RestaurantsManager.Menu);
    let menu3 = rm.createMenu("Menu del Miercoles", RestaurantsManager.Menu);
    let menu4 = rm.createMenu("Menu del Jueves", RestaurantsManager.Menu);
    let menu5 = rm.createMenu("Menu del Viernes", RestaurantsManager.Menu);

    // Creación de restaurante
    let res1 = rm.createRestaurant(
      "Restaurante",
      RestaurantsManager.Restaurant
    );

    // Adición de los objetos a las colecciones de RestaurantManager
    rm.addDish(dish1, dish2, dish3, dish4, dish5);
    console.log("Platos añadidos");
    console.log(rm);

    // Comprobación de getter iterador para platos
    console.log("--- Testeo getter iterador platos ---");
    for (const dish of rm.dishes) {
      console.log(dish.dish);
    }

    rm.addCategory(cat1, cat2, cat3, cat4, cat5);
    console.log("Categorías añadidas");
    console.log(rm);

    // Comprobación de getter iterador para categorías
    console.log("--- Testeo getter iterador categorías ---");
    for (const category of rm.categories) {
      console.log(category.category);
    }

    rm.addAllergen(all1, all2, all3).addAllergen(all4, all5);
    console.log("Alérgenos añadidos");
    console.log(rm);

    // Comprobación de getter iterador para alérgenos
    console.log("--- Testeo getter iterador alérgenos ---");
    for (const allergen of rm.allergens) {
      console.log(allergen.allergen);
    }

    rm.addMenu(menu1, menu2, menu3, menu4, menu5);
    console.log("Menús añadidos");
    console.log(rm);

    // Comprobación de getter iterador para menús
    console.log("--- Testeo getter iterador menús ---");
    for (const menu of rm.menus) {
      console.log(menu.menu);
    }

    rm.addRestaurant(res1);
    console.log("Restaurante añadido");
    console.log(rm);

    // Comprobación de getter iterador para restaurantes
    console.log("--- Testeo getter iterador restaurantes ---");
    for (const rest of rm.restaurants) {
      console.log(rest.restaurant);
    }

    // Eliminado de objetos
    rm.removeCategory(cat5);
    console.log("Eliminada categoría 5");
    console.log(rm);

    rm.removeAllergen(all4);
    console.log("Eliminado alérgeno de Frutos Secos");
    console.log(rm);

    rm.removeMenu(menu5);
    console.log("Eliminado menú del Viernes");
    console.log(rm);

    // Asignado de platos a categorías
    rm.assignCategoryToDish(cat1, dish1, dish2); // Categoria numero 1: Patatas Fritas, Lentejas con Arroz
    console.log(
      "Añadida Categoria numero 1: Patatas Fritas, Lentejas con Arroz"
    );

    rm.assignCategoryToDish(cat2, dish3, dish4); // Categoria numero 2: Tortilla de Patatas, Arroz con caldo
    console.log(
      "Añadida Categoria numero 2: Tortilla de Patatas, Arroz con caldo"
    );

    rm.assignCategoryToDish(cat3, dish5, dish1); // Categoria numero 3: Sopa de Cocido, Patatas Fritas
    console.log("Añadida Categoria numero 3: Sopa de Cocido, Patatas Fritas");

    rm.assignCategoryToDish(cat4, dish1, dish2, dish3, dish4, dish5); // Categoria numero 4: Patatas fritas, Lentejas con Arroz, Tortilla de Patatas, Arroz con Caldo, Sopa de cocido
    console.log(
      "Añadida Categoria numero 4: Patatas fritas, Lentejas con Arroz, Tortilla de Patatas, Arroz con Caldo, Sopa de cocido"
    );

    // Desasignamos el plato 5 (Sopa de Cocido) de la categoría 4
    rm.desassignCategoryToDish(cat4, dish5);
    console.log("Desasignado plato Sopa de Cocido de la Categoría 4 ");
    console.log(rm);

    // Asignado de platos a alérgenos
    rm.assignAllergenToDish(all2, dish1, dish5); // Gluten: Patatas Fritas, Cocido
    console.log("Asignado alérgneo de Gluten a Patatas Fritas y Cocido");

    rm.assignAllergenToDish(all1, dish2); // Lactosa: lentejas con arroz
    console.log("Asignado alérgeno de Lactosa a Lentejas con Arroz");

    rm.assignAllergenToDish(all5, dish5); // Marisco: Sopa de Cocido
    console.log("Asignado alérgeno de Marisco a Sopa de Cocido");

    console.log(rm);
    // Desasignamos el plato de Sopa de Cocido al alérgeno Marisco
    rm.desassignAllergenToDish(all5, dish5);
    console.log("Desasignado alérgeno de Marisco a Sopa de Cocido");

    console.log(rm);

    // Asignados de platos a menús
    rm.assignDishToMenu(menu1, dish1, dish2); // Menú del Lunes: Patatas Fritas, Lentejas con Arroz
    console.log("Asignado Menú del Lunes: Patatas Fritas, Lentejas con Arroz");

    rm.assignDishToMenu(menu2, dish2, dish3); // Menú del Martes: Lentejas con Arroz, Tortilla de Patatas
    console.log(
      "Asignado Menú del Martes: Lentejas con Arroz, Tortilla de Patatas"
    );

    rm.assignDishToMenu(menu3, dish4, dish5, dish3); // Menú del Miércoles: Arroz con Caldo, Sopa de Cocido, Tortilla de Patatas
    console.log(
      "Asignado Menú del Miércoles: Arroz con Caldo, Sopa de Cocido, Tortilla de Patatas"
    );

    console.log(rm);

    // Desasignamos el plato de tortilla de patatas del menú del miércoles
    rm.desassignDishToMenu(menu3, dish3);
    console.log("Desasignado Tortilla de Patatas del menú del Miércoles");

    console.log(rm);

    // Cambia la posición de los platos del menú del Lunes: Patatas fritas se intercambia por Lentejas con Arroz
    rm.changeDishesPositionsInMenu(menu1, dish1, dish2);
    console.log("Platos intercambiados en Menú del lunes");
    console.log(rm);

    // Obtenemos los platos en una categoría, que recibe una función de ordenación como parámetro opcional
    function sortDishesName(str1, str2) {
      return str1.dish.name.localeCompare(str2.dish.name);
    }

    let dishesCat1 = rm.getDishesInCategory(cat4, sortDishesName);
    console.log("--- Platos en categoría 1: ---");
    console.log(dishesCat1.next());
    console.log(dishesCat1.next());
    console.log(dishesCat1.next());
    console.log(dishesCat1.next());
    console.log(dishesCat1.next());

    let dishesAllergen1 = rm.getDishesWithAllergen(all1);
    console.log("--- Platos con alérgeno de Lactosa: ---");
    console.log(dishesAllergen1.next());
    console.log(dishesAllergen1.next());

    // Función que devuelve true or false dependiendo de si el plato comienza con A
    function searchDishesStartingWithP(value) {
      return value.dish.name.startsWith("A");
    }

    let dishes = rm.findDishes(sortDishesName, searchDishesStartingWithP);
    console.log("--- Platos con filtro: empiezan por A ---");
    console.log(dishes.next()); // Arroz con caldo
    console.log(dishes.next()); // No existen más platos que comiencen por la A

    // Patatas fritas se encuentra en tres categorías, un alérgeno y un menú.
    // Lo borramos y queda desasignado de todo.
    rm.removeDish(dish1);
    console.log(rm);
  } catch (error) {
    console.log(error);
  }
}

testObjects();
testManager();
