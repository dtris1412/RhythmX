import { getAllUsers as getAllUsersService } from "../services/userService.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (e) {
    console.error("Error in getAllUsers:", e); // Thêm dòng này để xem lỗi chi tiết
    res.status(500).json({ mess: "Error fetching users" });
  }
};

export { getAllUsers };
