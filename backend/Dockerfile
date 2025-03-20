# Sử dụng image Node.js
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy toàn bộ code backend vào container
COPY . .

ENV PORT=3001

# Mở cổng 3001
EXPOSE 3001

# Chạy ứng dụng
CMD ["npm", "start"]
