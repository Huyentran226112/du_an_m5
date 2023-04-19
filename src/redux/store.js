import { createStore } from "redux";
import { applyMiddleware } from "redux";

//1. Khai báo action

//2. Khai báo reducer
import rootReducer from './reducer';

//3. Khai báo store
// Tạo middleware myMiddleware
const myMiddleware = (store) => (next) => (action) => {
    next(action);
};

const store = createStore(rootReducer,applyMiddleware(myMiddleware));

// theo dõi trạng thái
store.subscribe(() => {
    console.log(store.getState())
});

// Export ra để dùng ở các component
export default store;