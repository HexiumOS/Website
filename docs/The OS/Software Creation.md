---
title: Software Creation
sidebar_position: 2
---
# 1\. Understand the Codebase

* Familiarize yourself with the project structure and key components. Refer to the README.md for an overview of the OS and its features.  
* Review the kernel's architecture, including subsystems like memory management, interrupts, and the virtual filesystem (VFS).

---

# 2\. Identify the Purpose of Your Software

Decide what kind of software you want to add:

* Kernel Module: Add functionality to the kernel (e.g., a new driver, system call, or memory feature).  
* User-Space Application: If Hexium OS supports user-space applications in the future, you can write standalone programs.  
* Filesystem or Driver: Extend the VFS or add hardware support.

---

# 3\. Add a New Module

If you're adding a kernel module:

**1\. Create a New File:**

* Add your file under the appropriate directory in **kernel/src**. For example:  
  * Drivers: drivers  
  * Filesystems: fs  
  * Utilities: utils  
  * Devices: devices  
* Example: kernel/src/devices/mouse.rs for a mouse device driver.

---

**2\. Register the Module:**

* Add your module to the corresponding **mod.rs** file. For example:  
```   
// filepath: kernel/src/drivers/mod.rs  
pub mod mouse;
```
---

**3\. Implement the Module:**

* Follow the patterns used in existing modules. For example, use traits like **FileSystem** for filesystems or implement interrupt handlers for hardware drivers.

---

**4\. Integrate with the Kernel:**

* Modify the init function in **kernel/src/lib.rs** to initialize your module:
```
pub fn init() {  
	writer::init();  
	interrupts::init();  
	memory::init();  
	devices::mouse::init(); // Initialize your new module  
}  
```
---

# 4\. Add a New Task

If you're adding a task (e.g., an async process):

**1\. Define the Task:**

* Create a new async function in task. For example:
```
pub async fn example\_task() {  
	loop {  
			println\!("Running example task...");  
			crate::hlt\_loop(); // Simulate work  
	}  
}
```
**2\. Spawn the Task:**

* Add the task to the executor in **kernel/src/lib.rs**:

	let \_ \= executor.spawn(crate::task::Task::new(task::example\_task()));  
---

# 5\. Add a New System Call

If you're adding a syscall:

**1\. Define the Syscall:**

* Add a new function in the syscall handler (e.g., **kernel/src/syscalls.rs).**

* **\!\!\! IMPORTANT \!\!\!** Use the syscall ABI described in [**docs/syscalls.md**](https://github.com/HexiumOS/Hexium/blob/main/docs/syscalls.md). If the syscall you want to implement not is present create it off the Linux syscall ABI

**2\. Register the Syscall:**

* Assign a unique syscall number and update the syscall dispatcher.

---

# 6\. Test Your Changes

* Use QEMU to test your changes:

		make run

* Add logging with macros like trace\!, info\!, or error\! (**kernel/src/devices/keyboard/mod.rs**, **kernel/src/fs/ramfs.rs** and **kernel/src/lib.rs**, respectively) to debug  your code.

---

# 7\. Document Your Changes

* Update the relevant documentation files (e.g., **README.md**, **docs/syscalls.md**) or submit a PR to the website repository.  
* Write comments and docstrings for your code.

---

# 8\. Submit Your Changes

* If contributing to the project, follow the **CONTRIBUTING.md** guidelines:  
1. Fork the repository.  
2. Create a new branch for your feature.  
3. Submit a pull request with a clear description of your changes.

---

By following these steps, you can effectively add new software to the Hexium OS codebase. Let me know if you need help with specific code\!