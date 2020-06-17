// inserir o comando para abrir o banco: yarn add pg 

const Pool = require('pg').Pool;

// 1 - Abrir conexão
// 2 - Execurar comando SQL (select, insert....)
// 3 - Fechar conexão

const pool = new Pool ({
    user: 'pmbnbwfcotcljg',
    password:'623ebfb8fde34d0e8b36ffa09c739bce62e7bcaad83f5eecd6d020c472a1a920',
    host:'ec2-52-44-55-63.compute-1.amazonaws.com',
    database:'d4tjrbcn6pom15',
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
    const sql = `INSERT INTO banho (nomedog, peso, valor, status) VALUES ($1, $2, $3, $4)`;
    
    const result = await pool.query(sql, [nomedog, peso, valor,status]);
    return result.rowCount;
},

async select (){
    const sql = `SELECT * FROM banho`;
    
    const result = await pool.query(sql);
    return result.rows;
},

  async  delete(id){

        const sql = `DELETE FROM banho WHERE id = $1`;
        
        const result = await pool.query(sql, [id]);
        return result.rowCount;
},

  

    async  update(id, nomedog, peso, valor, status) {
    const sql = ` UPDATE banho SET 
    nomedog = $2,  
    peso = $3,  
    valor = $4,  
    status = $5,  
    where $1 = id `;  

    const result = await pool.query(sql,[ id, nomedog, peso, valor, status])

    return result.rowCount;
    
    },
       


}
