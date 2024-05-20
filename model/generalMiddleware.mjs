import connect from './connection.mjs'


async function getProfileImage(userId){
    try {
        const client = await connect();
        const query = `SELECT encode(profilepicture,'base64') FROM client WHERE user_id = $1`;
        const result = await client.query(query, [userId]);
        await client.release()
        return result.rows[0].encode
    }
    catch (err) {
        throw err
    }
}

async function cancelDueReservations(dayOrio){
    try {
        const client = await connect();
        const query = ` update reservation r
                        set cancelled=true
                        where cancelled=false and r.total_cost!=(	select sum("value")
                                                                    from payment p
                                                                    where p.reservation=r.reservation_id
                                                                    group by reservation)
                        and check_in=$1`;
        const result = await client.query(query,[dayOrio]);
        await client.release()
    }
    catch (err) {
        throw err
    }
}


export {getProfileImage,cancelDueReservations}