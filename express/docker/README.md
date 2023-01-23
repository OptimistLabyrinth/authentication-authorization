# after docker compose start-up, must initialize mongodb replica set

## connect to database using mongosh

first connect to mongodb primary

```shell
mongosh mongodb://root:root_pwd_crypt@127.0.0.1:57017/admin
```

## possible to connect to database using initially created normal user

```shell
mongosh mongodb://normal_user:normal_pwd_crypt@127.0.0.1:57017/my_service
```

## initialize replica set

primary node must be rs0 (mongodb)

```json
rs.initiate({
    _id : "serviceReplicaSet",
    version: 1,
    members : [
        {
            _id : 0,
            host : "mongodb-database0:27017",
            priority: 2,
        },
        {
            _id : 1,
            host : "mongodb-database1:27017",
        },
        {
            _id : 2,
            host : "mongodb-database2:27017",
        },
    ]
});
```
