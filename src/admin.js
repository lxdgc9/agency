import admin from "firebase-admin";

function runFbAdm(credential) {
  admin.initializeApp({
    credential: admin.credential.cert(credential),
  });

  console.log("Firebase running...");
}

export default runFbAdm;
