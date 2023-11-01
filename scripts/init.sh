#!/bin/bash
# Get the parent path of this script
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

# Create .env file from sample
source ./create-env.sh

# Create database directories
source ./db-directories.sh
