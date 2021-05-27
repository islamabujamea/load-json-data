import React from 'react';
import { connect } from 'react-redux'
import { addData } from './action';
import './App.css';




function App({ addData, data }) {

  return (

    <div className="App">
      <h1>Store Data in redux Store</h1>
      <button onClick={addData}>Add Data</button>
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
                  <td>{val.isEditable ?<a href='./edit-product.js'> <button >Edit</button></a> : null}</td>
                </tr>
              )
            })}
          </tbody>
        </table>}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ data: state.data })

const mapDispatchToProps = (dispatch) => {
  return {
    addData: () => dispatch(addData)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
