#! /bin/bash

npm run build
rm -rf ../audio-memtest/*
cp ./public/* ../audio-memtest/

