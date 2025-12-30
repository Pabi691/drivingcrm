import React, { createContext, useContext, useState } from 'react';
import { enquiriesData as initialEnquiries } from '../data/dummy';
import { BranchService } from '../services/branch.service';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [branches, setBranches] = useState([]);
  const [branchLoading, setBranchLoading] = useState(false);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  const unreadEnquiriesCount = enquiries.filter(e => !e.isViewed).length;

  const markAsViewed = (id) => {
    setEnquiries(prev =>
      prev.map(e =>
        e.EnquiryID === id ? { ...e, isViewed: true } : e
      )
    );
  };

  const fetchBranches = async () => {
    setBranchLoading(true);
    try {
      const res = await BranchService.getAllBranches();
      console.log('Branches fetched:', res.branches);
      if (res?.status) {
        setBranches(res.branches);
      }
    } catch (error) {
      console.error('Branch fetch failed', error);
    } finally {
      setBranchLoading(false);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider 
      value={{ 
        currentColor, 
        currentMode, 
        activeMenu, 
        screenSize, 
        setScreenSize, 
        handleClick, 
        isClicked, 
        initialState, 
        setIsClicked, 
        setActiveMenu, 
        setCurrentColor, 
        setCurrentMode, 
        setMode, 
        setColor, 
        themeSettings, 
        setThemeSettings, 
        enquiries, 
        setEnquiries, 
        unreadEnquiriesCount, 
        markAsViewed, 
        branches, 
        branchLoading, 
        fetchBranches }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
