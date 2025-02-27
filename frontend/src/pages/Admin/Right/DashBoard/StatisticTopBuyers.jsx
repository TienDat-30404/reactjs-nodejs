import { Fragment, useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { getSaleRevenue, getTopBuyers } from "../../../../services/StatisticalService";

const TopBuyers = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await getTopBuyers()
            console.log(response)
            if (response && response.status === 200) {
                console.log(response)
                setData(response.topBuyers)
            }
        }
        fetchData()
    }, [])
    return (
        <Fragment>
            <p class="text-center fs-4 mt-5">Thông kê 10 người dùng mua hàng nhiều nhất</p>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="userName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalPrice" fill="#007bff" />
                </BarChart>
            </ResponsiveContainer>
        </Fragment>

    );
};

export default TopBuyers;
