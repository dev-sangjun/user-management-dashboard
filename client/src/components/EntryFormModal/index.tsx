import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "../../store";
import { closeModal, getModalType } from "../../store/modal.reducer";
import useEntryForm from "./useEntryForm";
import { USER_STATUS } from "../../global/types";
import { useDispatch } from "react-redux";
import entryAPI from "../../api/entry.api";
import { asyncFetchEntries } from "../../store/entry.reducer";
import { useSelector } from "react-redux";
import {
  USER_ENTRY_DEFAULT_KEYS,
  USER_ENTRY_FIELD_NAMES,
} from "../../global/constants";
import { getUser } from "../../store/user.reducer";
import { CustomFields } from "../../global/entity.types";

const EntryFormModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modalType = useSelector((state: RootState) => getModalType(state));
  const customFields = useSelector(
    (state: RootState) => getUser(state).customFields
  );
  const renderCustomFields = () => {
    if (!customFields) {
      return null;
    }
    return Object.entries(customFields).map(([key, value]) => {
      return (
        <input
          key={key}
          name={key}
          className="input input-sm input-bordered w-full text-[16px]"
          type={value}
          placeholder={key}
        />
      );
    });
  };
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { registerers, handleSubmit, reset } = useEntryForm();
  const onSubmit = handleSubmit(async data => {
    if (formRef.current) {
      const additionalInputObj: CustomFields = {};
      Object.values(formRef.current)
        .filter(
          element =>
            element instanceof HTMLInputElement &&
            !USER_ENTRY_DEFAULT_KEYS.includes(element.name)
        )
        .forEach((element: HTMLInputElement) => {
          additionalInputObj[element.name] = element.value;
        });
      try {
        await entryAPI.addEntry({
          ...data,
          other: additionalInputObj,
          address: data.address.split("\n"),
        });
        reset();
        await dispatch(asyncFetchEntries({}));
        dispatch(closeModal());
      } catch (e) {
        console.error(e);
      }
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
        {renderCustomFields()}
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
