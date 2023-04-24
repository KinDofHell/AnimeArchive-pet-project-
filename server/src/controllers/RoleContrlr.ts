import RoleModel from "../model/Role.js";

export const createRole = async (req: any, res: any) => {
  try {
    const document = new RoleModel(req.body);

    const role = await document.save();
    res.json(role);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Creating role failed",
    });
  }
};

export const updateRole = async (req: any, res: any) => {
  try {
    const roleID = req.params.id;
    await RoleModel.updateOne(
      {
        _id: roleID,
      },
      req.body
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot update role",
    });
  }
};

export const removeRole = async (req: any, res: any) => {
  try {
    const roleID = req.params.id;
    await RoleModel.findByIdAndRemove(roleID);
    res.status(204).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot find role",
    });
  }
};

export const getAllRoles = async (req: any, res: any) => {
  try {
    const roles = await RoleModel.find();
    res.json(roles);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve roles",
    });
  }
};

export const getOneRole = async (req: any, res: any) => {
  try {
    const roleID = req.params.id;
    const role = await RoleModel.findById(roleID);
    res.json(role);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve role",
    });
  }
};
