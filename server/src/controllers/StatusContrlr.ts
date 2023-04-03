import StatusModel from "../model/Status.js";

export const createStatus = async (req: any, res: any) => {
  try {
    const document = new StatusModel(req.body);

    const status = await document.save();
    res.json(status);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Creating status failed",
    });
  }
};

export const updateStatus = async (req: any, res: any) => {
  try {
    const statusID = req.params.id;
    await StatusModel.updateOne(
      {
        _id: statusID,
      },
      req.body
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot update status",
    });
  }
};

export const removeStatus = async (req: any, res: any) => {
  try {
    const statusID = req.params.id;
    await StatusModel.findByIdAndRemove(statusID);
    res.status(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot find status",
    });
  }
};

export const getAllStatuses = async (req: any, res: any) => {
  try {
    const status = await StatusModel.find();
    res.json(status);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve statuses",
    });
  }
};

export const getOneStatus = async (req: any, res: any) => {
  try {
    const statusID = req.params.id;
    const status = await StatusModel.findById(statusID);
    res.json(status);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve status",
    });
  }
};
