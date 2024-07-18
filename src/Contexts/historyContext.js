import React, { createContext, useState, useCallback } from 'react';
import { json } from 'react-router-dom';

const LoadingFetchAquarium = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
};

const LoadingFetchMemories = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
};



export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;

  const [history, setHistory] = useState([]);
  const [averageCoordinate, setAverageCoordinate] = useState(null);
  const [highestQuadrant, setHighestQuadrant] = useState(null);
  const [loadingFetchAquarium, setLoadingFetchAquarium] = useState(LoadingFetchAquarium.IDLE);
  const [loadingFetchMemories, setLoadingFetchMemories] = useState(LoadingFetchMemories.IDLE);
  console.log('state from context', history, averageCoordinate)

  const updateHistory = useCallback((newHistory) => {
    setHistory(newHistory);
  }, []);

  const updateCoordinate = useCallback((coordinate) => {
    setAverageCoordinate(coordinate);
  }, []);


  const fetchData = useCallback(async (email) => {

    try {
      console.log('fetchHistory called')
      setLoadingFetchMemories(LoadingFetchMemories.LOADING);
      const response = await fetch(`${API_URL}/get_transcripts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });

      if (response.status === 204) {
        updateHistory([]);
        setLoadingFetchMemories(LoadingFetchMemories.LOADED);
        console.log('204 No data available for this user.');
        return;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      updateHistory(jsonData);
      setLoadingFetchMemories(LoadingFetchMemories.LOADED);

    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoadingFetchMemories(LoadingFetchMemories.LOADED);
    }
  }, [API_URL, updateHistory]);



  const fetchAquariumData = useCallback(async (email) => {
    try {
      console.log('fetchAquariumData called')
      setLoadingFetchAquarium(LoadingFetchMemories.LOADING);
      const response = await fetch(`${API_URL}/get_aquarium_data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });
      if (response.status === 204) {
        updateCoordinate('No Data'); // Set averageCoordinate to null if no data
        setHighestQuadrant('No Data')
        setLoadingFetchAquarium(LoadingFetchMemories.LOADED);
        return;
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      setHighestQuadrant(jsonData.quadrant_score)
      updateCoordinate(jsonData.average_emotion);
      setLoadingFetchAquarium(LoadingFetchMemories.LOADED);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoadingFetchAquarium(LoadingFetchMemories.LOADED);
    }
  }, [API_URL, updateCoordinate]);


  const updateAquariumData = useCallback(async (email) => {
    try {
      console.log('updateAquariumData called')
      const response = await fetch(`${API_URL}/update_aquarium_data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });
      if (response.status === 204) {

        return;
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();

    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }, [API_URL]);



  return (
    <HistoryContext.Provider value={{ history, averageCoordinate, fetchData, fetchAquariumData, loadingFetchMemories, loadingFetchAquarium,highestQuadrant ,updateAquariumData}}>
      {children}
    </HistoryContext.Provider>
  );
};