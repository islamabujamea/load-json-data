import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addData, } from './action';
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
import exportedData from "./productData.json";

export default class App extends Component {
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
  const dispatch = useDispatch();

  const { data } = useSelector(s => s);

  console.log(data)

  useEffect(() => {
    dispatch(addData(exportedData))
  }, [])

  return (
    <div className="App">

      <div className="table table-striped">
        {data.length > 0 && <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Weight</th>
              <th>Availability</th>
              <th>isEditable</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
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
  const dispatch = useDispatch();
  const { selectedProduct: productInfo = {} } = useSelector(s => s);

  console.log('productInfo is', productInfo);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_SELECTED_PROD', payload: value,
    })
  }, [value])


  const [name, setName] = React.useState(productInfo?.product_name);
  const [weight, setWeight] = React.useState(productInfo?.weight);
  const [availability, setAvailability] = React.useState(productInfo?.availability);
  const [url, setUrl] = React.useState(productInfo?.url);
  const [tier, setTier] = React.useState(productInfo?.price_tier);
  const [range, setRange] = React.useState(productInfo?.price_range);
  const [isEditable, setIsEditable] = React.useState(productInfo?.isEditable);
  const options = ['$1-10', '$11-20', '$21-49'];
  const options2 = ['$50-100', '$100-199', '$200+'];


  function handleSubmit(event) {
    event.preventDefault();

    dispatch({
      type: 'UPDATE_PRODUCT', payload: {
        id: productInfo?._id,
        name: name,
        weight: weight,
        availability: availability,
        url: url,
        tier: tier,
        range: range,
        isEditable: isEditable

      }
    })

  }


  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} >
        <h1>Edit {productInfo?.product_name} Product</h1>
        <fieldset>
          <label>
            Name:
        <input
              name="name"
              type="text"
              value={name !== undefined ? name : productInfo?.product_name}
              onChange={e => setName(e.target.value)}
              required />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Weight:
        <input
              name="weight"
              type="text"
              value={weight !== undefined ? weight : productInfo?.weight}
              onChange={e => setWeight(e.target.value)}
              required />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Availability:
        <input
              name="availability"
              type="number"
              value={availability !== undefined ? availability : productInfo?.availability}
              onChange={e => setAvailability(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Url:
        <input
              name="url"
              type="text"
              value={url !== undefined ? url : productInfo?.url}
              onChange={e => setUrl(e.target.value)}
              required />
          </label>
        </fieldset>
        <fieldset>
          <label> Price Tier:
          <div onChange={e => setTier(e.target.value)}>
              <input type="radio" value="budget" name="tier" checked={(tier === undefined ? productInfo?.price_tier : tier) === 'budget' ? true : false} /> Budget
        <input type="radio" value="premium" name="tier" checked={(tier === undefined ? productInfo?.price_tier : tier) === 'premium' ? true : false} /> Premium
      </div>
          </label>
        </fieldset>
        <fieldset>
          <label> Price Range
            <Dropdown
              options={tier === 'budget' ? options : options2}
              onChange={e =>
                setRange(e.value)
              }
              value={range !== undefined ? range : productInfo?.price_range}
              placeholder="Select Price Range" />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <input
              name="isEditable"
              type="checkbox"
              value={isEditable !== undefined ? isEditable : productInfo?.isEditable}
              defaultChecked={isEditable !== undefined ? isEditable : productInfo?.isEditable}
              onChange={() => setIsEditable(!isEditable)}
              required />
        I IsEditable
      </label>
        </fieldset>
        <button> Submit</button>
      </form>
    </div>
  )
}


