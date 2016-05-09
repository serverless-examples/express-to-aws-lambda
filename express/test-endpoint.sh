#!/bin/bash
set -e

#TODO: Use node instead of this

sendJsonRequest() {
  if [ -z "$1" ]; then
    echo "A URL is required"
    exit 1
  fi
  # echo "Recieived arguments $1 $2 $3"

  URL=$1
  METHOD=${2:-'GET'}
  DATA=${3:-''}

  echo "Sending $METHOD request to $URL with data ($DATA)"
  curl -i \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -X $METHOD \
    --data "$DATA" \
    $URL
}

sendJsonRequest "http://localhost:5000/foo/1"

sendJsonRequest "http://localhost:5000/foo" POST '{"name": "foo"}'


# sendJsonRequest("http://localhost:5000/foo/1", "GET", "")
