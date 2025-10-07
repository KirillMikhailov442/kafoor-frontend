import { create } from 'zustand';

interface ModalStore {
  modals: Record<string, boolean>;
  params: Record<string, string>;
  openModal: (name: string) => void;
  closeModal: (name: string) => void;
  toggleModal: (name: string) => void;
  setParam: ({ name, param }: { name: string; param: string }) => void;
  removeParam: (name: string) => void;
  closeAll: () => void;
}

export const useModals = create<ModalStore>(set => ({
  modals: {
    ['edit-profile']: false,
    ['create-quiz']: false,
    ['delete-quiz']: false,
  },
  params: {
    ['delete-quiz']: '',
  },

  openModal: name =>
    set(state => ({
      modals: { ...state.modals, [name]: true },
    })),

  closeModal: name =>
    set(state => ({
      modals: { ...state.modals, [name]: false },
    })),

  toggleModal: name =>
    set(state => ({
      modals: { ...state.modals, [name]: !state.modals[name] },
    })),

  setParam: ({ name, param }: { name: string; param: string }) =>
    set(state => ({ ...state, params: { ...state.params, [name]: param } })),

  removeParam: (name: string) =>
    set(state => ({ ...state, params: { ...state.params, [name]: '' } })),

  closeAll: () =>
    set(() => ({
      modals: {},
    })),
}));
