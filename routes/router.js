const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.get("/getdata", async(req, res) => {
    try {
        const data = await User.find().sort({createdAt: -1})
        return res.status(200).json(data);

        
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
        
    }


});


router.post("/register", async (req, res) => {
  const { name, email, mobile, work, add, age, desc } = req.body;
  console.log(req.body);
  if (!name || !email || !mobile || !work || !age || !work || !desc || !add) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }
    const user = new User({ name, email, mobile, work, add, age, desc });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/getuser/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById({_id});
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
});

router.put('/updateuser/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndUpdate({_id}, req.body, { new: true });
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
});

router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndDelete({_id});
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
});

module.exports = router;
