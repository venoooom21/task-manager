import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
router.get('/statistics', async (req, res) => {
  try {
    const totalSales = await todoModel.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const netSales = await todoModel.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const todos = await todoModel.countDocuments();


    res.json({
      totalSales: totalSales[0]?.total || 0,
      netSales: netSales[0]?.total || 0,
      todos,
      productsSold: productsSold[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Move a to-do to trash
app.put('/api/todos/:id/trash', async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).send("To-do moved to trash");
  } catch (error) {
    res.status(500).send("Error moving to-do to trash");
  }
});

// Empty trash
app.delete('/api/todos/trash/empty', async (req, res) => {
  try {
    await Todo.deleteMany({ deleted: true });
    res.status(200).send("Trash emptied");
  } catch (error) {
    res.status(500).send("Error emptying trash");
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));