import { useDispatch } from "react-redux";
import Table from "../components/Table";
import { AppDispatch } from "../store";
import { openModal } from "../store/modal.reducer";
import { useEffect } from "react";
import { asyncFetchEntries } from "../store/entry.reducer";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleAddBtnClick = () => {
    dispatch(openModal());
  };
  useEffect(() => {
    dispatch(asyncFetchEntries());
  }, [dispatch]);
  return (
    <div className="flex flex-col justify-center items-center p-32 gap-2 w-full h-full bg-slate-200">
      <button
        className="btn btn-sm btn-primary ml-auto"
        onClick={handleAddBtnClick}
      >
        Add
      </button>
      <Table />
    </div>
  );
};

export default Dashboard;
