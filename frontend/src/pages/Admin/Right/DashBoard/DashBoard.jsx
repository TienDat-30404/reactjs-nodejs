import SaleRevenue from "./SaleRevenue";
import StatisticTopProducts from "./StatisticTopProducts";
import TopBuyers from "./StatisticTopBuyers";
const DashBoard = () => {
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <SaleRevenue />
      <StatisticTopProducts />
      <TopBuyers />
    </div>
  );
};

export default DashBoard;
