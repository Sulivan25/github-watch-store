import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import { Watch } from "./models/watchModel.js";
import watchesRoute from "./routes/watchesRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

//Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(204).send("welcome to SR");
});

app.use("/watches", watchesRoute);

//Route for Save a new Watch
app.post("/watches", async (request, response) => {
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
app.get("/watches", async (request, response) => {
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
app.get("/watches/:id", async (request, response) => {
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
app.put("/watches/:id", async (request, response) => {
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
app.delete("/watches/:id", async (request, response) => {
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
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
