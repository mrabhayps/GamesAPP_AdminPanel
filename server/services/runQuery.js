const model = require('../../public/model/database');
const sequelize = require('sequelize');


async function runQuery (query){

    try{

    let data;

    await model.query(query,
                          { type: sequelize.QueryTypes.SELECT }
                        ).then((res) => data = res);

                        return data;
    }catch(err){
        console.log(err);
    }

    

}

// const db = {}

// db.getData = runQuery ;

module.exports = runQuery ;