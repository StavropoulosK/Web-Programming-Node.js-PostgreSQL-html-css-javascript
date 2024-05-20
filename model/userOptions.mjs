import connect from './connection.mjs'
import  * as fs from 'fs/promises';


async function getKratisis(userId){
    const sql =    `select distinct reservation,"class",num_single_beds,num_double_beds,sea_view,accessibility_for_disabled,check_in,check_out,num_people,total_cost,breakfast,cancelled,roomNumber,
                    (select sum(p."value") as sumPaymentAmount from payment p where p.reservation=r.reservation_id )
                    from (room_type join room on room_type_id=room_type join reservation on roomNumber="number" 
                    join payment on reservation=reservation_id) as  r
                    where client=$1 `;
    const values=[userId]
    try {
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
        return res.rows
    }
    catch (err) {
        throw err
    }
}

async function getKratisiId(roomNumber,checkIn,checkOut){
    const sql =    `select reservation_id from reservation where 
                    roomNumber=$1 and check_in=$2 and check_out=$3 `;
    const values=[roomNumber,checkIn,checkOut]
    try {
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
        return res.rows[0].reservation_id
    }
    catch (err) {
        throw err
    }
}

async function insertKritiki(kritiki,kratisiId){
    const sql =    `insert into review values(default,$2,$1)`;
    const values=[kritiki,kratisiId]
    try {
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
    }
    catch (err) {
        throw err
    }
}

async function findReview(kratisiId){
    const sql =    `select  "id" from review where reservation_id=$1`;
    const values=[kratisiId]
    try {
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
        if(res.rows.length!=0){
            return res.rows[0].id
        }
        else{
            return -1
        }
    }
    catch (err) {
        throw err
    }
}

async function updateKritiki(kritiki,existingReviewId){
    const sql =    `update review set review=$1 where "id"=$2`;
    const values=[kritiki,existingReviewId]
    try {
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
    }
    catch (err) {
        throw err
    }
}

async function akirosiKratisis(kratisiId){
    const sql =    `update reservation set cancelled=true where reservation_id=$1`;
    const values=[kratisiId]
    try {
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
    }
    catch (err) {
        throw err
    }
}

async function getPosaPliromis(kratisiId){
    const sql =    ` select  total_cost, sum("value") as sumPaymentAmount
                    from payment join reservation on reservation_id=reservation
                    where reservation=$1
                    group by reservation,total_cost`;
    const values=[kratisiId]
    try {
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
        return res.rows[0]
    }
    catch (err) {
        throw err
    }
}

async function getUserProfile(userID){
    const sql =    `select first_name,last_name,email,phoneNumber from client where user_id=$1`;
    const values=[userID]
    try {
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
        return res.rows[0]
    }
    catch (err) {
        throw err
    }
}

async function insertPhoto(imageBuffer,userId){
    try {
        
        const sql = `UPDATE client SET profilePicture = $1 WHERE user_id = $2`;
        const client = await connect();
        const res = await client.query(sql, [imageBuffer,userId]); // Pass image buffer as parameter
        await client.release();
    }
    catch (err) {
        throw err
    }
}

export {getKratisis,getKratisiId,insertKritiki,findReview,updateKritiki,akirosiKratisis,getPosaPliromis,getUserProfile,insertPhoto}