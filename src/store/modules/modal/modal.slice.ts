import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isDestinationModalOpen: boolean;
  isFilterModalOpen: boolean;
  isHeaderDestinationModalOpen: boolean;
  isUserInfoModalOpen: boolean;
  isCalendarModalOpen: boolean;
  isWishManageModalOpen: boolean;
  isPaymentCompleteModalOpen: boolean;
  isLoginModalOpen: boolean;
  isUserModifyModalOpen: boolean;
  isErrorModalOpen: boolean;
}

const initialState: ModalState = {
  isDestinationModalOpen: false,
  isFilterModalOpen: false,
  isHeaderDestinationModalOpen: false,
  isUserInfoModalOpen: false,
  isCalendarModalOpen: false,
  isWishManageModalOpen: false,
  isPaymentCompleteModalOpen: false,
  isLoginModalOpen: false,
  isUserModifyModalOpen: false,
  isErrorModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    radioDestinationModal: (state) => {
      state.isDestinationModalOpen = !state.isDestinationModalOpen;
    },
    radioFilterModal: (state) => {
      state.isFilterModalOpen = !state.isFilterModalOpen;
    },
    radioHeaderDestinationModal: (state) => {
      state.isHeaderDestinationModalOpen = !state.isHeaderDestinationModalOpen;
    },
    radioUserInfoModal: (state) => {
      state.isUserInfoModalOpen = !state.isUserInfoModalOpen;
    },
    setCalendarModal: (state) => {
      state.isCalendarModalOpen = !state.isCalendarModalOpen;
    },
    radioWishManageModal: (state) => {
      state.isWishManageModalOpen = false;
    },
    radioPaymentCompleteModal: (state) => {
      state.isPaymentCompleteModalOpen = !state.isPaymentCompleteModalOpen;
    },
    radioLoginModal: (state) => {
      state.isLoginModalOpen = !state.isLoginModalOpen;
    },
    radioUserModifyModal: (state) => {
      state.isUserModifyModalOpen = !state.isUserModifyModalOpen;
    },
    radioErrorModal: (state) => {
      state.isErrorModalOpen = !state.isErrorModalOpen;
    },
  },
});

export const modalAction = modalSlice.actions;
export default modalSlice.reducer;
