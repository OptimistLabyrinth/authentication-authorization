## file is created with below command

```shell
openssl rand -base64 512 -out ./replica-set.keyfile
```

## then narrow the privilege of the key file

```shell
chmod 400 ./replica-set.keyfile
```
