// import Certificate from "../models/Certificate.js";
// import Course from "../models/Course.js";

// export const getMyCertificates = async (req, res) => {
//     const certs = await Certificate.find({ userId: req.user.id })
//         .populate("courseId", "title")
//         .populate("testResultId", "score total percentage")
//         .sort({ createdAt: -1 });

//     const response = certs.map(c => ({
//         _id: c._id,
//         title: c.courseId.title,
//         status: c.status,
//         issuedAt: c.issuedAt,
//         percentage: c.testResultId?.percentage || 0,
//         score: c.testResultId?.score || 0,
//         total: c.testResultId?.total || 0,
//         hash: c._id.toString().slice(-10).toUpperCase()
//     }));

//     res.json(response);
// };

// export const approveCertificate = async (req, res) => {
//     const { testResultId } = req.body;

//     const testResult = await TestResult.findById(testResultId);
//     if (!testResult || !testResult.passed) {
//         return res.status(400).json({ message: "Not eligible" });
//     }

//     let certificate = await Certificate.findOne({
//         userId: testResult.userId,
//         courseId: testResult.courseId
//     });

//     if (!certificate) {
//         certificate = await Certificate.create({
//             userId: testResult.userId,
//             courseId: testResult.courseId,
//             testResultId: testResult._id,
//             status: "APPROVED",
//             issuedAt: new Date()   // ✅ THIS WAS MISSING
//         });
//     } else {
//         certificate.status = "APPROVED";
//         certificate.issuedAt = new Date(); // ✅ ENSURE DATE
//         await certificate.save();
//     }

//     res.json(certificate);
// };

import Certificate from "../models/Certificate.js";

import Course from "../models/Course.js";

// src/controllers/certificateController.js


// Ensure 'export' is written before 'const'
export const getPendingCertificates = async (req, res) => {
    try {
        const allCerts = await Certificate.find()
            .populate("userId", "name email")
            .populate("courseId", "title")
            .populate("testResultId", "score total percentage")
            .sort({ createdAt: -1 });

        const formatted = allCerts.map(c => ({
            _id: c._id,
            user: c.userId,
            course: c.courseId,
            status: c.status,
            score: c.testResultId?.score || 0,
            total: c.testResultId?.total || 0,
            percentage: c.testResultId?.percentage || 0
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: "Failed to load certificates" });
    }
};

// ... keep your other exports (approveCertificate, rejectCertificate) here too

export const getMyCertificates = async (req, res) => {

    const certs = await Certificate.find({ userId: req.user.id })

        .populate("courseId", "title")

        .populate("testResultId", "score total percentage")

        .sort({ createdAt: -1 });



    const response = certs.map(c => ({

        _id: c._id,

        title: c.courseId.title,

        status: c.status,

        issuedAt: c.issuedAt,

        percentage: c.testResultId?.percentage || 0,

        score: c.testResultId?.score || 0,

        total: c.testResultId?.total || 0,

        hash: c._id.toString().slice(-10).toUpperCase()

    }));



    res.json(response);

};



export const approveCertificate = async (req, res) => {

    const { testResultId } = req.body;



    const testResult = await TestResult.findById(testResultId);

    if (!testResult || !testResult.passed) {

        return res.status(400).json({ message: "Not eligible" });

    }



    let certificate = await Certificate.findOne({

        userId: testResult.userId,

        courseId: testResult.courseId

    });



    if (!certificate) {

        certificate = await Certificate.create({

            userId: testResult.userId,

            courseId: testResult.courseId,

            testResultId: testResult._id,

            status: "APPROVED",

            issuedAt: new Date()   // ✅ THIS WAS MISSING

        });

    } else {

        certificate.status = "APPROVED";

        certificate.issuedAt = new Date(); // ✅ ENSURE DATE

        await certificate.save();

    }



    res.json(certificate);

};

// src/controllers/certificateController.js

/* ... other functions (getMyCertificates, etc.) ... */

// ✅ Ensure "export" is present and the name matches exactly
export const rejectCertificate = async (req, res) => {
    try {
        const { certificateId } = req.body;
        const cert = await Certificate.findById(certificateId);

        if (!cert) {
            return res.status(404).json({ message: "Certificate not found" });
        }

        cert.status = "REJECTED";
        await cert.save();

        res.json({ message: "Certificate rejected successfully" });
    } catch (err) {
        res.status(500).json({ message: "Rejection failed", error: err.message });
    }
};