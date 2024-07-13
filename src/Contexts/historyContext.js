import { logDOM } from '@testing-library/react';
import React, { createContext, useState, useCallback } from 'react';

const LoadingState = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
};



export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_SERVERR_DOMAIN;

  const [history, setHistory] = useState([]);

  const [averageCoordinate, setAverageCoordinate] = useState(null);
  const [loadingState, setLoadingState] = useState(LoadingState.IDLE);
  console.log('state from context', history, averageCoordinate, loadingState)

  const updateHistory = useCallback((newHistory) => {
    setHistory(newHistory);
  }, []);

  const updateCoordinate = useCallback((coordinate) => {
    setAverageCoordinate(coordinate);
  }, []);


  const fetchData = useCallback(async (email) => {

    try {
      console.log('fetchHistory called')
      setLoadingState(LoadingState.LOADING);
      const response = await fetch(`${API_URL}/get_transcripts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });

      if (response.status === 204) {
        updateHistory([]);
        setLoadingState(LoadingState.LOADED);
        console.log('204 No data available for this user.');
        return;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      updateHistory(jsonData);
      setLoadingState(LoadingState.LOADED);

    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoadingState(LoadingState.LOADED);
    }
  }, [API_URL, updateHistory]);

  const fetchCoordinate = useCallback(async (email) => {

    try {
      console.log('fetchCoordinate called')
      setLoadingState(LoadingState.LOADING);
      const response = await fetch(`${API_URL}/get_average_emotion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });
      if (response.status === 204) {
        updateCoordinate('No Data'); // Set averageCoordinate to null if no data
        setLoadingState(LoadingState.LOADED); // Set loading state to LOADED after fetching
        return;
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      updateCoordinate(jsonData[0].average_emotion);
      setLoadingState(LoadingState.LOADED);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoadingState(LoadingState.LOADED);
    }
  }, [API_URL, updateCoordinate]);




  return (
    <HistoryContext.Provider value={{ history, averageCoordinate, fetchData, fetchCoordinate, loadingState }}>
      {children}
    </HistoryContext.Provider>
  );
};