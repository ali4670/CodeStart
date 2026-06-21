# Module 01: Introduction to Python

## Learning Objectives
By the end of this module, students will be able to:
- Understand what Python is and its applications
- Install Python on their computers
- Use Python IDLE and other development environments
- Write and execute their first Python program
- Understand basic Python syntax and conventions

## 1.1 What is Python?
Python is a high-level, interpreted programming language known for its simplicity and readability. It was created by Guido van Rossum and first released in 1991.

### Key Features of Python:
- Easy to learn and use
- Expressive and readable syntax
- Extensive standard library
- Cross-platform compatibility
- Open source and free to use
- Supports multiple programming paradigms (procedural, object-oriented, functional)

### Applications of Python:
- Web development (Django, Flask)
- Data science and analysis (NumPy, Pandas, Matplotlib)
- Artificial intelligence and machine learning
- Automation and scripting
- Game development
- Desktop applications
- Scientific computing

## 1.2 Installing Python

### For Windows:
1. Go to https://www.python.org/downloads/
2. Click "Download Python" button
3. Run the installer
4. **Important**: Check "Add Python to PATH" during installation
5. Click "Install Now"

### For macOS:
1. Go to https://www.python.org/downloads/
2. Download the macOS installer
3. Run the installer package
4. Follow the installation prompts

### For Linux:
Most Linux distributions come with Python pre-installed. To check:
```bash
python3 --version
```
If not installed, use your package manager:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3

# Fedora
sudo dnf install python3

# CentOS/RHEL
sudo yum install python3
```

## 1.3 Running Your First Python Program

### Using Python IDLE:
1. Open Python IDLE (installed with Python)
2. You'll see the Python Shell (>>> prompt)
3. Type: `print("Hello, Thanaweya Students!")`
4. Press Enter
5. You should see: `Hello, Thanaweya Students!`

### Using Command Line:
1. Open Command Prompt (Windows) or Terminal (macOS/Linux)
2. Type: `python` or `python3`
3. You'll see the Python prompt (>>>)
4. Type: `print("Hello, Thanaweya Students!")`
5. Press Enter

### Creating and Running a Python File:
1. Open a text editor (Notepad, VS Code, etc.)
2. Type: `print("Hello, Thanaweya Students!")`
3. Save the file as `hello.py`
4. Open Command Prompt/Terminal
5. Navigate to the folder containing hello.py
6. Type: `python hello.py` or `python3 hello.py`
7. Press Enter
8. You should see: `Hello, Thanaweya Students!`

## 1.4 Python Development Environments

### IDLE (Integrated Development and Learning Environment):
- Comes with Python installation
- Simple and beginner-friendly
- Includes Python shell and text editor

### Other Popular IDEs:
- **VS Code** (Visual Studio Code): Free, extensible, great for beginners
- **PyCharm**: Professional IDE with free community edition
- **Thonny**: Specifically designed for beginners
- **Spyder**: Good for scientific computing

## 1.5 Basic Python Syntax Rules

### Indentation:
- Python uses indentation to define code blocks
- Typically 4 spaces per indent level
- Consistent indentation is required

### Comments:
- Single line: `# This is a comment`
- Multi-line: 
  ```
  """
  This is a
  multi-line comment
  """
  ```
  or
  ```
  '''
  This is also
  a multi-line comment
  '''
  ```

### Statements:
- Each statement ends with a newline
- No semicolons required (though allowed)
- Multiple statements can be on one line separated by semicolons

### Case Sensitivity:
- Python is case-sensitive: `Variable` and `variable` are different
- Keywords are all lowercase: `if`, `else`, `while`, `for`, etc.

## 1.6 First Python Program Explained

Let's examine our first program:
```python
print("Hello, Thanaweya Students!")
```

- `print()` is a built-in function that outputs text to the console
- The text to be printed is placed inside parentheses
- Text strings are enclosed in quotation marks (single or double)
- The statement ends with a newline

## Exercises

### Exercise 1.1: Installation Verification
1. Install Python on your computer if not already installed
2. Open Python IDLE or command line
3. Verify Python is working by checking the version

### Exercise 1.2: First Programs
1. Create a program that prints your name
2. Create a program that prints your school name
3. Create a program that prints your favorite subject

### Exercise 1.3: Exploring IDLE
1. Open Python IDLE
2. Try several print statements in the shell
3. Create a new file and save it
4. Run the file from IDLE

## Quiz Questions

### Question 1.1: What is Python primarily known for?
A) Complex syntax
B) Difficulty to learn
C) Simplicity and readability
D) Being a low-level language

### Question 1.2: Which symbol is used for single-line comments in Python?
A) //
B) #
C) /*
D) <!--

### Question 1.3: What is the correct way to check Python version in command line?
A) python version
B) python --version
C) version python
D) check python

## Answers
1.1: C
1.2: B
1.3: B

## Summary
In this module, we learned:
- What Python is and why it's popular
- How to install Python on different operating systems
- How to run Python programs using IDLE and command line
- Basic Python syntax rules
- Wrote our first Python program

In the next module, we'll explore Python's basic syntax in more detail, including variables, data types, and operators.