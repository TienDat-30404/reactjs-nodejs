const express = require('express')



// dotenv
const dotenv = require('dotenv')
dotenv.config()

//connectDB
const db = require('./config/connect.js')
db.connectDB()

const app = express()
const port = process.env.PORT

// cookier parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

/*  được sử dụng để thêm middleware nhằm phân tích body của các yêu cầu HTTP có định dạng JSON. Middleware này sẽ đọc nội dung của các yêu cầu HTTP và tự động chuyển đổi body từ chuỗi JSON sang đối tượng JavaScript, giúp bạn dễ dàng truy cập dữ liệu trong các request handlers. Chẳng hạn khi console.log(req.body), nếu ko cấu hình nó thì sẽ là undefined
*/
app.use(express.json());

// cors 
const cors = require('cors')
// cấu hình 
const corsOptions = {
  origin: 'http://localhost:3000', // chỉ cho phép các yêu cầu từ nguồn http://localhost:3000 được truy cập máy chủ.
  credentials: true, /* Để cho phép gửi cookie (Khi credentials: true, máy chủ sẽ chấp nhận và xử lý các yêu cầu có gửi cookies hoặc các thông tin xác thực khác. Đồng thời, phía client cũng phải gửi yêu cầu với tùy chọn credentials: 'include' để gửi cookie hoặc thông tin xác thực.)
  cấu hình ở đâu giúp khi ta login thành công có thể gửi cookier lên server */
};
app.use(cors(corsOptions))



// routes
const routes = require('./routes/index.js')
routes(app)

// Middleware xử lý lỗi - phải được đặt sau tất cả các route và middleware khác
const errorMiddleware = require('./middlewares/errorMiddleWare');
app.use(errorMiddleware);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})