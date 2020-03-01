<?php
require('CountriesController.php');
require('object/Country.php');
require('object/SearchResults.php');

$controller = new CountriesController();

$countries = $controller->getCountries($_GET["searchCriteria"], $_GET["type"]);

$countriesArray = array();
//The api can return either 1 object or an array of objects
if(is_array($countries[0])){
    foreach($countries as $country){
        $countryClass = new Country($country);
        array_push($countriesArray, $countryClass);
    }
}
else{
    $countryClass = new Country($countries);
    array_push($countriesArray, $countryClass);
}
$finalResults = new SearchResults($countriesArray);

echo json_encode($finalResults);