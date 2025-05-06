#!/bin/bash

# Attempt to install Python distutils
echo "Checking for Python distutils..."
pip install setuptools distutils

# Print Python information
echo "Python version:"
python3 --version
pip list

# Print Node version
echo "Node version:"
node --version
npm --version

echo "Setup complete!" 