//This componenet handles displaying error messages.

class ErrorAlert extends React.Component {
  render() {
    const { error, errorMessage} = this.props;
    
    if (!error) {
      return null;
    }
    return (
      <div class="alert alert-danger" role="alert">
        Error: {errorMessage}
      </div>
    );
  }
}