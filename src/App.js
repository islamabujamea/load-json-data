import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addData } from './action';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

var products = addData.payload;

class App extends Component {
  render() {
    return <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <DisplayProducts />
          </Route>
          <Route
            path="/edit/:value"
          >
            <EditProduct />
          </Route>
        </Switch>
      </div>
    </Router>;
  }
}


function DisplayProducts() {
  return (
    <div className="App">
      <div className="table table-striped">
        {products.length > 0 && <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Weight</th>
              <th>Availability</th>
              <th>isEditable</th>
            </tr>
          </thead>
          <tbody>
            {products.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{val.product_name}</td>
                  <td>{val.weight}</td>
                  <td>{val.availability}</td>
                  <td>{val.isEditable ?
                    <div>
                      <Link to={`/edit/${val._id}`} >Edit</Link>
                    </div>
                    : null}</td>
                </tr>
              )
            })}
          </tbody>
        </table>}
      </div>
    </div>

  );
}

function EditProduct() {
  var { value } = useParams();
  var productInfo = products.find((item) => item._id === Number(value));

  const [name, setName] = React.useState(productInfo.product_name);
  const [weight, setWeight] = React.useState(productInfo.weight);
  const [availability, setAvailability] = React.useState(productInfo.availability);
  const [url, setUrl] = React.useState(productInfo.url);
  const [tier, setTier] = React.useState(productInfo.price_tier);
  const [range, setRange] = React.useState(productInfo.price_range);
  const [isEditable, setIsEditable] = React.useState(productInfo.isEditable);
  const options = ['$1-10', '$11-20', '$21-49'];
  const options2 = ['$50-100', '$100-199', '$200+'];



  return (
    <form
      //onSubmit={handleSubmit}
    >

      <h1>Edit {productInfo.product_name} Product</h1>

      <label>
        Name:
        <input
          name="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required />
      </label>

      <label>
        Weight:
        <input
          name="weight"
          type="text"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          required />
      </label>

      <label>
        Availability:
        <input
          name="availability"
          type="number"
          value={availability}
          onChange={e => setAvailability(e.target.value)}
        />
      </label>

      <label>
        Url:
        <input
          name="url"
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required />
      </label>

      <div onChange={e => setTier(e.target.value)}>
        <input type="radio" value="budget" name="tier" checked={tier === 'budget' ? true : false} /> Budget
        <input type="radio" value="premium" name="tier" checked={tier === 'premium' ? true : false} /> Premium
      </div>

      <Dropdown
        options={tier === 'budget' ? options : options2}
        onChange={e =>
          setRange(e.value)
        }
        value={range}
        placeholder="Select Product Range" />;

      <label>
        <input
          name="isEditable"
          type="checkbox"
          value={isEditable}
          defaultChecked={isEditable}
          onChange={() => setIsEditable(!isEditable)}
          required />
        I IsEditable
      </label>

      <button>Submit</button>
    </form>
  );
}




const mapDispatchToProps = (dispatch) => {
  return {
    addData: () => dispatch(addData)
  }
}

export default connect(mapDispatchToProps)(App);


