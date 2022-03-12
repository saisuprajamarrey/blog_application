const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

//Update

router.put("/:id",async(req,res)=>{

    if(req.body.userId === req.params.id) {
        const user = await User.findById(req.params.id);
        if(req.body.username){
            try{
                await Post.updateMany({username:user.username},{username:req.body.username})
            }
            catch (e){
                res.status(500).json(e)
            }

         }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new:true});
            const {password, ...others}= updatedUser._doc;
            res.status(200).json(others);

        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("You can update only your account!");
    }

});


// DELETE
router.delete("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id) {
        try{
            const user = await User.findById(req.params.id)

            try {
                await Post.deleteMany({username:user.username});
                await User.findByIdAndDelete(req.params.id);

                res.status(200).json("User has been deleted...");

            } catch (err) {
                res.status(500).json(err);
            }

        }
        catch (err){
            res.status(400).json("User not found !")
        }

    }else{
        res.status(401).json("You can delete only your account!");
    }

});


//GET User

router.get("/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,...others} =user._doc;
        res.status(200).json(others);
    } catch (e) {
        res.status(500).json(e);

    }
});

module.exports = router;
