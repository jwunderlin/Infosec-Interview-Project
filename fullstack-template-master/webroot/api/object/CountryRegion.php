<?php
/**
 * Contract for country region aggregate
 */
class CountryRegion
{
    public $name;
    public $total;

    public function __construct(string $name, int $total) {
        $this->name = $name;
        $this->total = $total;
    }
}
?>