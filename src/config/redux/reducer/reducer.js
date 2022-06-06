import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import createBlogReducer from "./createTourReduser";

const reducer = combineReducers({homeReducer, createBlogReducer})

export default reducer;