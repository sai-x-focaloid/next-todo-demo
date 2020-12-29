#!/usr/bin/env bash

set -e

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ] ; do SOURCE="$(readlink "$SOURCE")"; done
BDIR="$( cd -P "$( dirname "$SOURCE" )/.." && pwd )"

pushd $BDIR
source .env

docker-slim build --target node-server:test --env DB_URL=$DB_URL --include-path /app/node_modules
docker-slim build --target next-client:test --include-path /app/node_modules

popd
