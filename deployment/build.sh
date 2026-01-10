#!/usr/bin/env bash
cd ./../react_project/
npm install
npm run build

cd ..
mkdir -p ./deployment/portfolio/build
cp -rf ./react_project/build/ ./deploymentgit /portfolio/
cp ./deployment/start_phatnt_portfolio.sh ./deployment/portfolio/ 
