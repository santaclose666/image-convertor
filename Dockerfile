# Sử dụng node image
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ dự án vào container
COPY . .

# Build ứng dụng Next.js
RUN npm run build

# Expose port 3000 (hoặc port mà ứng dụng Next.js chạy)
EXPOSE 3030

# Khởi động ứng dụng
CMD ["bun", "dev"]
