import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getModalType } from "../store/modal.reducer";
import EntryFormModal from "./EntryFormModal";
import EntryViewModal from "./EntryViewModal";
import { getSelectedEntry } from "../store/entry.reducer";

const Modal = () => {
  const modalType = useSelector((state: RootState) => getModalType(state));
  const selectedEntry = useSelector((state: RootState) =>
    getSelectedEntry(state)
  );
  switch (modalType) {
    case "ENTRY_FORM":
      return <EntryFormModal />;
    case "ENTRY_VIEW":
      return <EntryViewModal entry={selectedEntry} />;
    default:
      return null;
  }
};

export default Modal;
