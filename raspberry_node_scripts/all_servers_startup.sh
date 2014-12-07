#!/bin/bash

echo Starting static server ....
./static_server_start.sh &
echo Static server startup complete!

echo Starting control server ....
xterm -e node control_server_startup.js
echo Control serve startup complete!
