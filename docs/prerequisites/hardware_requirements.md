---
title: Hardware Requirements
sidebar_position: 1
---

## Development Hardware

To develop and test Hexium OS, your computer should meet these specifications:

### Minimum Requirements

- CPU: x86_64 processor (64-bit)
- RAM: 8 GB
- Storage: 3 GB free space
- Internet connection for downloading dependencies

### Recommended Specifications

- CPU: Modern x86_64 processor with virtualization support
- RAM: 8 GB or more
- Storage: 5 GB or more free space
- SSD storage for faster build times

## Target Hardware

Hexium OS is designed to run on:

### Minimum Target Requirements

- x86_64 processor
- 128 MB RAM
- UEFI/CSM-compatible system

### Recommended Target Requirements

- x86_64 processor
- 512 MB RAM
- UEFI-compatible system with Secure Boot disabled

### Optional Features

- PS/2 keyboard
- Serial port (for debugging)

## Hardware Compatibility

### Tested Platforms

- Common virtual machines (QEMU, VirtualBox)

### Known Limitations

- No support for 32-bit systems
- No ARM support currently
- Limited hardware driver support

## Virtual Machine Requirements

When running in a virtual environment:

- Enable hardware virtualization (VT-x/AMD-V)
- Allocate at least 512 MB RAM
## Development Requirements

### Required Software

- Rust (nightly toolchain)
- Cargo package manager
- QEMU emulator
- Git version control
- GNU xorriso

### Optional Tools

- GDB debugger
- Rust analyzer
- VirtualBox (for alternative testing)

## Additional Notes

- Internet connection required for downloading dependencies
- Basic knowledge of command-line operations
- Familiarity with Rust programming language recommended
