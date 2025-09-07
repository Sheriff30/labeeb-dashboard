import { createContext, useContext, useEffect, useState } from "react";

export type schoolData = {
  name: string;
  city: string;
  district: string;
  category: string;
  schoolStage: string[];
  accountName: string;
  email: string;
  numberOfStudents: string;
  numberOfBranches: string;
};
type UserContextType = {
  schoolData: schoolData;
  setSchoolData: React.Dispatch<React.SetStateAction<schoolData>>;
};
const UserContext = createContext<UserContextType | null>(null);

const defaultSchoolData: schoolData = {
  name: "مدرسة رياض نجد",
  city: "makkah",
  district: "alsharafiyah",
  category: "boys",
  schoolStage: ["kindergarten"],
  accountName: "محمد حسين",
  email: "m29026753@gmail.com",
  numberOfStudents: "",
  numberOfBranches: "",
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [schoolData, setSchoolData] = useState<schoolData>(defaultSchoolData);

  return (
    <UserContext.Provider value={{ schoolData, setSchoolData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
