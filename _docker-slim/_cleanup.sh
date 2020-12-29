#!/usr/bin/env bash

set -e

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ] ; do SOURCE="$(readlink "$SOURCE")"; done
BDIR="$( cd -P "$( dirname "$SOURCE" )/.." && pwd )"

pushd $BDIR
source .env

docker images | grep "node-server"
docker images | grep "next-client"
docker images | grep "reverse-proxy"
docker images | grep "cypress"
docker rmi node-server:test
docker rmi node-server.slim:latest
docker rmi next-client:test
docker rmi next-client.slim:latest
docker rmi reverse-proxy:latest
docker rmi cypress:gatsby

popd