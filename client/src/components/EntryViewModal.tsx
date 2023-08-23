import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { closeModal, getModalType } from "../store/modal.reducer";
import { USER_ENTRY_FIELD_NAMES } from "../global/constants";
import { formatValue } from "../utils";
import { useDispatch } from "react-redux";
import { IEntry } from "../global/types";

interface EntryViewModalProps {
  entry?: IEntry;
}

const EntryViewModal: React.FC<EntryViewModalProps> = ({ entry }) => {
  const dispatch = useDispatch<AppDispatch>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalType = useSelector((state: RootState) => getModalType(state));
  const renderEntryDetails = () => {
    if (!entry) {
      return null;
    }
    return Object.entries(entry).map(([key, value]) => {
      if (key === "other") {
        return Object.entries(value).map(([key, value]) => (
          <div key={key} className="flex gap-4">
            <span className="font-bold w-1/4">
              {USER_ENTRY_FIELD_NAMES?.[key] || key}
            </span>
            <span className="whitespace-pre">
              {formatValue(key, value as string)}
            </span>
          </div>
        ));
      }
      return (
        <div key={key} className="flex gap-4">
          <span className="font-bold w-1/4">
            {USER_ENTRY_FIELD_NAMES?.[key] || key}
          </span>
          <span className="whitespace-pre">{formatValue(key, value)}</span>
        </div>
      );
    });
  };
  useEffect(() => {
    if (dialogRef.current) {
      if (modalType === "ENTRY_VIEW") {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [modalType]);
  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box flex flex-col gap-2 ">
        <h3 className="font-bold text-lg">User Data Entry</h3>
        {renderEntryDetails()}
        <button
          type="button"
          className="btn btn-sm btn-primary normal-case"
          onClick={() => dispatch(closeModal())}
        >
          Close
        </button>
      </div>
    </dialog>
  );
};

export default EntryViewModal;
