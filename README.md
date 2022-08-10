# LayersDemo
User role based map visualisation 

## API Reference

#### Get all users

```bash
  GET /api/users
```

#### Get a user

```bash
  GET /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. UserId to fetch |

#### Edit a user

```bash
  DELETE /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. UserId to delete |

#### Edit a user

```bash
  PUT /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. UserId to edit |
| `name`    | `string` | **Required**. UserId to edit |
| `role`    | `string` | **Required**. UserId to edit |

## Deployment

To deploy this project run

```bash
  cd ../frontend
  npm install
  npm run build
```

```bash
  cd ../backend
  npm install
  npm start
```

## Authors

- [@elygo](https://www.github.com/elygo)

