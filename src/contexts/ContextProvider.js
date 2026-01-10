import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { enquiriesData as initialEnquiries } from '../data/dummy';
import { BranchService } from '../services/branch.service';
import { PackageService } from '../services/package.service';
import { PricingService } from '../services/pricing.service';

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
  const [packages, setPackages] = useState([]);
  const [packageLoading, setPackageLoading] = useState(false);
  const [pricing, setPricing] = useState([]);
  const [pricingLoading, setPricingLoading] = useState(false);

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
      // console.log('Fetched branches:', res.branches);
      console.log('branches data',res)
      setBranches(res.branches);
      
    } catch (err) {
      toast.error('Failed to load branches.');
    }
    setBranchLoading(false);
  }, []);

  const addBranch = useCallback(async (data) => {
    try {
      const res=await BranchService.createBranch(data);
      console.log('creating branch',res)
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

  const fetchPackages = useCallback(async () => {
    setPackageLoading(true);
    try {
      const res = await PackageService.getAll();
      setPackages(res.data);
    } catch (err) {
      toast.error('Failed to load packages.');
    }
    setPackageLoading(false);
  }, []);

  const addPackage = useCallback(async (data) => {
    await PackageService.create(data);
    fetchPackages();
  }, [fetchPackages]);

  const updatePackage = useCallback(async (id, data) => {
    await PackageService.update(id, data);
    fetchPackages();
  }, [fetchPackages]);

  const deletePackage = useCallback(async (id) => {
    try {
      await PackageService.remove(id);
      setPackages(prev => prev.filter(pkg => pkg._id !== id));
      toast.success('Package deleted successfully');
    } catch (err) {
      toast.error('Failed to delete package');
    }
  }, []);

    const fetchPricing = useCallback(async () => {
    setPricingLoading(true);
    try {
      const res = await PricingService.getAll();
      setPricing(res.data);
    } catch (err) {
      toast.error('Failed to load pricing.');
    }
    setPricingLoading(false);
  }, []);

  const addPricing = useCallback(async (data) => {
    await PricingService.create(data);
    fetchPricing();
  }, [fetchPricing]);

  const updatePricing = useCallback(async (id, data) => {
    await PricingService.update(id, data);
    fetchPricing();
  }, [fetchPricing]);

  const deletePricing = useCallback(async (id) => {
    try {
      await PricingService.remove(id);
      setPricing(prev => prev.filter(pkg => pkg._id !== id));
      toast.success('Pricing deleted successfully');
    } catch (err) {
      toast.error('Failed to delete pricing');
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
    packages,
    fetchPackages,
    addPackage,
    updatePackage,
    deletePackage,
    packageLoading,
    pricing,
    fetchPricing,
    addPricing,
    updatePricing,
    deletePricing,
    pricingLoading,
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
    packages,
    packageLoading,
    fetchPackages,
    addPackage,
    updatePackage,
    deletePackage,
    pricing,
    pricingLoading,
    fetchPricing,
    addPricing,
    updatePricing,
    deletePricing,
  ]);

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
