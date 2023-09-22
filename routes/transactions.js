const authMiddleware = require("../middleware/auth.middleware");

const router = require("express").Router();
const TransactionModel = require("../models/TransactionModel");

router.post("/all", authMiddleware, async (req, res) => {
  try {
    console.log(req.body)
    if(req.body.date){
      let date =req.body.date
      req.body.date={
        $gte:new Date(new Date(date).setHours(0,0,0)).toISOString(),
        $lt:new Date(new Date(date).setHours(23,59,59)).toISOString(),
      }
      console.log(req.body)
    }
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
