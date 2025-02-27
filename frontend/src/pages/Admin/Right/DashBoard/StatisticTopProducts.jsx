import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { getTopProductBestSelling } from "../../../../services/StatisticalService";


export default function StatisticTopProducts() {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async() => {
      const response = await getTopProductBestSelling()
      if(response && response.status === 200)
      {
        setData(response.data)
      }
    }
    fetchData()
  }, [])
  return (
    <ResponsiveContainer width="100%" height={400}>
      <p class="text-center fs-4 mt-2">10 sản phẩm bán chạy nhất</p>

      <BarChart layout="vertical" data={data} margin={{ left: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={150} />
        <Tooltip />
        <Bar dataKey="quantity" fill="#ff5733" />
      </BarChart>
    </ResponsiveContainer>
  );
}
