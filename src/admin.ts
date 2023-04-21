import {
  ServiceAccount,
  cert,
  initializeApp,
} from "firebase-admin/app";

import credential from "../credential.json";

function runFirebase() {
  initializeApp({
    credential: cert(credential as ServiceAccount),
  });

  console.log("Firebase running...");
}

export { runFirebase };
