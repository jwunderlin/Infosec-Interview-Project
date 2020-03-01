<?php
/**
 * Contract for country data
 */
class Country
{
    public $name;
    public $alpha2Code;
    public $alpha3Code;
    public $flag;
    public $region;
    public $subregion;
    public $population;
    public $languages;

    //initial mapping from api json to php object
    public function __construct(array $data) {
        foreach($data as $key => $val) {
            if(property_exists(__CLASS__,$key)) {
                $this->$key = $val;
            }
        }
    }
}
?>