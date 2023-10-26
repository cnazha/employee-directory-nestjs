#!/bin/bash
# This script creates the directories for the MongoDB and Redis databases - non-production environments only
# Define the top-level directories and patterns
top_level=("mongodb/data" "redis/data")
sub_directories=("development" "test")

# Loop through top-level directories
for top_dir in "${top_level[@]}"; do
  # Loop through sub-directories
  for sub_dir in "${sub_directories[@]}"; do
     if [ ! -d "../databases/$top_dir/$sub_dir" ]; then
      # Create the directory using mkdir -p to create parent directories if needed
      mkdir -p "../databases/$top_dir/$sub_dir"
      echo "Created directory ../databases/$top_dir/$sub_dir"
        else
          echo "Directory ../$top_dir/$sub_dir already exists, skipping."
        fi
  done
done
