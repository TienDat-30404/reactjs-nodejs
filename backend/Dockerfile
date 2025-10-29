# Sử dụng image slim để giảm kích thước (phương pháp tối ưu)
FROM node:18-slim

# Đặt thư mục làm việc (Thư mục làm việc chuẩn cho ứng dụng Node)
WORKDIR /usr/src/app

# Copy package.json để cài đặt dependencies
COPY backend/package.json backend/package-lock.json ./

# Cài đặt dependencies (chỉ production, sử dụng npm ci cho CI/CD)
RUN npm ci --production

# Copy toàn bộ mã nguồn backend vào container
COPY backend/ .

CMD ["npm", "run", "prod"]