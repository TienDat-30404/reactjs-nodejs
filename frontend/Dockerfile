# Sử dụng image Node.js slim để giảm kích thước image
FROM node:18-slim

# BỔ SUNG: Khai báo ARG để nhận biến từ bên ngoài (từ Render Build Arg)
ARG REACT_APP_API_URL

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json
COPY frontend/package.json frontend/package-lock.json ./

# Cài đặt dependencies (sử dụng npm ci để build ổn định hơn)
RUN npm ci

# Copy mã nguồn frontend
COPY frontend/ .

# Lệnh sh -c đảm bảo rằng biến được gán cho môi trường của lệnh build
RUN sh -c "REACT_APP_API_URL=$REACT_APP_API_URL npm run build"

# Build ứng dụng React (sẽ tạo ra thư mục 'build/')
RUN npm run build

# Cài đặt server tĩnh để phục vụ ứng dụng
RUN npm install -g serve


CMD ["serve", "-s", "build", "-l", "3000"]
