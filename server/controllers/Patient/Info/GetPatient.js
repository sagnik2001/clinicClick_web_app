const Patients = require("../../../models/Patients");
const { isValidObjectId } = require("mongoose");

const getPatientInfo = async (req, res) => {
  try {
    const decodedValue = req.user;

    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue.patientid;

    if (!isValidObjectId(id)) {
      return res.status(403).json("Invalid User");
    }
    const patient = await Patients.findOne({ _id: id });
    if (!patient) return res.status(403).json("No Such User has Logged In");
    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { getPatientInfo };