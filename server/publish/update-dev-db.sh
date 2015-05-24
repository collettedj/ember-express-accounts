#!/bin/bash

echo "update test database schema..."
env NODE_ENV="test" node ./publish/publish-db-force.js

echo "dump test schema to script..."
pg_dump -h localhost -s -f ./publish/testdb.sql ember_express_test

echo "dump development schema to script..."
pg_dump -h localhost -s -f ./publish/devdb.sql ember_express_db

echo "diff schema and create publish script"
java -jar ./publish/apgdiff-2.4.jar --ignore-start-with ./publish/devdb.sql ./publish/testdb.sql  > ./publish/upgrade-dev.sql

echo "execute publish script"
psql -h localhost -f ./publish/upgrade-dev.sql ember_express_db