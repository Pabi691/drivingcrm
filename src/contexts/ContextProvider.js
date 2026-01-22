import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { enquiriesData as initialEnquiries } from '../data/dummy';
import { BranchService } from '../services/branch.service';
import { PackageService } from '../services/package.service';
import { PricingService } from '../services/pricing.service';
import { InstructorService } from '../services/instructor.service';
import { LearnerService } from '../services/Learner';
import { bookingService } from '../services/booking.service';

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
  const [instructors, setInstructors] = useState([]);
  const [instructorLoading, setInstructorLoading] = useState(false);
  const [instructorWorkingDays, setInstructorWorkingDays] = useState([])
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [IsUpdate, setIsUpdate] = useState(false);
  const [IsBooked, setIsBooked]=useState(false)


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




  // Fetch all learners
  const fetchLearners = useCallback(async () => {
    setLoading(true);
    try {
      const res = await LearnerService.getAll();
      console.log('learner', res.data)
      setLearners(res.data);
    } catch (err) {
      toast.error('Failed to load learners.');
    }
    setLoading(false);
  }, []);

  // Add a new learner
  const addLearner = useCallback(
    async (data) => {
      try {
        const res = await LearnerService.create(data);
        console.log('response to add', res)
        toast.success('Learner added successfully');
        fetchLearners();
      } catch (err) {
        toast.error('Failed to add learner');
      }
    },
    [fetchLearners]
  );

  // Update a learner
  const updateLearner = useCallback(
    async (id, data) => {
      try {
        await LearnerService.update(id, data);
        toast.success('Learner updated successfully');
        fetchLearners();
      } catch (err) {
        toast.error('Failed to update learner');
      }
    },
    [fetchLearners]
  );

  // Delete a learner
  const deleteLearner = useCallback(
    async (id) => {
      try {
        const res = await LearnerService.remove(id);
        console.log('learned deleted', res)
        setLearners((prev) => prev.filter((l) => l._id !== id));
        toast.success('Learner deleted successfully');
      } catch (err) {
        toast.error('Failed to delete learner');
      }
    },
    []
  );

  const fetchBranches = useCallback(async () => {
    setBranchLoading(true);
    try {
      const res = await BranchService.getAll();
      // console.log('Fetched branches:', res.branches);
      console.log('branches data', res)
      setBranches(res.branches);

    } catch (err) {
      toast.error('Failed to load branches.');
    }
    setBranchLoading(false);
  }, []);

  const addBranch = useCallback(async (data) => {
    try {
      const res = await BranchService.createBranch(data);
      console.log('creating branch', res)
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

  const fetchInstructors = useCallback(async () => {
    setInstructorLoading(true);
    try {
      const res = await InstructorService.getAll();
      // console.log('Fetched instructors:', res.data);
      setInstructors(res.data);
    } catch (err) {
      toast.error('Failed to load instructors.');
    }
    setInstructorLoading(false);
  }, []);



  const addInstructor = useCallback(async (data) => {
    const res = await InstructorService.create(data);
    console.log('instructor created', res)
    fetchInstructors();
  }, [fetchInstructors]);

  const updateInstructor = useCallback(async (id, data) => {
    await InstructorService.update(id, data);
    fetchInstructors();
  }, [fetchInstructors]);


  // approve instructor 
  const approvedInstructor = useCallback(async (id) => {
    try {
      const res = await InstructorService.approveInstructor(id);
      console.log('approve', res)
      return res;
    } catch (err) {
      toast.error('Could not approved ')
    }
  }, []);


  const deleteInstructor = useCallback(async (id) => {
    try {
      await InstructorService.remove(id);
      setInstructors(prev => prev.filter(instructor => instructor._id !== id));
      toast.success('Instructor deleted successfully');
    } catch (err) {
      toast.error('Failed to delete instructor');
    }
  }, []);


  const fetchInstructorWorkingDays = useCallback(async (instructorId) => {
    try {
      const res = await InstructorService.instructorWorkingDays(instructorId);
      console.log('instructor working days ', res)
      return res.data

    } catch (err) {
      toast.error('Failed to delete instructor');
    }
  }, []);


  const instructorWorkingDaysCreateAndUpdate = useCallback(async (data) => {
    try {
      const res = await InstructorService.instructorWorkingDayCreateAndUpdate(data);
      console.log('instructor working hours', res)
      setIsUpdate(Prev => !Prev)

      return res.data;

    } catch (err) {
      console.log('error to get working hours', err)
      toast.error('failed to update workings days ');
    }
  }, [fetchInstructorWorkingDays]);

  const GetBooking = useCallback(async (instructorId) => {
    try {
      const res = await bookingService.getAll(instructorId);
      console.log('get bookings', res)


      return res.data;

    } catch (err) {
      throw err;
    }
  })

  const createBooking = useCallback(async (data) => {
    try {
      const res = await bookingService.create(data);
      console.log('creating ', res)


      return res.data;

    } catch (err) {
      throw err;
    }
  }, [GetBooking])


  useEffect(() => {
    fetchBranches();
    fetchInstructors();
    fetchPackages();
    fetchLearners()
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
    instructors,
    fetchInstructors,
    addInstructor,
    updateInstructor,
    approvedInstructor,
    deleteInstructor,
    instructorLoading,
    fetchInstructorWorkingDays,
    instructorWorkingDaysCreateAndUpdate,

    // === ADD LEARNERS ===
    learners,

    fetchLearners,
    addLearner,
    updateLearner,
    deleteLearner,
    IsUpdate,
    GetBooking,
    createBooking
 


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
    instructors,
    instructorLoading,
    fetchInstructors,
    addInstructor,
    updateInstructor,
    deleteInstructor,
    approvedInstructor,
    fetchInstructorWorkingDays,

    // === ADD LEARNERS DEPENDENCIES ===
    learners,
    fetchLearners,
    addLearner,
    updateLearner,
    deleteLearner,
    IsUpdate,
    GetBooking,
    IsBooked,
    createBooking
  ]);


  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
