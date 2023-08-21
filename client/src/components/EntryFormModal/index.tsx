import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "../../store";
import { closeModal, getModalType } from "../../store/modal.reducer";
import useEntryForm from "./useEntryForm";
import { USER_STATUS } from "../../global/types";
import { useDispatch } from "react-redux";
import entryAPI from "../../api/entry.api";
import { asyncFetchEntries } from "../../store/entry.reducer";
import { useSelector } from "react-redux";
import { USER_ENTRY_FIELD_NAMES } from "../../global/constants";

const EntryFormModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modalType = useSelector((state: RootState) => getModalType(state));
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { registerers, handleSubmit, reset } = useEntryForm();
  const onSubmit = handleSubmit(async data => {
    try {
      await entryAPI.addEntry({
        ...data,
        other: {},
        address: data.address.split("\n"),
      });
      reset();
      await dispatch(asyncFetchEntries());
      dispatch(closeModal());
    } catch (e) {
      console.error(e);
    }
  });
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
              placeholder={
                USER_ENTRY_FIELD_NAMES?.[registerer.name] || "Address"
              }
              {...registerer}
            />
          );
        default:
          return (
            <input
              key={idx}
              type={getInputType(registerer.name)}
              className="input input-sm input-bordered w-full text-[16px]"
              placeholder={
                USER_ENTRY_FIELD_NAMES?.[registerer.name] || registerer.name
              }
              {...registerer}
            />
          );
      }
    });
  };
  // const renderAdditionalInputs = () => {
  //   return Array(additionalInputCount)
  //     .fill(0)
  //     .map((_, idx) => (
  //       <div key={idx} className="flex gap-2">
  //         <input
  //           name={`${ADDITIONAL_INPUT_NAME_PREFIX}-key-${idx}`}
  //           className="input input-sm input-bordered text-[16px] w-1/3"
  //           placeholder="Field Name"
  //         />
  //         <input
  //           name={`${ADDITIONAL_INPUT_NAME_PREFIX}-value-${idx}`}
  //           className="input input-sm input-bordered w-full text-[16px]"
  //           placeholder="Field Value"
  //         />
  //       </div>
  //     ));
  // };
  useEffect(() => {
    if (dialogRef.current) {
      if (modalType === "ENTRY_FORM") {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [modalType]);
  return (
    <dialog className="modal" ref={dialogRef}>
      <form
        method="dialog"
        className="modal-box flex flex-col gap-2 "
        onSubmit={onSubmit}
        ref={formRef}
      >
        <h3 className="font-bold text-lg">User Data Entry Form</h3>
        {renderInputs()}
        <div className="flex mx-auto">
          <button
            type="button"
            className="btn btn-sm btn-link normal-case no-underline text-slate-500 hover:no-underline"
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
  );
};

export default EntryFormModal;
