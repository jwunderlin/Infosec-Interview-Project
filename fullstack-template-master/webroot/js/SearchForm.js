//This componenet handles displaying the search criteria form.

class SearchForm extends React.Component {
  render() {
    const { formClass, invalidFeedbackMessage, submitClicked} = this.props;

    return (
      <div>
        <form onSubmit={submitClicked}>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="countryName">Country Name</label>
              <input type="text" class={formClass} id="countryName"/>
              <div class="invalid-feedback">
                {invalidFeedbackMessage}
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="countryCode">Country Code</label>
              <input type="text" class={formClass} id="countryCode"/>
            </div>
            <div class="pl-1">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}