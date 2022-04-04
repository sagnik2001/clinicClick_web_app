const Doctors = require("../../../models/Doctors");
const { isValidObjectId } = require("mongoose");

const getController = async (req, res) => {
  try {
    const decodedValue = req.user;

    if (!decodedValue)
      return res.status(403).json("No Authorization Token Sent");
    const id = decodedValue._id;

    if (!isValidObjectId(id)) {
      return res.status(403).json("Invalid User");
    }

    const doctor = await Doctors.findOne({ _id: id });
    if (!doctor) return res.status(403).json("No Such User has Logged In");

    console.log(doctor.appointments);

    return res.status(200).json(doctor);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllDocController = async (req, res) => {
  try {
    const doctor = await Doctors.find(); // get all the posts stored in database

    res.status(200).json(doctor);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getDoctorById = async (req,res) =>{
  try{
    const doctorId = req.params.id;
    const findDoctor = await Doctors.findOne({_id:doctorId});
    if(findDoctor){
      return res.status(200).json(findDoctor)
    }
    else
    return res.status(403).json("Doctor not found");

  }
  catch(err){
    return res.status(500).json(err.message);
  }
}

module.exports = { getController ,getAllDocController , getDoctorById};
