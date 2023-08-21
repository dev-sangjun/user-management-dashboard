import { useDispatch } from "react-redux";
import Table from "../components/Table";
import { AppDispatch, RootState } from "../store";
import { isModalOpen, openModal } from "../store/modal.reducer";
import { useEffect } from "react";
import { asyncFetchEntries } from "../store/entry.reducer";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => isModalOpen(state));
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
      {isOpen && <Modal />}
    </div>
  );
};

export default Dashboard;
