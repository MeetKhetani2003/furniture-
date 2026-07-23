import connectToDatabase from "@/db";
import { Order } from "@/db/models/Order";
import { Product } from "@/db/models/Product";
import { User } from "@/db/models/User";
import { formatPrice } from "@/lib/utils/formatPrice";

export default async function AdminDashboard() {
  await connectToDatabase();

  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalUsers = await User.countDocuments();
  
  // Calculate total revenue
  const orders = await Order.find({ paymentStatus: "Completed" });
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">{formatPrice(totalRevenue)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Products</h3>
          <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
        </div>
      </div>
    </div>
  );
}
