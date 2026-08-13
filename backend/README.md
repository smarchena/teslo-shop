<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

1. Clonar proyecto
2. `yarn install` / `npm install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno
5. Levantar la base de datos

```
docker-compose up -d
```

6. Levantar:

```
npm run start:dev
yarn start:dev

```

7. Ejecutar SEED

```
http://localhost:3000/api/seed
```

# Solución de errores (en caso de)

1. Verificar si el proyecto tiene dependencias mezcladas entre NestJS 10 y 11 `npm list @nestjs/core @nestjs/common @nestjs/platform-express`
2. Verificar versión de Node `node -v`
3. Comprobar TypeORM y PostgreSQL `npm list typeorm pg`
4. Si /api/seed da error con TypeORM
  4.1. Corregir ProductService en product.service.ts: 
    async deleteAllProducts() {
    try {
      await this.productImageRepository
        .createQueryBuilder()
        .delete()
        .from(ProductImage)
        .execute();

      await this.productRepository
        .createQueryBuilder()
        .delete()
        .from(Product)
        .execute();
        return true;

      } catch (error) {
      this.handleDBExceptions(error);
      }
    } 
  4.2. Corregir SeedService en seed.service.ts:
    await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .execute();
