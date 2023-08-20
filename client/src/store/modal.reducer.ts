import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true
    },
    closeModal: state => {
      state.isOpen = false
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const isModalOpen = (state: RootState) => state.modalReducer.isOpen;

export default modalSlice.reducer;
