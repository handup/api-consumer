import request from 'request-promise-native';

const GtfsRealtimeBindings = require('gtfs-realtime-bindings')
const operatorD = require('./operators.json')
const BSDATA = require('./BAStops.json')
const GTFSRealTime = require('./GTFS-RT.json')

export const FindStopTrip = (trip, stopId) => {
  return trip.tripUpdate.stopTimeUpdate.find(x => x.stopId === stopId)
}

export const getStopTime = (timeUpdate) =>{
  if(timeUpdate.departure)
    return timeUpdate.departure.time
  else
    return timeUpdate.arrival.time
}

const FilterTrips = async (agencyID, stopId) => {
  const response = RTrequest(agencyID)
  return response.then(y=> y.filter(x => !!FindStopTrip(x, stopId)))
}

export const getTripsFromStop = async (agencyID, stopId) => {
    const response = FilterTrips(agencyID, stopId)
    return response.then( y=> {
      return y.sort((a, b) => getStopTime(FindStopTrip(a, stopId)) - getStopTime(FindStopTrip(b, stopId)) )
  })
}

const RTrequest = async (agencyID) => {

  const url = 'http://api.511.org/transit/tripupdates?api_key=028dd11b-45fe-411f-842c-a71399a9b656&agency=' + agencyID
  let response = await fetch(url);
  if (response.ok) {
  const bufferRes = await response.arrayBuffer();
  const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(bufferRes));

  return feed.entity
  } else {
  return {}
  }
}

const StopsRequest = async (agencyID) =>{
  const response = await fetch('http://api.511.org/transit/stops?api_key=028dd11b-45fe-411f-842c-a71399a9b656&operator_id=' + agencyID);
  const data = await response.json();
  return data
}

export const TripData = (agencyID) =>{
  return RTrequest(agencyID)
}

export const StopsData = async (agencyID) =>{
  let response = await StopsRequest(agencyID)
  return response.Contents.dataObjects.ScheduledStopPoint.filter(x=> x.Extensions.LocationType === "0")
  
}

export const Operators = () => {
    return operatorD
}