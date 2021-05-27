#!/bin/bash
set -euxo pipefail

# Try to get the emulator cert in a loop
until curl -ksf "${COSMOS_ENDPOINT}/_explorer/emulator.pem" -o '/usr/local/share/ca-certificates/emulator.crt'; do
  echo "Downloading cert from $COSMOS_ENDPOINT"
  sleep 1
done

# Ensure that Node recognizes the emulator cert as a self-signed CA root
export NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/emulator.crt

# Run the app
node build/src/app.js
