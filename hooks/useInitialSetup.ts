import { useEffect } from "react";
import { initAudio } from "../modules/audio";
import { initFirebase } from "../modules/firebase";

export function useInitialSetup() {
  useEffect(() => {
    initAudio();
    initFirebase();
  }, []);
}
