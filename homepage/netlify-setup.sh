#!/bin/bash

# Print environment information
echo "Build environment:"
echo "==================="
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Python version: $(python3 --version)"

# Try to install Python setuptools and distutils
echo "Installing Python dependencies..."
pip install setuptools || true
pip install distutils || true
pip3 install setuptools || true
pip3 install distutils || true

# Configure NPM
echo "Configuring NPM for Sharp..."
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"

# Set up environment for Sharp
echo "Preparing for Sharp installation..."
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
export npm_config_sharp_libvips_binary_host="https://npmmirror.com/mirrors/sharp-libvips"
export npm_config_sharp_binary_host="https://npmmirror.com/mirrors/sharp"

echo "Setup complete!" 