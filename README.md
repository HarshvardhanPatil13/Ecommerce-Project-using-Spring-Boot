# 🛒 ShopNexus - E-commerce Website

**ShopNexus** is a simple e-commerce backend built using **Java Spring Boot**, **Hibernate**, and **PostgreSQL**. It supports functionalities like adding, updating, and deleting products, as well as searching and viewing product details.

> ✅ Frontend hosted on **Vercel**  - https://ecommerce-project-using-spring-boot.vercel.app/
> ✅ Backend and PostgreSQL database hosted on **Render**

---

## 🚀 Features

- 🛍️ Add new products with image upload
- 🔍 Search products by name
- 🖼️ View all products with images
- ✏️ Update product details and image
- 🗑️ Delete product
- 📉 "Out of Stock" label when quantity is 0

---

## 🛠️ Tech Stack

| Layer        | Tech Used                             |
|--------------|----------------------------------------|
| Backend      | Java 21+, Spring Boot 3.x, Hibernate   |
| Frontend     | React.js, Tailwind CSS                 |
| Database     | PostgreSQL                             |
| Tools        | Maven, Postman                         |
| Deployment   | Backend + DB on **Render**, Frontend on **Vercel** |

---
## 📦 Repository Structure
📁 backend
ecom

├── src/main/java

│ └── com/Ecom/...

├── src/main/resources

│ └── application.properties

└── pom.xml

📁 frontend
ecommerce-frontend

├── public/

├── src/

│ └── components/

│ └── pages/

└── vite.config.js

---

## 🔧 Setup Instructions

### ✅ Backend Setup (Spring Boot + PostgreSQL)

1. **Clone the repository**
     ```bash
   git clone https://github.com/HarshvardhanPatil13/Ecommerce-Project-using-Spring-Boot.git
   cd Ecommerce-Project-using-Spring-Boot
   ```

2. Update application.properties
   ```
   spring.datasource.url=jdbc:postgresql://your-db-host:5432/your-db-name
   spring.datasource.username=your-db-username
   spring.datasource.password=your-db-password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. CORS Configuration
   In your controller or globally, enable CORS for your Vercel frontend:
   ```
   @CrossOrigin(origins = "https://your-frontend.vercel.app")
   ```
4. Run the application
   
   ./mvnw spring-boot:run
   
   Or run directly using your IDE.


 

   
