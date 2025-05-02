exports.create = async (req,res)=>{
    try{
        res.send('hello create(post) controller')
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
}

exports.list = async(req,res)=>{
    try{
        res.send('hello read list(get) controller')
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
}

exports.read = async(req,res)=>{
    try{
        res.send('hello read item(get) controller')
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
}

exports.update = async(req,res)=>{
    try{
        res.send('hello update controller')
    }
    catch(err){
        console.log(err)
    }
} 

exports.remove = async(req,res)=>{
    try{
        res.send('hello remove(delete) controller')
    }
    catch(err){
        console.log(err)
    }
} 