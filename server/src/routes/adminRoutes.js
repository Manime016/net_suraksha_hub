// // import express from "express";
// // import { getAdminDashboard } from "../controllers/adminController.js";
// // // Comment these out temporarily if the middleware is still giving you trouble
// // // import { protect, adminOnly } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // // Publicly accessible for a quick test
// // router.get("/dashboard", getAdminDashboard);

// // export default router;

// import express from "express";
// // 1. Make sure getAllUsers is imported here!
// import { getAdminDashboard, getAllUsers } from "../controllers/adminController.js";

// const router = express.Router();

// // This is http://localhost:5000/api/admin/dashboard
// router.get("/dashboard", getAdminDashboard);

// // THIS LINE FIXES THE 404 ERROR
// // This is http://localhost:5000/api/admin/users
// router.get("/users", getAllUsers);

// export default router;


// import express from "express";
// import auth from "../middleware/authMiddleware.js";
// import role from "../middleware/roleMiddleware.js";

// import {
//     getAdminDashboard,
//     getAllUsers,
//     approveCertificate
// } from "../controllers/adminController.js";

// const router = express.Router();

// // http://localhost:5000/api/admin/dashboard
// router.get("/dashboard", getAdminDashboard);

// // http://localhost:5000/api/admin/users
// router.get("/users", getAllUsers);

// // http://localhost:5000/api/admin/approve-certificate
// router.post(
//     "/approve-certificate",
//     auth,
//     role("admin"),
//     approveCertificate
// );

// export default router;



// import express from "express";
// import auth from "../middleware/authMiddleware.js";
// import role from "../middleware/roleMiddleware.js";

// import {
//     getAdminDashboard,
//     getAllUsers,
//     approveCertificate,
//     rejectCertificate,
//     getPendingCertificates
// } from "../controllers/adminController.js";


// const router = express.Router();

// /* DASHBOARD */
// router.get(
//     "/dashboard",
//     auth,
//     role("admin"),
//     getAdminDashboard
// );

// /* USERS */
// router.get(
//     "/users",
//     auth,
//     role("admin"),
//     getAllUsers
// );

// /* 🔔 FETCH PENDING CERTIFICATE REQUESTS */
// router.get(
//     "/certificates/pending",
//     auth,
//     role("admin"),
//     getPendingCertificates
// );

// /* ✅ APPROVE CERTIFICATE */
// router.post(
//     "/approve-certificate",
//     auth,
//     role("admin"),
//     approveCertificate
// );


// router.get(
//     "/pending-certificates",
//     auth,
//     role("admin"),
//     getPendingCertificates
// );

// router.post(
//     "/reject-certificate",
//     auth,
//     role("admin"),
//     rejectCertificate
// );


// export default router;


// // import express from "express";

// // import { getAdminDashboard } from "../controllers/adminController.js";

// // // Comment these out temporarily if the middleware is still giving you trouble

// // // import { protect, adminOnly } from "../middleware/authMiddleware.js";



// // const router = express.Router();



// // // Publicly accessible for a quick test

// // router.get("/dashboard", getAdminDashboard);



// // export default router;



// import express from "express";

// // 1. Make sure getAllUsers is imported here!

// import { getAdminDashboard, getAllUsers } from "../controllers/adminController.js";



// const router = express.Router();



// // This is http://localhost:5000/api/admin/dashboard

// router.get("/dashboard", getAdminDashboard);



// // THIS LINE FIXES THE 404 ERROR

// // This is http://localhost:5000/api/admin/users

// router.get("/users", getAllUsers);



// export default router;





// import express from "express";

// import auth from "../middleware/authMiddleware.js";

// import role from "../middleware/roleMiddleware.js";



// import {

//     getAdminDashboard,

//     getAllUsers,

//     approveCertificate

// } from "../controllers/adminController.js";



// const router = express.Router();



// // http://localhost:5000/api/admin/dashboard

// router.get("/dashboard", getAdminDashboard);



// // http://localhost:5000/api/admin/users

// router.get("/users", getAllUsers);



// // http://localhost:5000/api/admin/approve-certificate

// router.post(

//     "/approve-certificate",

//     auth,

//     role("admin"),

//     approveCertificate

// );



// export default router;







// import express from "express";
// import auth from "../middleware/authMiddleware.js";
// import role from "../middleware/roleMiddleware.js";

// // Ensure these functions are correctly exported from your adminController.js
// import {
//     getAdminDashboard,
//     getAllUsers,
//     approveCertificate,
//     rejectCertificate,
//     getPendingCertificates
// } from "../controllers/adminController.js";

// const router = express.Router();

// /* 📊 DASHBOARD STATISTICS */
// router.get("/dashboard", auth, role("admin"), getAdminDashboard);

// /* 👥 USER MANAGEMENT */
// router.get("/users", auth, role("admin"), getAllUsers);

// /* 🔔 FETCH CERTIFICATES (Calls the same function for both tabs) */
// router.get("/pending-certificates", auth, role("admin"), getPendingCertificates);

// /* ✅ APPROVE CERTIFICATE (Matches POST http://localhost:5000/api/admin/approve-certificate) */
// router.post("/approve-certificate", auth, role("admin"), approveCertificate);

// /* ❌ REJECT CERTIFICATE */
// router.post("/reject-certificate", auth, role("admin"), rejectCertificate);

// export default router;


import express from "express";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

import {
    getAdminDashboard,
    getAllUsers,
    approveCertificate,
    rejectCertificate,
    getPendingCertificates,
    createAdmin // <--- 1. Import the new function
} from "../controllers/adminController.js";

const router = express.Router();

/* 📊 DASHBOARD STATISTICS */
router.get("/dashboard", auth, role("admin"), getAdminDashboard);

/* 👥 USER MANAGEMENT */
router.get("/users", auth, role("admin"), getAllUsers);

/* 🛡️ ADMIN MANAGEMENT */
// 2. Add the route here
router.post("/add-admin", auth, role("admin"), createAdmin);

/* 🔔 FETCH CERTIFICATES */
router.get("/pending-certificates", auth, role("admin"), getPendingCertificates);

/* ✅ APPROVE CERTIFICATE */
router.post("/approve-certificate", auth, role("admin"), approveCertificate);

/* ❌ REJECT CERTIFICATE */
router.post("/reject-certificate", auth, role("admin"), rejectCertificate);

export default router;