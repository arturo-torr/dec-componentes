import RestaurantsManager from "./restaurantsmanager.js";
import RestaurantsManagerController from "./restaurantsmanagerController.js";
import RestaurantsManagerView from "./restaurantsmanagerView.js";
import AuthenticationService from "./authentication/authentication.js";

const RestaurantManagerApp = new RestaurantsManagerController(
  RestaurantsManager.getInstance(),
  new RestaurantsManagerView(),
  AuthenticationService.getInstance()
);

export default RestaurantManagerApp;
