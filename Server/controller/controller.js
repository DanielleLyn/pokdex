let myParty = [];
let id = 0;

module.exports={
    create:(req,res)=>{
        const{name,level}=req.body;
        console.log(name,level);
        myParty.push({id,name,level});
        id++;
        res.status(200).json(myParty);
    },

    read:(req,res)=>{
        res.status(200).json(myParty);
    },


    update:(req,res)=>{
        // const {level} = req.body;
        const { id } = req.params;
        myParty.forEach((pokemon, index) => {
            console.log(pokemon, index)
            if(pokemon.id == id){
                console.log(myParty[index])
                myParty[index].level += 100;
            }
        })

        res.status(200).json(myParty);
        
    },

    delete:(req,res)=>{
        const {id}=req.params;
        myParty.forEach((pokemon,index) => {
            if(pokemon.id == id){
            myParty.splice(index, 1)
            }
        })
        res.status(200).json(myParty);
    },


};