import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool=mysql.createPool({
    host: process.env.HOST,//provcess.env is environment variable..
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10
}).promise()

export async function getContractor(){
    const [rows] = await pool.query("SELECT * FROM CONTRACTOR")
    return rows
}

export async function getSingleContractor(id){
    const [rows] = await pool.query(`
        SELECT * FROM CONTRACTOR
        WHERE C_ID=?                
        `,[id])
    return rows[0]
}
//if we want to use our data which is passed then use ${arg}
//if u want user input value to be placed in query then use ?

// function call with parameter
const notes=await getSingleContractor(3004) 
console.log(notes)

//FOR INSERT A ROW
// export async function createContractor(C_ID,C_NAME,C_CONTACT,C_EMAIL,P_NO,DEPART_ID,AMT,DURATION){
//     const result = await pool.query(`
//         INSERT INTO CONTRACTOR VALUES (?,?,?,?,?,?,?,?)
//     `,[C_ID,C_NAME,C_CONTACT,C_EMAIL,P_NO,DEPART_ID,AMT,DURATION])
//     return result
// }
//INSERTED A ROW INTO CONTRACTOR TABLE
//const result = await createContractor(3004,'MARUTHI.P',9945682985,'MARUTHI1990@GMAIL.COM',3,1005,400000,'1 YEARS')
//console.log(result)
