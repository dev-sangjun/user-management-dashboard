import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

type ModalType = "ENTRY_FORM" | "ENTRY_VIEW" | null;

interface ModalState {
  modalType: ModalType;
}

const initialState: ModalState = {
  modalType: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload;
    },
    closeModal: state => {
      state.modalType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const getModalType = (state: RootState) => state.modalReducer.modalType;

export default modalSlice.reducer;
