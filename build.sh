#!/usr/bin/env bash
git pull
cd ./react_project
rm -rf build
bun install
bun run build
cd ..
