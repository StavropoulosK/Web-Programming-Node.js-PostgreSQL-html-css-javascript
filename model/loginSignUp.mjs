import connect from './connection.mjs'

async function checkIfUserNameExists(userName){
    const sql = `SELECT * FROM client WHERE username = $1`;
    try {
        const client = await connect();
        const res = await client.query(sql,[userName])
        await client.release()
        if(res.rows.length==0){
            return false
        }
        else{
            return true
        }
    }
    catch (err) {
        throw err
    }
}

// async function authenticate(userName,password){
//     const sql = `SELECT user_id,profilePicture FROM client WHERE username = $1 and password=$2 `;
//     try {
//         const client = await connect();
//         const res = await client.query(sql,[userName,password])
//         await client.release()
//         return res.rows
//     }
//     catch (err) {
//         console.error(err)
//     }
// }

async function insertClient(onoma,eponimo,username,password,email,tilefono){
    const sql = `insert into client values(default,$1,$2 ,$3 ,$4 ,$5 ,$6,default,CURRENT_DATE) returning user_id`;
    try {
        const client = await connect();
        const user_id = (await client.query(sql,[onoma,eponimo,username,password,email,tilefono]) ).rows[0].user_id
        await client.release()
        return user_id
    }
    catch (err) {
        throw err
    }
}

async function getHashedPassword(username){
    const sql = `select password,user_id from client where username=$1`;
    try {
        const client = await connect();
        const result = (await client.query(sql,[username]) ).rows
        await client.release()
        return result
    }
    catch (err) {
        throw err
    }
}



export {checkIfUserNameExists,insertClient,getHashedPassword}