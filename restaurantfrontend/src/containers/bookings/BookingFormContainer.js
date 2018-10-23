import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class BookingFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      customers: [],
      tables: [],
      bookings: [],
      startDate: moment()};
      this.handleDate = this.handleDate.bind(this);
      this.handleInput = this.handleInput.bind(this);
    }

    handleDate(date){
      this.setState({ startDate: date});
    }

    componentDidMount(){
      fetch('/bookings')
      .then((res) => res.json())
      .then((data) => {
        this.setState({bookings: data._embedded.bookings})
      })

      fetch('/customers')
      .then((res) => res.json())
      .then((data) => {
        this.setState({customers: data._embedded.customers})
      })

      fetch('/tables')
      .then((res) => res.json())
      .then((data) => {
        this.setState({tables: data._embedded.tables})
      })
    }


    handleSubmit(event){
      event.preventDefault();
      fetch("/bookings", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "name": event.target.customer.name.value,
          "age": event.target.customer.age.value,
          "contact": event.target.customer.contact.value,
          // "booking": event.target.booking.value
        })
      }).then(() => {
        window.location = "/bookings";
      })
    }

    handleInput(event){
      console.log(event.target.value);
    }

    render() {
      const customerOptions = this.state.customers.map((customer, index) => {
        return <option key={index} value={customer.name}></option>
      })

      const tableOptions = this.state.tables.map((table, index) => {
        return <option key={index} value={table._links.self.href}>{table.tableNumber}</option>
      })

      function defaultDatePicker() {
        document.getElementById('datePicker').value = new Date().toDateInputValue();
      }

      return (
        <div className="form-container">
          <h1>Create Booking</h1>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDate}
            showTimeSelect
            showTimeSelect
            minTime={moment().hours(12).minutes(0)}
            maxTime={moment().hours(22).minutes(30)}
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="LLL"
            timeCaption="time"
          />
          {/* <DatePicker className="date-picker" selected={this.state.startDate} onChange={this.handleChange} required/> */}
          <form className="form" onSubmit={this.handleSubmit}>

            <input type="text" list="customers" onInput={this.handleInput}/>
              <datalist id="customers">
                {customerOptions}
              </datalist>

            <input type="text" placeholder="Name" name="name" required/>
            <input type="number" placeholder="Age" name="age" min="15" required/>
            <input type="text" placeholder="Contact" name="contact" required/>

            {/* <input type="datetime-local" placeholder="DateTime" className="datetime" id="datePicker" required/> */}
            <select name="table" id="table">
              <option value="" disabled selected required>Select Table Number</option>
              {tableOptions}
            </select>
            <button type="submit" className="button">Save</button>
          </form>
        </div>
      )
    }

  }

  export default BookingFormContainer;
