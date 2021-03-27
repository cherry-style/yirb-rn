import * as firebase from "firebase";
import "firebase/database";
import { config } from "./config";

export function initFirebase() {
  firebase.initializeApp(config);
}
