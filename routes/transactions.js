const authMiddleware = require("../middleware/auth.middleware");

const router = require("express").Router();
const TransactionModel = require("../models/TransactionModel");

router.post("/all", authMiddleware, async (req, res) => {
  try {
    console.log(req.body)
    let data = await TransactionModel.find({ ...req.body,sendById:req.userId });

    res.json(data);
  } catch (error) {
    res.send(error.message);
  }
});
router.post("/all/delete", authMiddleware, async (req, res) => {
    try {
      let data = await TransactionModel.deleteMany({sendById:req.userId});
  
      res.json(data);
    } catch (error) {
      res.send(error.message);
    }
  });

router.post("/add/mock", authMiddleware, async (req, res) => {
  let mocks = req.body;
  console.log(req.userId);
  try {
    mocks.forEach((element) => {
      element.sendById = req.userId;
    });
    let transactions = await TransactionModel.insertMany(mocks);
    res.json(transactions);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
