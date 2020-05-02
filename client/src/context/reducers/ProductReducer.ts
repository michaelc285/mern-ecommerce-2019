import { IAction } from "../../types/interfaces";
const initialState = {
  isLoading: false,
  products: [],
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
