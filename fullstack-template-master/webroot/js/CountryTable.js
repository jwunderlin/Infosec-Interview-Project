//This componenet handles displaying the api data in tables.

class CountryTable extends React.PureComponent { 
  render() { 
    const { countryData } = this.props;

    if(!countryData.countries){
      return null;
    }
    else{
      return (
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Alpha Code 2</th>
                <th scope="col">Alpha Code 3</th>
                <th scope="col">Flag</th>
                <th scope="col">Region</th>
                <th scope="col">Subregion</th>
                <th scope="col">Population</th>
                <th scope="col">Languages</th>
              </tr>
            </thead>
            <tbody>
                {countryData.countries.map(( country, index ) => {
                return (
                  <tr key={index}>
                    <td>{country.name}</td>
                    <td>{country.alpha2Code}</td>
                    <td>{country.alpha3Code}</td>
                    <td><img style={{width: '200px', height:'100px'}} src={country.flag} /></td>
                    <td>{country.region}</td>
                    <td>{country.subregion}</td>
                    <td>{country.population}</td>
                    <td>
                      {country.languages.map(( value, index ) => {
                        return (
                            <p>{value.name}</p>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr/>
          <h4>Total Countries: {countryData.totalCountryCount}</h4>
          <br/>
          <div class="d-flex justify-content-between">
            <div class="col-6">
              <h4>Region Totals</h4>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Count</th>
                  </tr>
                </thead>
                <tbody>
                    {countryData.regionCount.map(( region, index ) => {
                    return (
                      <tr key={index}>
                        <td>{region.name}</td>
                        <td>{region.total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div class="col-6">
              <h4>Subregion Totals</h4>
                <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Count</th>
                  </tr>
                </thead>
                <tbody>
                    {countryData.subregionCount.map(( subregion, index ) => {
                    return (
                      <tr key={index}>
                        <td>{subregion.name}</td>
                        <td>{subregion.total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  } 
}