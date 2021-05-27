# docker-cosmosdb

This repo is an experiment in running the Cosmos DB emulator alongside a simple Node app using Docker Compose to evaluate the app dev experience versus other data stores (Redis, Postgres, etc) commonly used w/ containers

## Learnings

- The emulator stores data at `/tmp/cosmos/appdata`
- The emulator must be started with `/alternativenames=<desired name>` in order to use host names instead of IP addresses
- There is no flag to set `/alternativenames`. We can inject it via `AZURE_COSMOS_EMULATOR_ARGS`, which is appended as the last argument in the emulator container's startup script
- The emulator container starts and exposes the HTTPS endpoint before it is fully ready. It is necessary to poll the certificate endpoint and check the response status code, otherwise you may download a JSON error message and think it is a certificate
- `update-ca-certificates` didn't work for me. `/etc/ssl/certs` was updated, but Node continued to fail with a self-signed certificate error. Setting `NODE_EXTRA_CA_CERTS` resolved the issue

## Usage

```
git clone https://github.com/noelbundick/docker-cosmosdb.git
cd docker-cosmosdb
npm install
docker-compose up
```
