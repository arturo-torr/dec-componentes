<?php

// Recoge los datos de formData
$jsonDataCategories = $_POST['jsonCategories'];
$jsonDataAllergens = $_POST['jsonAllergens'];
$jsonDataMenus = $_POST['jsonMenus'];
$jsonDataDishes = $_POST['jsonDishes'];
$jsonDataRestaurants = $_POST['jsonRestaurants'];

// Decodificar los JSON para poder ser leidos como un Array
$dataArrayCategories = json_decode($jsonDataCategories, true);
$dataArrayAllergens = json_decode($jsonDataAllergens, true);
$dataArrayMenus = json_decode($jsonDataMenus, true);
$dataArrayDishes = json_decode($jsonDataDishes, true);
$dataArrayRestaurants = json_decode($jsonDataRestaurants, true);

// Almacenamos todos los datos en un array asociativo
$allData = array(
    'categories' => $dataArrayCategories,
    'allergens' => $dataArrayAllergens,
    'menus' => $dataArrayMenus,
    'dishes' => $dataArrayDishes,
    'restaurants' => $dataArrayRestaurants,
);

// Obtener la fecha actual en día - mes- año - Hora - minutos
$fecha = date("dmY_Hi");

// Ruta donde se guardará el archivo y su nombre
$archivo = "./data/backup/{$fecha}-backup.json";

// Convertir el array a formato JSON, con JSON-UNESCAPDED-UNICODE para poder escribir Ñ y tildes
$jsonString = json_encode($allData, JSON_UNESCAPED_UNICODE);

// Escribir los datos en el archivo
file_put_contents($archivo, $jsonString);

// Responder al cliente
$respuesta = array('success' => true, 'message' => 'Los datos se han guardado de forma correcta.');
echo json_encode($respuesta);
