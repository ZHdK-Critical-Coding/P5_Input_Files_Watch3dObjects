#!/bin/bash

# Folder to watch
WATCH_DIR="./assets/files"

# Output file
OUTPUT_FILE="./assets/list.txt"

# initial snapshot
prev=""

while true; do
  # current snapshot (sorted list of files)
  curr=$(ls -1 "$WATCH_DIR" | sed "s|^|$WATCH_DIR/|")

  # compare with previous snapshot
  if [ "$curr" != "$prev" ]; then
    echo "$curr" > "$OUTPUT_FILE"
    prev="$curr"
    echo "Updated $OUTPUT_FILE"
  fi

  sleep 1   # check every second
done