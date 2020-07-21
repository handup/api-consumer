import React, { useState, useEffect } from 'react';
import {Operators, StopsData, FindStopTrip, getTripsFromStop, getStopTime} from '../../testData/getData'
import Dropdown from '../Dropdown'
import DataTable from '../DataTable'

const peek = x => {
  if(x) return x[x.length-1]
}

const getDestination = (x, stopNames )=> {
  const found = stopNames.find(y => 
    y.key === peek(x.tripUpdate.stopTimeUpdate).stopId
  )
  return found ? found.name : ""
}

const App =() =>{
  const [currentOperator, changeOperator] = useState("BA")
  const [currentStation, changeStation] = useState("")
  const [stopNames, setStopNames] = useState([])
  const [trips, setTrips] = useState([])


  const operatorNames = Operators().map(x => {return {name : x.Name, key : x.Id}})

  useEffect(() => {
    StopsData(currentOperator).then(y => setStopNames(y.map(x => {return {name: x.Name, key: x.id }})))
  }, [currentOperator]);
  
  useEffect(() => {
    if(stopNames.length)
    getTripsFromStop(currentOperator, currentStation).then(y => setTrips(y.map(x => {return {
        destination: getDestination(x, stopNames), 
        time: getStopTime(FindStopTrip(x, currentStation)),
        id: x.id
    }}
    )))
  }, [currentStation]);


  return (
    <div className="container mt-3">
          <center><h1>Trip Updates</h1></center>
          <div className="flex">
          <Dropdown className="column" elements={operatorNames}  defaultValue={currentOperator} 
                    onChange={(event) => { changeOperator(event.target.value)}}/>
          <Dropdown className="column" elements={stopNames}  defaultValue={currentStation}
                    onChange={(event) => { changeStation(event.target.value)}}/>
          </div>
          <DataTable totalRows={trips} rowsPerPage={6}/>
        </div>
  );
}

export default App;