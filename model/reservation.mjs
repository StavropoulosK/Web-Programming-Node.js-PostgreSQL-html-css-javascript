import connect from './connection.mjs'

async function getTimesDomatiou(roomName,startDate,endDate){
    const sql1 = `select price,startDate,endDate from price_catalogue join room_type on room_type=room_type_id
                        where startDate< $1  and endDate>=$1 and class=$2 `;
    const sql2 = `select price,startDate,endDate from price_catalogue join room_type on room_type=room_type_id
    where startDate>= $1  and endDate<=$2 and class=$3 `;

    const sql3 = `select price,startDate,endDate from price_catalogue join room_type on room_type=room_type_id
    where startDate<= $1  and endDate>$1 and startDate>=$3 and class=$2 `;

    try {
        const client = await connect();
        const res1 = await client.query(sql1,[startDate,roomName])
        const res2 = await client.query(sql2,[startDate,endDate,roomName])
        const res3 = await client.query(sql3,[endDate,roomName,startDate])

        await client.release()

        const sql4= ` select distinct class from price_catalogue join room_type on room_type=room_type_id  `
        const res4 = await client.query(sql4,[])

       return [res1.rows,res2.rows,res3.rows]
    }
    catch (err) {
        throw err
    }
}

async function datesNotAvailable(startDate,endDate,num_single_beds,num_double_beds,roomType,amea){
    const sql =   `WITH datesOfMonth AS (
                    select i::date from generate_series($1,$2, '1 day'::interval) i),
                        
                    roomOptions as
                    (
                        select "number" from room join room_type on room_type=room_type_id 
                        where class=$5 and accessibility_for_disabled=$6
                        and num_single_beds=$3 and num_double_beds=$4 and under_renovation=false
                    ),
                    roomReservations as(
                        select * from roomOptions join reservation on roomNumber="number"
                        where cancelled=false
                    )
                    select cast(i as varchar)
                    from datesOfMonth 
                    where not exists(
                        select "number" from 
                        roomOptions
                        EXCEPT
                        select "number" from 
                        roomReservations
                        where cast (check_in as date)<=i and cast(check_out as date)>i)
                    `;
    const values=[startDate,endDate,num_single_beds,num_double_beds,roomType,amea]
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

async function getRoomsThatAreAvailableForAllDates(roomType,amea,num_single_beds,num_double_beds,checkInDate,checkOutDate){
    const sql =`WITH roomOptions as
                (
                select "number",sea_view from room join room_type on room_type=room_type_id 
                where "class"=$1 and accessibility_for_disabled=$2
                and num_single_beds=$3 and num_double_beds=$4 and under_renovation=false
                    )
                select "number",sea_view
                from roomOptions r
                where not exists(
                    select *
                    from roomOptions join reservation on "number"=roomNumber
                    where cancelled=false and "number"=r.number and
                    ( (check_in<$5 and check_out>$5) or
                      (check_in>=$5 and check_out<=$6) or
                      (check_in<$6 and check_out>$6) ))`;

        const values=[roomType,amea,num_single_beds,num_double_beds,checkInDate,checkOutDate]
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

async function getReservedDates(roomType,amea,singleBeds,doubleBeds,checkIn,checkOut){
    const sql =`select "number",sea_view,check_in,check_out
                from room join room_type on room_type_id=room_type join reservation on roomNumber="number"
                where cancelled=false and "class"=$1 and accessibility_for_disabled=$2 and under_renovation=false
                and num_single_beds=$3 and num_double_beds=$4 and 
                (($5<=check_in and $6>=check_out) or
                ($5<=check_in and $6>check_in) or
                ($5<check_out and $6>=check_out ) or
                ($5>=check_in and $6<=check_out))
                order by number`;

    const values=[roomType,amea,singleBeds,doubleBeds,checkIn,checkOut]
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

export {getTimesDomatiou,datesNotAvailable,getRoomsThatAreAvailableForAllDates,getReservedDates}