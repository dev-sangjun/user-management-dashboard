import { useDispatch } from "react-redux";
import Table from "../components/Table";
import { AppDispatch, RootState } from "../store";
import { openModal } from "../store/modal.reducer";
import { useEffect } from "react";
import { asyncFetchEntries } from "../store/entry.reducer";
import { useSelector } from "react-redux";
import { getUser } from "../store/user.reducer";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => getUser(state));
  const handleAddBtnClick = () => {
    dispatch(openModal("ENTRY_FORM"));
  };
  useEffect(() => {
    if (user.customFields) {
      dispatch(asyncFetchEntries({}));
    } else {
      dispatch(openModal("CUSTOM_FIELDS_FORM"));
    }
  }, [user, dispatch]);
  return (
    <div className="flex flex-col justify-center items-center p-32 gap-2 w-full h-full bg-slate-200">
      <div className="w-full flex gap-2 justify-between">
        <SearchBar />
        <button
          className="btn btn-sm btn-outline normal-case"
          onClick={handleAddBtnClick}
        >
          Add
        </button>
      </div>
      <Table />
    </div>
  );
};

export default Dashboard;
