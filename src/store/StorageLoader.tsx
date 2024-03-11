import { useEffect } from "react";
import { loadGptData } from "../pages/GPT/gptSlice";
import { loadBeastiaryData } from "../pages/MonsterFactory/beastiarySlice";
import { useAppDispatch } from "./hooks";
import { loadSdData } from "../pages/SD/sdSlice";

const StorageLoader: React.FC = () => {
  const dispatch = useAppDispatch();

  // init
  useEffect(() => {
    dispatch(loadGptData());
    dispatch(loadSdData());
    dispatch(loadBeastiaryData());
  }, []);
  return <div></div>;
};

export default StorageLoader;
