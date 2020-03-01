//This high level componenet handles validation, state, and the php api call.

class CountrySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: '', 
      countryCode: '',
      formClass: 'form-control',
      invalidFeedbackMessage: '',
      countryData: '',
      error: false,
      errorMessage: '',
    };
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    let $formName = event.target.countryName.value;
    let $formCode = event.target.countryCode.value;

    if(this.isNullOrWhiteSpace($formName) && this.isNullOrWhiteSpace($formCode)){
      this.setState({formClass:'form-control is-invalid', invalidFeedbackMessage:'At least one search criteria is required.'});
    }
    else if(!this.isNullOrWhiteSpace($formName) && !this.isNullOrWhiteSpace($formCode)){
      this.setState({formClass:'form-control is-invalid', invalidFeedbackMessage:'Only one search criteria can be searched for.'});
    }
    else{
      this.setState(
        {formClass:'form-control is-valid', invalidFeedbackMessage:'', countryName: $formName, countryCode: $formCode},
        () => this.callCountryApiData()
      );

      this.setState({countryData: $formName});
    }
  }

  callCountryApiData() {
    let baseUrl = "http://localhost:8765/api/index.php";
    let requestUrl = "";

    if(this.isNullOrWhiteSpace(this.state.countryName)){
      requestUrl = baseUrl + "?searchCriteria=" + this.state.countryCode + "&type=alpha";
    }
    else{
      requestUrl = baseUrl + "?searchCriteria=" + this.state.countryName + "&type=name";
    }

    this.setState(() => ({ error: false, errorMessage: '', countryData: ''}));
    axios.get(requestUrl)
      .then(response => {     
        this.setState(() => ({ countryData: response.data}));
      })
      .catch(error => { 
        if (error.response) {
          if(error.response.status == '404'){
            this.setState(() => ({ error: true, errorMessage: 'No countries found for given search criteria'}));
          }
          else{
            this.setState(() => ({ error: true, errorMessage: 'An error has occured when getting country data.'}));
          }
        }
      }); 
  }

  isNullOrWhiteSpace(str) {
    return (!str || str.length === 0 || /^\s*$/.test(str))
  }

  render() {
    let searchFormProps = {
      formClass: this.state.formClass,
      invalidFeedbackMessage: this.state.invalidFeedbackMessage,
      submitClicked: this.handleSubmit,
    };
    let errorAlertProps = {
      error: this.state.error,
      errorMessage: this.state.errorMessage,
    };
    return (
      <div>
        <ErrorAlert {...errorAlertProps} />
        <h4>Enter search criteria below.</h4>
        <div class="card">
          <div class="card-body">
            <SearchForm {...searchFormProps}/>  
          </div>
        </div>
        <br/>
        <br/>
        <CountryTable countryData = {this.state.countryData}></CountryTable>
      </div>
    );
  }
}