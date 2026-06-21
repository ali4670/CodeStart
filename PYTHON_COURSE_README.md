# Python Foundations for Thanaweya Students - Complete Course

## Overview

This is a comprehensive Python programming course designed specifically for Egyptian Thanaweya (secondary school) students. The course is organized into **3 classrooms**, each representing a distinct learning level with its own curriculum, exams, and classroom space.

## Classroom Structure

### Classroom 1: Python Foundations - Basics
- **8 Modules** (1-8)
- Topics: Variables, data types, user input, arithmetic, conditionals, loops, lists, dictionaries
- **Exam**: Basics Exam (3 questions)

### Classroom 2: Python Foundations - Intermediate
- **8 Modules** (9-16)
- Topics: Functions, file handling, error handling, nested lists, string methods, external data, libraries
- **Exam**: Intermediate Exam (3 questions)

### Classroom 3: Python Foundations - Advanced & Final
- **4 Modules** (17-20)
- Topics: OOP basics, JSON persistence, final project, exam preparation
- **Exam**: Final Exam (3 questions)

## Database Schema

The course uses the following database tables:

- `levels` - Each classroom is a level
- `lectures` - Each module is a lecture
- `exams` - Each classroom has an exam
- `exam_attempts` - Student exam submissions
- `exam_responses` - Individual question responses
- `student_progress` - Lecture completion tracking

## SQL Setup

Run the SQL file to set up the course:

```bash
psql -d your_database -f src/python-foundations-thanaweya-full-course.sql
```

## Exam Structure

Each exam contains 3 multiple-choice questions. To pass, students must score at least 70% (2 out of 3 correct answers).

### Example Exam Questions

**Basics Exam:**
1. What does print() do?
2. Which is a string type?
3. What does int() do?

**Intermediate Exam:**
1. What does len() return?
2. What does strip() do?
3. What does split() do?

**Final Exam:**
1. What does print() do?
2. Which is a string type?
3. Which operator is for exponentiation?

## Progress Tracking

Students progress through:
1. Complete all lectures in a classroom
2. Take the classroom exam
3. Pass with 70%+ to unlock the next classroom

## Files

- `src/python-foundations-thanaweya-full-course.sql` - Database setup
- `src/lib/mock-courses.ts` - Course metadata and structure
- `src/types/codestart.ts` - TypeScript interfaces