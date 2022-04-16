import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";

export default combineReducers({
  /*using
  posts
  instead of 
  posts: posts 
  if key & value have the same name.*/
  posts: posts,
  auth: auth,
});
