import connect from './connection.mjs'

async function findRoom(checkIn,checkOut,roomName,singleBeds,doubleBeds,amea,theaStiThalasa){

    const sql = `select r."number"
                from (room join room_type on room_type_id=room_type) as r
                where "class"=$3 and num_single_beds=$4 and num_Double_beds=$5 and
                    accessibility_for_disabled=$6 and sea_view=$7 and under_renovation=false
                    and not exists(
                        select *
                        from (room join reservation on roomNumber="number") as k
                        where cancelled=false and k.roomNumber=r."number"
                        and( ($1<check_in and $2>check_in) or
                            ($1>=check_in and $2<=check_out) or
                            ($1<check_out and $2>check_out))
        )`;
    try {
        const values=[checkIn,checkOut,roomName,singleBeds,doubleBeds,amea,theaStiThalasa]
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()

        if(res.rows.length==0){
            return -1
        }
        else{
            // epestrepse ena domatio
            return res.rows[0].number
        }
    }
    catch (err) {
        console.error(err)
    }
}

async function insertReservation(userId,checkIn,checkOut,roomNumber,proino,atoma,sinolikoKostos){
    const sql = `insert into reservation values(default,$2,$3,$6,$7,$5,default,current_date,$1,$4) returning reservation_id `;
    try {
        const values=[userId,checkIn,checkOut,roomNumber,proino,atoma,sinolikoKostos]
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
        return res.rows[0].reservation_id

    }
    catch (err) {
        console.error(err)
    }
}

async function checkEpikalipsi(checkIn,checkOut,roomNumber,kratisiId){
    // to kratisiId leitourgi san timestamp. Auti pou exei to mikrotero mpike proti.

    const sql = `select * from reservation
                where roomNumber=$3 and reservation_id<$4 and cancelled=false
                and ( ($1<check_in and $2>check_in) or
                ($1>=check_in and $2<=check_out) or
                ($1<check_out and $2>check_out)) `;
    try {
        const values=[checkIn,checkOut,roomNumber,kratisiId]
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
        if(res.rows.length==0){
            return false
        }
        else{
            return true
        }

    }
    catch (err) {
        console.error(err)
    }
}

async function removeReservation(kratisiId){
    const sql = `delete from reservation where reservation_id=$1`;
    try {
        const values=[kratisiId]
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
    }
    catch (err) {
        console.error(err)
    }
}

async function insertPayment(kratisiId,paymentAmount){
    const sql = `insert into payment values(default,$2,default,current_date,$1)`;
    try {
        const values=[kratisiId,paymentAmount]
        const client = await connect();
        const res = await client.query(sql,values)
        await client.release()
    }
    catch (err) {
        console.error(err)
    }
}

export {findRoom,insertReservation,checkEpikalipsi,removeReservation,insertPayment}