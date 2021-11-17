import { combineReducers } from "redux";
import user from "./user_reducers";
//import user from "./user_reducer";

//rootReducer에서 combineReducers를 통해 reducer들을 하나로 합쳐준다.
const rootReducer = combineReducers({
	user
});

export default rootReducer;
