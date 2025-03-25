import { PersonalityTest } from "../models/personalityTestModel.js";
import { v7 as uuidv7 } from "uuid";
import { now } from "../utils/date.js";

export const getAllPersonalityTests = async (req, res) => {
  try {
    const personalityTests = await PersonalityTest.getAllPersonalityTests();

    res.status(200).json({ success: true, data: personalityTests });
  } catch (err) {
    console.error("Error fetching personality tests:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const insertPersonalityTest = async (req, res) => {
  try {
    const { test_title, url, user_id } = req.body;

    if (!test_title || !url) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: test_title or url",
      });
    }

    const newPersonalityTest = {
      test_id: uuidv7(),
      test_title,
      url,
      created_at: now(),
      created_by: user_id,
    };

    await PersonalityTest.insertPersonalityTest(newPersonalityTest);

    res
      .status(201)
      .json({ success: true, message: "Personality Test added successfully" });
  } catch (err) {
    console.error("Error inserting personality tests:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
