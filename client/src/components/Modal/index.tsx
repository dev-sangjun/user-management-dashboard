import { useEffect, useRef } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { isModalOpen } from "../../store/modal.reducer";
import useEntryForm from "./useEntryForm";

const Modal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = useSelector((state: RootState) => isModalOpen(state));
  const { registerers, onSubmit } = useEntryForm();
  const renderInputs = () =>
    Object.values(registerers).map((registerer, idx) => (
      <input
        key={idx}
        type={registerer.name === "birthDate" ? "date" : "text"}
        className="input input-sm input-bordered w-full text-[16px]"
        placeholder={registerer.name}
        {...registerer}
      />
    ));
  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);
  return (
    isOpen && (
      <dialog className="modal" ref={dialogRef}>
        <form
          method="dialog"
          className="modal-box flex flex-col gap-2 "
          onSubmit={onSubmit}
        >
          <h3 className="font-bold text-lg">User Data Entry Form</h3>
          {renderInputs()}
          <div className="flex mx-auto">
            <button className="btn btn-sm btn-link normal-case no-underline text-slate-500">
              Close
            </button>
            <button className="btn btn-sm btn-primary normal-case no-underline">
              Confirm
            </button>
          </div>
        </form>
      </dialog>
    )
  );
};

export default Modal;
