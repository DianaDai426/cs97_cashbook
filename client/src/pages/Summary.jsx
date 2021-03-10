import React, { useContext, useState} from "react";
import Header from "../components/Header";
import {AuthContext} from '../context/auth';
import { useQuery } from '@apollo/react-hooks';
import { Statistic, Table, Progress } from 'semantic-ui-react'
import { FETCH_SUMMARY} from '../util/graphql';
import { Chart } from "react-google-charts";

function Summary(props) {
  const {user} = useContext(AuthContext);
  const [summary, setSummary] = useState([]);

  const  {data: { getSummary : records} = {}} = useQuery(FETCH_SUMMARY, {
    fetchPolicy: "network-only",
    onCompleted(){
        let arr = [];
        if(records){
          console.log(records);
        }
        /*percents for bars*/
        records.foodPer = (100*records.food/records.sum).toFixed(2);
        records.healthPer = (100*records.health/records.sum).toFixed(2);
        records.housingPer = (100*records.housing/records.sum).toFixed(2);
        records.clothingPer = (100*records.clothing/records.sum).toFixed(2);
        records.entertainmentPer = (100*records.entertainment/records.sum).toFixed(2);
        records.transportPer = (100*records.transport/records.sum).toFixed(2);
        records.otherPer = (100*records.other/records.sum).toFixed(2);
        setSummary(records)
    }
  });



  return (
    <div>
      <Header />
      {user && (
        <div class="ui huge green statistics">
          <div class="statistic">
            <div class="value">
              ${summary.sum}
            </div>
            <div class="label">
              Total Money Spent
            </div>
          </div>
        </div>
      )}
      {user && (
        <table class="ui celled table">
            <thead>
              <tr><th>Purpose</th>
              <th>Amount Spent</th>
            </tr></thead>
            <tbody>
              <tr>
                <td data-label="Purpose">Food</td>
                <td data-label="Amount Spent">${summary.food}</td>
              </tr>
              <tr>
                <td data-label="Purpose">Health</td>
                <td data-label="Amount Spent">${summary.health}</td>
              </tr>
              <tr>
                <td data-label="Purpose">Housing</td>
                <td data-label="Amount Spent">${summary.housing}</td>
              </tr>
              <tr>
                <td data-label="Purpose">Clothing</td>
                <td data-label="Amount Spent">${summary.clothing}</td>
              </tr>
              <tr>
                <td data-label="Purpose">Entertainment</td>
                <td data-label="Amount Spent">${summary.entertainment}</td>
              </tr>
              <tr>
                <td data-label="Purpose">Transportation</td>
                <td data-label="Amount Spent">${summary.transport}</td>
              </tr>
              <tr>
                <td data-label="Purpose">Others</td>
                <td data-label="Amount Spent">${summary.other}</td>
              </tr>
            </tbody>
          </table>
      )}
      {user && (
        <Progress percent={summary.foodPer} color='orange' progress='percent'>Food </Progress>
      )}
      {user && (
        <Progress percent={summary.healthPer} color='red' progress='percent'>Health </Progress>
      )}
      {user && (
        <Progress percent={summary.housingPer} color='green' progress='percent'>Housing </Progress>
      )}
      {user && (
        <Progress percent={summary.clothingPer} color='violet' progress='percent'>Clothing </Progress>
      )}
      {user && (
        <Progress percent={summary.entertainmentPer} color='pink' progress='percent'>Entertainment </Progress>
      )}
      {user && (
        <Progress percent={summary.transportPer} color='blue' progress='percent'>Transportation </Progress>
      )}
      {user && (
        <Progress percent={summary.otherPer} color='grey' progress='percent'>Other </Progress>
      )}



      <Chart
      width={'800px'}
      height={'400px'}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ['Expense', 'percent'],
        ['Food', summary.food],
        ['Health', summary.health],
        ['Housing', summary.housing],
        ['Clothing', summary.clothing],
        ['Entertainment', summary.entertainment], // Below limit.
        ['Transportation', summary.transport],
        ['Other', summary.other],  // Below limit.
      ]}
      options={{
        sliceVisibilityThreshold: 0.01,
        pieStartAngle: 100,
        slices: {
      0: { color: '#F2711C' },
      1: { color: '#DB2828' },
      2: { color: '#21BA45' },
      3: { color: '#6435C9' },
      4: { color: '#E03997' },
      5: { color: '#2185D0' },
      6: { color: '#767676' },
    
    },
      }}
      rootProps={{ 'data-testid': '7' }}
    />

    </div>
  );

}


export default Summary;
