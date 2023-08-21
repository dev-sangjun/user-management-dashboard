import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { closeModal, getModalType } from "../store/modal.reducer";
import { useDispatch } from "react-redux";
import userAPI from "../api/user.api";
import { asyncFetchUser } from "../store/user.reducer";

const ADDITIONAL_INPUT_NAME_PREFIX = "additional";

const CustomFieldsFormModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [additionalInputCount, setAdditionalInputCount] = useState(0);
  const handleClose = async () => {
    try {
      const res = await userAPI.updateCustomFields();
      if (!res.success) {
        throw new Error("Something went wrong");
      }
      dispatch(asyncFetchUser());
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(closeModal());
    }
  };
  // const onSubmit = handleSubmit(async data => {
  //   if (formRef.current) {
  //     const additionalInputObj: { [key: string]: string } = {};
  //     const additionalInputList = Object.values(formRef.current)
  //       .filter(
  //         element =>
  //           element instanceof HTMLInputElement &&
  //           element.name.includes(ADDITIONAL_INPUT_NAME_PREFIX)
  //       )
  //       .map((element: HTMLInputElement) => element.value);
  //     // Go through additionalInputList, use elements at even idx as field keys & odd idx as field values
  //     // Only add valid key-value pairs to additionalInputObj
  //     additionalInputList.forEach((_, idx) => {
  //       if (idx % 2 === 1) {
  //         const fieldKey = additionalInputList[idx - 1];
  //         const fieldValue = additionalInputList[idx];
  //         if (fieldKey && fieldValue) {
  //           additionalInputObj[fieldKey] = fieldValue;
  //         }
  //       }
  //     });
  //     try {
  //       await entryAPI.addEntry({
  //         ...data,
  //         other: additionalInputObj,
  //         address: data.address.split("\n"),
  //       });
  //       reset();
  //       await dispatch(asyncFetchEntries());
  //       dispatch(closeModal());
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // });
  const renderAdditionalInputs = () => {
    return Array(additionalInputCount)
      .fill(0)
      .map((_, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            name={`${ADDITIONAL_INPUT_NAME_PREFIX}-key-${idx}`}
            className="input input-sm input-bordered text-[16px] w-1/3"
            placeholder="Field Name"
          />
          <input
            name={`${ADDITIONAL_INPUT_NAME_PREFIX}-value-${idx}`}
            className="input input-sm input-bordered w-full text-[16px]"
            placeholder="Field Value"
          />
        </div>
      ));
  };
  const modalType = useSelector((state: RootState) => getModalType(state));
  useEffect(() => {
    if (dialogRef.current) {
      if (modalType === "CUSTOM_FIELDS_FORM") {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [modalType]);
  return (
    <dialog className="modal" ref={dialogRef}>
      <form className="modal-box flex flex-col gap-2 ">
        <h3 className="font-bold text-lg">Custom Fields Form</h3>
        {renderAdditionalInputs()}
        <button
          type="button"
          className="btn btn-sm btn-ghost normal-case w-fit mx-auto"
          onClick={() => setAdditionalInputCount(prev => prev + 1)}
        >
          +
        </button>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="btn btn-sm btn-ghost normal-case"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary normal-case"
            onClick={() => dispatch(closeModal())}
          >
            Add
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default CustomFieldsFormModal;
