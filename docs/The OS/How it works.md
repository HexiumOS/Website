---
title: How it works
sidebar_position: 1
---
## Boot Process

* **Bootloader:** Hexium OS uses the Limine bootloader to load the kernel into memory. The bootloader provides essential services like memory mapping and module loading.  
* **Kernel Entry Point:** The kernel's entry point is the **kmain** function in **kernel/src/main.rs**. This function initializes the OS and enters an infinite loop (**hlt\_loop**).

---

## Initialization

* **Global Descriptor Table (GDT):** The GDT is initialized in **kernel/src/interrupts/gdt.rs**. It sets up memory segmentation and the Task State Segment (TSS) for handling interrupts like double faults.  
* **Interrupt Descriptor Table (IDT):** The IDT is initialized in **kernel/src/interrupts/idt.rs**. It maps interrupt handlers for exceptions (e.g., page faults) and hardware interrupts (e.g., keyboard, timer).  
* **Memory Management:** Paging and heap allocation are initialized in **kernel/src/memory/mod.rs**. The OS uses a custom heap allocator and maps physical memory to virtual memory.  
* **Filesystem:** A RAM-based filesystem **(RamFs func in kernel/src/fs/ramfs.rs)** is mounted during initialization. It reads a tar archive (**ramfs.img**) provided by the bootloader.

---

## Core Features

* **Interrupt Handling**:  
  * Hardware interrupts (e.g., keyboard and timer) are handled using the Programmable Interrupt Controller (PIC) in **kernel/src/drivers/pic.rs**.  
  * Software exceptions like page faults are handled in **kernel/src/memory/paging.rs**.  
* **Task Management:** The OS supports multitasking using an executor in **kernel/src/task/executor.rs**. Tasks are represented as **Futures (located in kernel/src/task/mod.rs)** and are polled for completion.  
* **Filesystem:** The Virtual Filesystem (VFS) in **kernel/src/fs/vfs.rs** abstracts different filesystem implementations like **RamFs** and **MemFS**.  
* **Drivers:**  
  * **Keyboard:** The keyboard driver in **kernel/src/devices/keyboard/mod.rs** processes scancodes and decodes keypresses.  
  * **Timer:** The timer driver in **kernel/src/devices/timer.rs** tracks system uptime and handles periodic interrupts.

---

## User Interaction

* **Terminal Output:** The OS uses the Flanterm library for framebuffer-based terminal output. This is initialized in **kernel/src/writer.rs**.  
* **Logging:** A logging system in **kernel/src/log.rs** provides macros for logging messages with different severity levels (e.g., trace, info, error (**kernel/src/devices/keyboard/mod.rs**, **kernel/src/fs/ramfs.rs** and **kernel/src/lib.rs**, respectively)).

---

## 5 Build and Run

* **Build System:** The OS is built using a **Makefile** and Rust's **cargo** tool. The build process generates a kernel binary and an ISO image.  
* **Run:** The OS can be run in QEMU using the **make run** command. It uses OVMF for UEFI emulation.

---

## 6 Limitations

Hexium OS is still in its early stages and lacks many features of a full-fledged operating system:

* No process management or user-space applications.  
* No advanced filesystems (e.g., FAT32).  
* No networking, GUI, or audio support.

---

## Summary

Hexium OS is a minimal kernel that demonstrates core operating system concepts like memory management, interrupt handling, and multitasking. It is designed for experimentation and learning, making it a great project for exploring systems programming in Rust.

## File Structure in the source tree

## Root Directory

**README.md**  
Provides an overview of the project, its features, build instructions, and project structure.

**LICENSE.txt**  
Contains the Apache 2.0 license under which Hexium OS is distributed.

**CONTRIBUTING.md**  
Guidelines for contributing to the project, including reporting bugs, suggesting enhancements, and submitting code.

**CODE\_OF\_CONDUCT.md**  
Outlines the expected behavior for contributors and the enforcement process for violations.

**AUTHORS.md**  
Lists the contributors to the project, including project founders and lead developers.

**SECURITY.md**  
Details the security policy, including supported versions and how to report vulnerabilities.

**.gitignore**  
Specifies files and directories to be ignored by Git, such as build artifacts and logs.

**GNUmakefile**  
The main Makefile for building the project, creating ISO images, and running the OS in QEMU.

## Kernel Directory (kernel)

**Cargo.toml**  
Defines the Rust project, its dependencies, and metadata.

**build.rs**  
A build script that configures the linker script based on the target architecture.

**GNUmakefile**  
A Makefile for building the kernel specifically, with support for different architectures and profiles.

**.gitignore**  
Specifies files to ignore in the kernel directory, such as build outputs.

**.cargo/config.toml**  
Configures the Rust build system to use custom standard libraries (core, alloc, etc.).

**rust-toolchain.toml**  
Specifies the nightly Rust toolchain and supported targets for the project.

**linker-\*.ld**  
Linker scripts for different architectures (e.g., x86\_64, aarch64, riscv64, loongarch64). These define memory layout and entry points.

**src/main.rs**  
The kernel entry point (kmain), which initializes the OS and enters the main loop.

**src/lib.rs**  
The main library file for the kernel, initializing subsystems like interrupts, memory, and tasks.

**src/boot.rs**  
Handles bootloader requests (e.g., memory map, framebuffer) using the Limine bootloader.

**src/log.rs**  
Implements logging macros for different log levels (e.g., trace, info, error).

**src/serial.rs**  
Provides serial port communication for debugging.

**src/writer.rs**  
Manages terminal output using the Flanterm library.

**src/rtc.rs**  
Reads the real-time clock (RTC) to get the current date and time.

**src/utils/**

* mod.rs: Utility module entry point.  
* types.rs: Helper functions for type conversions (e.g., Option to c\_void).  
* registers.rs: Functions to read CPU registers and print a register dump.

**src/memory/**

* **mod.rs:** Initializes memory management, including heap allocation and paging.  
* **paging.rs:** Handles virtual memory paging and page fault exceptions.  
* **alloc/mod.rs:** Implements a heap allocator using linked\_list\_allocator.  
* **alloc/dummy.rs**: A dummy allocator for testing.

**src/interrupts/**

* **mod.rs:** Initializes the interrupt system and defines interrupt indices.  
* **idt.rs:** Sets up the Interrupt Descriptor Table (IDT) and handlers for exceptions.  
* **gdt.rs:** Configures the Global Descriptor Table (GDT) and Task State Segment (TSS).

**src/fs/**

* **mod.rs:** Filesystem module entry point.  
* **vfs.rs:** Implements a Virtual Filesystem (VFS) abstraction.  
* **ramfs.rs:** Implements a RAM-based filesystem that reads a tar archive.  
* **memfs.rs:** Implements an in-memory filesystem for testing.

**src/task/**

* **mod.rs:** Defines tasks as Futures and assigns unique task IDs.  
* **executor.rs:** Implements a task executor for cooperative multitasking.

**src/devices/**

* **mod.rs:** Device module entry point.  
* **timer.rs:** Tracks system uptime using timer interrupts.  
* **keyboard/mod.rs:** Handles keyboard input using scancodes and async streams.

**src/drivers/**

* **mod.rs:** Driver module entry point.  
* **pic.rs:** Manages the Programmable Interrupt Controller (PIC) for hardware interrupts.

## Tools Directory (tools)

**gen-initrd.sh**  
A script to generate an initial RAM filesystem (ramfs.img) in either FAT32 or UStar format.

## Initrd Directory (initrd)

**welcome.txt**  
A text file displayed during OS initialization, stored in the RAM filesystem.

## Docs Directory (docs)

**syscalls.md**  
Documents the syscall API, including argument registers and syscall numbers.

## Limine Configuration

**limine.conf**  
Configuration file for the Limine bootloader, specifying the kernel and RAM filesystem paths.

## GitHub Actions (.github/workflows/)

**makefile.yml**  
A CI workflow to build the project using Makefile on Ubuntu, including Rust toolchain setup.

## Other Files

**.gitignore**  
Specifies files and directories to ignore globally, such as ISO images and logs.

This structure reflects a well-organized OS project, with clear separation of concerns for kernel subsystems, build tools, and documentation.