import { Fragment, useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { getSaleRevenue } from "../../../../services/StatisticalService";

const SaleRevenue = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await getSaleRevenue()
            console.log(response)
            if (response && response.status === 200) {
                console.log(response)
                setData(response.revenueByMonth)
            }
        }
        fetchData()
    }, [])
    return (
        <Fragment>
            <p class="text-center fs-4 mt-2">Thông kê doanh thu bán hàng</p>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalRevenue" fill="#007bff" />
                </BarChart>
            </ResponsiveContainer>
        </Fragment>

    );
};

export default SaleRevenue;
