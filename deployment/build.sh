#!/usr/bin/env bash
cd ./../react_project/
bun install
bun run build

cd ..
mkdir -p ./deployment/portfolio/
rm -rf ./deployment/portfolio/build
cp -r ./react_project/build ./deployment/portfolio/
cp ./deployment/start_phatnt_portfolio.sh ./deployment/portfolio/
