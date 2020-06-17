// inserir o comando para abrir o banco: yarn add pg 

const Pool = require('pg').Pool;

// 1 - Abrir conexão
// 2 - Execurar comando SQL (select, insert....)
// 3 - Fechar conexão

const pool = new Pool ({
    user: 'llnplyrjxztzos',
    password:'060911fea32dfe8251c01d614b98dfd450103bb4e466402c455f23233ce4ec1f',
    host:'ec2-34-232-147-86.compute-1.amazonaws.com',
    database:'d9v7p8178vglef',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});

 const sqlCreate = `
  
    CREATE TABLE IF NOT EXISTS banho
    (
        ID serial primary key,
        nomedog varchar(50) not null,
        peso int not null default 0,
        valor decimal,
        status varchar(20)
    )
`;

   pool.query(sqlCreate, function(error,result) {
    if(error)
    throw error
    console.log('Tabela criada com sucesso!');
});

module.exports = {

async insert (nomedog, peso, valor,status){
    const sql = `INSERT INTO banho (nomedog, peso, valor, status) VALUES ($1, $2, $3)`;
    
    const result = await pool.query(sql, [nomedog, peso, valor,status]);
    return result.rowCount;
},

async select (){
    const sql = `SELECT * FROM banho`;
    
    const result = await pool.query(sql);
    return result.rows;
},

  async  delete(nomedog){

        const sql = `DELETE FROM banho WHERE nomedog = $1`;
        
        const result = await pool.query(sql, [nomedog]);
        return result.rowCount;
},

async  update(nomedog, peso, valor, status){

        const sql = `UPDATE banho
        SET peso = $2, valor = $3, status= $4
        WHERE nomedog = $1`;
        
        console.log(peso)
     const result = await pool.query(sql, [nomedog, peso, valor, status]);
        return result.rowCount;
 },

}

/*
async  read(){
    const sql = 'SELECT * FROM banho '
    const result = await pool.query(sql);
    return result.rows;
     }    */
