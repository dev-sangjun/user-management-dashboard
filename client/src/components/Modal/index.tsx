import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { closeModal, isModalOpen } from "../../store/modal.reducer";
import useEntryForm from "./useEntryForm";
import { USER_STATUS } from "../../global/types";
import { useDispatch } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = useSelector((state: RootState) => isModalOpen(state));
  const { registerers, onSubmit } = useEntryForm();
  const renderInputs = () => {
    // render different HTML elements based on registerer name
    const getInputType = (registererName: string) => {
      switch (registererName) {
        case "birthDate":
          return "date";
        case "address":
          return "textarea";
        default:
          return "text";
      }
    };
    return Object.values(registerers).map((registerer, idx) => {
      switch (registerer.name) {
        case "status":
          return (
            <select
              key={idx}
              name="status"
              className="select select-bordered"
              defaultValue={USER_STATUS[0]}
              {...registerer}
            >
              {USER_STATUS.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          );
        case "address":
          return (
            <textarea
              key={idx}
              name="address"
              rows={5}
              className="textarea textarea-bordered"
              placeholder="address"
              {...registerer}
            />
          );
        default:
          return (
            <input
              key={idx}
              type={getInputType(registerer.name)}
              className="input input-sm input-bordered w-full text-[16px]"
              placeholder={registerer.name}
              {...registerer}
            />
          );
      }
    });
  };
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
            <button
              className="btn btn-sm btn-link normal-case no-underline text-slate-500"
              onClick={() => dispatch(closeModal())}
            >
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
