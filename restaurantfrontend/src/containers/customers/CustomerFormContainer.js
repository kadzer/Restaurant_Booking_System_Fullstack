import React, {Component} from 'react';

class CustomerFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = { customers: []};
  }

  componentDidMount(){
    fetch('/customers')
    .then((res) => res.json())
    .then((data) => {
      this.setState({customers: data._embedded.customers})
    })
  }

  handleSubmit(event){
    event.preventDefault();
    fetch("/customers", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "name": event.target.name.value,
        "age": event.target.age.value,
        "contact": event.target.contact.value,
      })
    }).then(() => {
      window.location = "/customers";
    })
  }

  render() {

    // const options = this.state.bookings.map((booking, index) => {
    //   return <option key={index} value={booking._links.self.href}>{booking.name}</option>
    // })


    return (
        <form className="form" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Name" name="name" required/>
          <input type="number" placeholder="Age" name="age" min="15"/>
          <input type="text" placeholder="Contact" name="contact" required/>
          {/* <select name="booking">
            {options}
          </select>
          <input type="date" name="" /> */}
          <button type="submit">Save</button>
        </form>
    )
  }

}

export default CustomerFormContainer;
