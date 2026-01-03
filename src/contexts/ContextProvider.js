import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
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
      prev.map(e => (e.EnquiryID === id ? { ...e, isViewed: true } : e))
    );
  };

  const fetchBranches = useCallback(async () => {
    setBranchLoading(true);
    try {
      const res = await BranchService.getAll();
      setBranches(res.branches);
    } catch (err) {
      toast.error('Failed to load branches.');
    }
    setBranchLoading(false);
  }, []);

  const addBranch = useCallback(async (data) => {
    try {
      await BranchService.create(data);
      fetchBranches(); // Safe because fetchBranches is stable with useCallback
      toast.success('Branch created successfully');
    } catch (err) {
      toast.error('Failed to add branch');
    }
  }, [fetchBranches]);

  const updateBranch = useCallback(async (id, data) => {
    try {
      await BranchService.update(id, data);
      fetchBranches(); // Safe
      toast.success('Branch updated successfully');
    } catch (err) {
      toast.error('Failed to update branch');
    }
  }, [fetchBranches]);

  const deleteBranch = useCallback(async (id) => {
    try {
      await BranchService.remove(id);
      setBranches(prev => prev.filter(branch => branch._id !== id));
      toast.success('Branch deleted successfully');
    } catch (err) {
      toast.error('Failed to delete branch');
    }
  }, []);

  // ✅ Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
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
    fetchBranches,
    addBranch,
    updateBranch,
    deleteBranch,
    branchLoading,
  }), [
    currentColor,
    currentMode,
    activeMenu,
    screenSize,
    isClicked,
    themeSettings,
    enquiries,
    branches,
    branchLoading,
    unreadEnquiriesCount,
    fetchBranches,
    addBranch,
    updateBranch,
    deleteBranch,
  ]);

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
