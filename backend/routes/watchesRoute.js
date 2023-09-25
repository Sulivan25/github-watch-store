import express from "express";
import { Watch } from "../models/watchModel.js";

const router = express.Router();

//Route for Save a new Watch
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.price ||
      !request.body.description
    ) {
      return response.status(400).send({
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    const newWatch = {
      name: request.body.name,
      price: request.body.price,
      description: request.body.description,
    };

    const watch = await Watch.create(newWatch);

    return response.status(500).send(watch);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Get ALl Watches from server
router.get("/", async (request, response) => {
  try {
    const watches = await Watch.find({});

    return response.status(200).json({
      count: watches.length,
      data: watches,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Get 1 watch from server by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const watch = await Watch.findById(id);

    return response.status(200).json({ watch });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for update a watch
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.price ||
      !request.body.description
    ) {
      return response.status(400).send({
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    const { id } = request.params;
    const result = await Watch.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({
        message: "Watch not found",
      });
    }
    return response.status(200).send({
      message: "Watch updated",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Delete a watch
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Watch.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({
        message: "Watch not found",
      });
    }
    return response.status(200).send({
      message: "Watch deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
