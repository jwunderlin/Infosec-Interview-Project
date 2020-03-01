<?php
/**
 * Contract for final search results. Contains the logic for calculating region/sub region aggregate and total countries
 */
require('CountryRegion.php');
class SearchResults
{
    public $countries;
    public $totalCountryCount;
    public $regionCount;
    public $subregionCount;

    public function __construct(array $data) {
        $this->countries = $this->sortCountryData($data);
        $this->totalCountryCount = $this->calculateCountryCount($data);
        $this->regionCount = $this->calculateRegionCount($data);
        $this->subregionCount = $this->calculateSubregionCount($data);
    }

    private function sortCountryData($countries) {
        function sortByPopulation($a, $b){
            if ($a->population == $b->population) {
                return 0;
            }
            return ($a->population > $b->population) ? -1 : 1;
        }
        usort($countries, "sortByPopulation");

        return $countries;
    }

    private function calculateCountryCount($countries) {
        return count($countries);
    }

    private function calculateRegionCount($countries) {
        $regionArray = array();
        foreach($countries as $country){
            $regionArray = $this->calculateArray($regionArray, $country->region);
        }
        return $regionArray;
    }

    private function calculateSubregionCount($countries) {
        $subregionArray = array();
        foreach($countries as $country){
            $subregionArray = $this->calculateArray($subregionArray, $country->subregion);
        }
        return $subregionArray;
    }

    private function calculateArray($array, $searchElement) {
        $elementFound=false;
        //if the seach element matches a name in the array, then increment the count,
        //otherwise add the search element with a count of 1 to the array
        foreach ( $array as $key => $element ) {
            if ( $searchElement === $element->name ) {
                $array[$key]->total++;
                $elementFound = true;
            }
        }

        if(!$elementFound){
            $newRegion = new CountryRegion($searchElement, 1);
            array_push($array, $newRegion);
        }
        return $array;
    }
}
?>