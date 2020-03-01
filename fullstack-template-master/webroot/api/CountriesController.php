<?php
/**
 * This is wrapper around the logic to call the api
 */
class CountriesController
{
    static $ARTICLES_ENDPOINT = 'https://restcountries.eu/rest/v2/';

    //type determines the different search options (name or alpha)
    public function getCountries($searchCriteria, $type){
        return $this->get(self::$ARTICLES_ENDPOINT . $type . "/" . $searchCriteria);
    }
    
    private function get($endpoint){
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_URL => $endpoint,
            CURLOPT_FAILONERROR => true,
        ]);

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
        }
        curl_close($curl);

        if(isset($error_msg)){
            $data = explode(' ', $error_msg);
            $code = $data[5];
            http_response_code($code);
        }

        return json_decode($response, true);
    }
}