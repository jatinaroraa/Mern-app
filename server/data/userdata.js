const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userdata = new mongoose.Schema({
    name : {
        type:String,
        require:true

    },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    },
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]
});

userdata.methods.generatetoken = async function()
{
    try{
        let token = jwt.sign ({_id:this._id},process.env.secretkey);
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;

    }catch(err){
        console.log(err);
    }
}







const user = mongoose.model('user',userdata)
module.exports=user;