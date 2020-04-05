#!/bin/sh

cd packages/back && yarn install --network-timeout 1000000  --production=false && cd ./../front && yarn install --network-timeout 1000000 --production=false
