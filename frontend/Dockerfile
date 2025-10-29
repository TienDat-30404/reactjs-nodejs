# Sử dụng image Node.js slim để giảm kích thước image
FROM node:18-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json
COPY frontend/package.json frontend/package-lock.json ./

# Cài đặt dependencies (sử dụng npm ci để build ổn định hơn)
RUN npm ci

# Copy mã nguồn frontend
COPY frontend/ .

# Build ứng dụng React (sẽ tạo ra thư mục 'build/')
RUN npm run build

# Cài đặt server tĩnh để phục vụ ứng dụng
RUN npm install -g serve


CMD ["serve", "-s", "build", "-l", "$PORT"]