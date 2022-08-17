import { createSelector } from 'reselect';

import { RootState } from '../../store';

export const selectModalReducer = (state: RootState) => state.modal;

export const selectIsDestinationModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isDestinationModalOpen
);

export const selectIsFilterModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isFilterModalOpen
);

export const selectIsHeaderDestinationModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isHeaderDestinationModalOpen
);

export const selectIsUserInfoModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isUserInfoModalOpen
);

export const selectIsCalendarModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isCalendarModalOpen
);

export const selectIsWishManageModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isWishManageModalOpen
);

export const selectIsPaymentCompleteModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isPaymentCompleteModalOpen
);

export const selectIsLoginModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isLoginModalOpen
);

export const selectIsUserModifyModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isUserModifyModalOpen
);

export const selectIsErrorModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isErrorModalOpen
);

export const selectIsAdminAddCategoryModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isAdminAddCategoryModalOpen
);

export const selectIsAdminEditCategoryModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isAdminEditCategoryModalOpen
);

export const selectIsAdminEventModalOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isAdminEventModalOpen
);
