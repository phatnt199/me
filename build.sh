#!/usr/bin/env bash
git pull
cd ./react_project
rm -rf build
npm run build
cd ..
