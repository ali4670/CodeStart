-- =============================================================
-- Python Foundations for Thanaweya Students - Full Course
-- Complete curriculum with exams, data, and classroom structure
-- Each classroom = one level in the database
-- =============================================================

-- Clear existing Python course data
delete from public.exam_submissions where lecture_id in (
  select id from public.lectures where level_id in (
    select id from public.levels where title like '%Python Foundations%'
  )
);
delete from public.exam_responses;
delete from public.exam_attempts;
delete from public.quiz_attempts where lecture_id in (
  select id from public.lectures where level_id in (
    select id from public.levels where title like '%Python Foundations%'
  )
);
delete from public.exams where level_id in (
  select id from public.levels where title like '%Python Foundations%'
);
delete from public.student_progress where lecture_id in (
  select id from public.lectures where level_id in (
    select id from public.levels where title like '%Python Foundations%'
  )
);
delete from public.lectures where level_id in (
  select id from public.levels where title like '%Python Foundations%'
);
delete from public.level_chats where level_id in (
  select id from public.levels where title like '%Python Foundations%'
);
delete from public.level_access where level_id in (
  select id from public.levels where title like '%Python Foundations%'
);
delete from public.levels where title like '%Python Foundations%';

-- =============================================================
-- CLASSROOM 1: Python Foundations - Basics
-- =============================================================
do $$
declare
  level_id uuid;
begin
  insert into public.levels (title, level_order, image_url, is_published, drip_interval_days)
  values ('Python Foundations - Basics', 1, 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80', true, 0)
  returning id into level_id;

  delete from public.lectures where level_id = level_id;

  insert into public.lectures (level_id, title, description, slot_number, is_live, quiz_required, content_blocks, quiz_data, drip_days) values
  (level_id, 'Module 1: Python Setup and First Output', 'Set up Python environment and write your first program.', 1, true, true,
   '[
     {"id":"m1-1","type":"text","content":"Welcome to Python Foundations. Learn to run Python code and display output."},
     {"id":"m1-2","type":"code","content":"print(\"Welcome to CodeStart Python\")\nprint(\"Hello, Thanaweya Student!\")"},
     {"id":"m1-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What does print() do?","options":["Displays output to the screen","Stores a variable","Repeats code","Creates a file"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q1","text":"Which symbol starts a Python comment?","options":["#","/","//","--"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 2: Variables and Data Types', 'Store and manipulate student data.', 2, true, true,
   '[
     {"id":"m2-1","type":"text","content":"Variables store data. Python auto-detects types."},
     {"id":"m2-2","type":"code","content":"age = 17\nheight = 175.5\nname = \"Ahmed\"\nis_student = True\nprint(age, height, name, is_student)"},
     {"id":"m2-3","type":"quiz","content":"","metadata":{"quiz":{"question":"Which is a string type?","options":["\"Hello\"","123","True","3.14"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q2","text":"What does type() return?","options":["Data type","Value","Name","None"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 3: User Input and Output', 'Collect student information.', 3, true, true,
   '[
     {"id":"m3-1","type":"text","content":"Use input() to get data from users."},
     {"id":"m3-2","type":"code","content":"name = input(\"Enter your name: \")\nage = int(input(\"Enter your age: \"))\nprint(f\"Hello {name}, you are {age} years old\")"},
     {"id":"m3-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What does int() do?","options":["Converts to integer","Converts to string","Deletes value","Creates list"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q3","text":"How to convert input to number?","options":["int(input())","str(input())","float(input())","input(int())"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 4: Arithmetic Operations', 'Calculate grades and averages.', 4, true, true,
   '[
     {"id":"m4-1","type":"text","content":"Python supports all basic math operations."},
     {"id":"m4-2","type":"code","content":"math = 85\nscience = 92\naverage = (math + science) / 2\nprint(f\"Average: {average}\")"},
     {"id":"m4-3","type":"quiz","content":"","metadata":{"quiz":{"question":"Which operator is for exponentiation?","options":["**","^","//","%"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q4","text":"What is 5 ** 2?","options":["10","25","15","None"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 5: Conditional Statements', 'Make decisions based on scores.', 5, true, true,
   '[
     {"id":"m5-1","type":"text","content":"Conditionals let your program make decisions."},
     {"id":"m5-2","type":"code","content":"score = 85\nif score >= 90:\n    print(\"Excellent\")\nelif score >= 70:\n    print(\"Good\")\nelse:\n    print(\"Needs work\")"},
     {"id":"m5-3","type":"quiz","content":"","metadata":{"quiz":{"question":"When does elif run?","options":["After if is false and its condition is true","Before if","Always","Only inside loops"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q5","text":"What does else handle?","options":["Remaining case","First condition","Middle condition","All conditions"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 6: For Loops', 'Repeat tasks without rewriting.', 6, true, true,
   '[
     {"id":"m6-1","type":"text","content":"Loops repeat code without rewriting."},
     {"id":"m6-2","type":"code","content":"subjects = [\"Math\", \"Physics\", \"Chemistry\"]\nfor subject in subjects:\n    print(f\"Review {subject} for 30 minutes\")"},
     {"id":"m6-3","type":"quiz","content":"","metadata":{"quiz":{"question":"When should you use a loop?","options":["When a task repeats","When writing CSS","When uploading a PDF","Only for graphics"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q6","text":"What does for item in list do?","options":["Takes each item one by one","Deletes the list","Creates a new variable","Sorts the list"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 7: Lists and Collections', 'Store multiple subjects and scores.', 7, true, true,
   '[
     {"id":"m7-1","type":"text","content":"Lists store multiple related values."},
     {"id":"m7-2","type":"code","content":"scores = [85, 91, 78, 96]\nprint(scores[0])\nprint(len(scores))\nprint(max(scores))"},
     {"id":"m7-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What is a list good for?","options":["Storing many related items","Replacing conditions","Rendering video","Creating a database"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q7","text":"What does len(scores) return?","options":["Number of items","Highest item","First item","Type"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 8: Dictionaries', 'Store structured student records.', 8, true, true,
   '[
     {"id":"m8-1","type":"text","content":"Dictionaries store key-value pairs."},
     {"id":"m8-2","type":"code","content":"student = {\"name\": \"Omar\", \"grade\": 3, \"track\": \"Software Engineering\"}\nprint(student[\"name\"])\nprint(student[\"track\"])"},
     {"id":"m8-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What does a dictionary store?","options":["Key-value pairs","Only numbers","Only loops","Only lists"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q8","text":"How to get dictionary value?","options":["dict[\"key\"]","dict.key","dict.get(key)","All work"],"correct":0}]'::jsonb, 0);

  -- Create exam for Classroom 1
  insert into public.exams (level_id, title, questions, passing_score)
  values (level_id, 'Python Foundations - Basics Exam',
  '[
    {"id":"exam1-q1","question":"What does print() do?","options":["Displays output","Stores data","Loops code","Creates file"],"correct":0},
    {"id":"exam1-q2","question":"Which is a string type?","options":["\"Hello\"","123","True","3.14"],"correct":0},
    {"id":"exam1-q3","question":"What does int() do?","options":["Converts to integer","Converts to string","Deletes value","Creates list"],"correct":0}
  ]'::jsonb, 70);

end $$;

-- =============================================================
-- CLASSROOM 2: Python Foundations - Intermediate
-- =============================================================
do $$
declare
  level_id uuid;
begin
  insert into public.levels (title, level_order, image_url, is_published, drip_interval_days)
  values ('Python Foundations - Intermediate', 2, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80', true, 0)
  returning id into level_id;

  delete from public.lectures where level_id = level_id;

  insert into public.lectures (level_id, title, description, slot_number, is_live, quiz_required, content_blocks, quiz_data, drip_days) values
  (level_id, 'Module 9: Functions', 'Write reusable functions.', 1, true, true,
   '[
     {"id":"m9-1","type":"text","content":"Functions package code for reuse."},
     {"id":"m9-2","type":"code","content":"def calculate_average(scores):\n    return sum(scores) / len(scores)\nprint(calculate_average([85, 91, 78]))"},
     {"id":"m9-3","type":"quiz","content":"","metadata":{"quiz":{"question":"Why use a function?","options":["To reuse logic","To slow program","To remove variables","To replace loops"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q9","text":"What does return do?","options":["Sends value back","Prints output","Ends program","Creates variable"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 10: File Handling', 'Save and load student data.', 2, true, true,
   '[
     {"id":"m10-1","type":"text","content":"Save data to files for persistence."},
     {"id":"m10-2","type":"code","content":"with open(\"progress.txt\", \"w\") as file:\n    file.write(\"Completed Module 1\\n\")\nwith open(\"progress.txt\", \"r\") as file:\n    print(file.read())"},
     {"id":"m10-3","type":"quiz","content":"","metadata":{"quiz":{"question":"Why use with open()?","options":["Handle files safely","Create loops","Store variables","Import modules"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q10","text":"What does \"w\" mode mean?","options":["Write","Read","Append","Delete"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 11: Error Handling', 'Handle invalid input safely.', 3, true, true,
   '[
     {"id":"m11-1","type":"text","content":"try/except catches errors safely."},
     {"id":"m11-2","type":"code","content":"try:\n    score = int(input(\"Enter score: \"))\nexcept ValueError:\n    print(\"Please enter a valid number\")"},
     {"id":"m11-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What is the purpose of except?","options":["Handle errors","Loop code","Store data","Create functions"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q11","text":"Which error for invalid number conversion?","options":["ValueError","SyntaxError","TypeError","KeyError"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 12: Project - Grade Tracker', 'Build a complete grade tracking application.', 4, true, true,
   '[
     {"id":"m12-1","type":"text","content":"Complete project: Student Grade Tracker"},
     {"id":"m12-2","type":"code","content":"def calculate_average(scores):\n    return sum(scores) / len(scores)\n\ndef is_passing(score):\n    return score >= 50\n\nscores = [85, 92, 78]\navg = calculate_average(scores)\nprint(f\"Average: {avg}\")\nif is_passing(avg):\n    print(\"You are passing!\")"},
     {"id":"m12-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What should you build first in a project?","options":["A small working core","Every advanced feature","Final styling only","Nothing"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q12","text":"Why break projects into steps?","options":["To test each part","To make it longer","To avoid code","To remove functions"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 13: Nested Lists', 'Work with 2D data like schedules.', 5, true, true,
   '[
     {"id":"m13-1","type":"text","content":"Nested lists store complex data."},
     {"id":"m13-2","type":"code","content":"week = [[\"Math\", \"Physics\"], [\"Chemistry\", \"English\"]]\nfor day in week:\n    print(day)\nprint(week[0][0])"},
     {"id":"m13-3","type":"quiz","content":"","metadata":{"quiz":{"question":"How to access row 2, column 3?","options":["list[1][2]","list[2][3]","list[2][2]","list[1][3]"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q13","text":"Python indexing is:","options":["Zero-based","One-based","Two-based","Depends"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 14: String Methods', 'Process and format text data.', 6, true, true,
   '[
     {"id":"m14-1","type":"text","content":"String methods help process text."},
     {"id":"m14-2","type":"code","content":"name = \"  Ahmed  \"\nprint(name.upper())\nprint(name.lower())\nprint(name.strip())\nprint(name.replace(\" \", \"_\"))"},
     {"id":"m14-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What does strip() do?","options":["Removes whitespace","Removes letters","Converts case","Splits string"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q14","text":"Which converts to uppercase?","options":["upper()","lower()","strip()","replace()"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 15: Working with External Data', 'Read and process CSV-like data.', 7, true, true,
   '[
     {"id":"m15-1","type":"text","content":"Process external data formats."},
     {"id":"m15-2","type":"code","content":"csv_data = \"\"\"name,math,science\nAhmed,85,92\nFatma,88,90\"\"\"\nlines = csv_data.strip().split(\"\\n\")\nfor line in lines[1:]:\n    values = line.split(\",\")\n    print(values)"},
     {"id":"m15-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What does split() do?","options":["Breaks string","Joins strings","Removes chars","Counts letters"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q15","text":"How to import datetime?","options":["import datetime","from datetime","using datetime","require"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 16: Libraries and Modules', 'Use useful Python libraries.', 8, true, true,
   '[
     {"id":"m16-1","type":"text","content":"Libraries add extra functionality."},
     {"id":"m16-2","type":"code","content":"import random\nimport datetime\n dice = random.randint(1, 6)\nprint(f\"Dice roll: {dice}\")\nnow = datetime.datetime.now()\nprint(now)"},
     {"id":"m16-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What does import do?","options":["Load external code","Run program","Delete files","Create variables"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q16","text":"How to import a module?","options":["import module","from m import f","using m","require"],"correct":0}]'::jsonb, 0);

  -- Create exam for Classroom 2
  insert into public.exams (level_id, title, questions, passing_score)
  values (level_id, 'Python Foundations - Intermediate Exam',
  '[
    {"id":"exam2-q1","question":"What does len() return?","options":["Item count","Highest value","First item","Empty list"],"correct":0},
    {"id":"exam2-q2","question":"What does strip() do?","options":["Removes whitespace","Removes letters","Converts case","Splits string"],"correct":0},
    {"id":"exam2-q3","question":"What does split() do?","options":["Breaks string","Joins strings","Removes chars","Counts letters"],"correct":0}
  ]'::jsonb, 70);

end $$;

-- =============================================================
-- CLASSROOM 3: Python Foundations - Advanced & Final
-- =============================================================
do $$
declare
  level_id uuid;
begin
  insert into public.levels (title, level_order, image_url, is_published, drip_interval_days)
  values ('Python Foundations - Advanced', 3, 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80', true, 0)
  returning id into level_id;

  delete from public.lectures where level_id = level_id;

  insert into public.lectures (level_id, title, description, slot_number, is_live, quiz_required, content_blocks, quiz_data, drip_days) values
  (level_id, 'Module 17: Object-Oriented Programming', 'Create classes for students.', 1, true, true,
   '[
     {"id":"m17-1","type":"text","content":"Classes create custom data types."},
     {"id":"m17-2","type":"code","content":"class Student:\n    def __init__(self, name, grade):\n        self.name = name\n        self.grade = grade\n        self.scores = []\n    def add_score(self, score):\n        self.scores.append(score)"},
     {"id":"m17-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What is a class used for?","options":["Creating objects","Storing numbers","Making functions","Importing modules"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q17","text":"What does self mean?","options":["Instance reference","Global variable","Function name","Module"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 18: JSON and File Persistence', 'Save and load data.', 2, true, true,
   '[
     {"id":"m18-1","type":"text","content":"JSON format for data persistence."},
     {"id":"m18-2","type":"code","content":"import json\nstudent = {\"name\": \"Ahmed\", \"scores\": [85, 92]}\nwith open(\"data.json\", \"w\") as f:\n    json.dump(student, f)\nwith open(\"data.json\", \"r\") as f:\n    loaded = json.load(f)"},
     {"id":"m18-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What does json.dump() do?","options":["Writes to file","Prints output","Creates variable","Imports module"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q18","text":"How to read JSON?","options":["json.load()","json.read()","json.open()","file.read()"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 19: Project - Complete Tracker', 'Build the final application.', 3, true, true,
   '[
     {"id":"m19-1","type":"text","content":"Final project: Complete Student Tracker"},
     {"id":"m19-2","type":"code","content":"class StudentTracker:\n    def __init__(self, name):\n        self.name = name\n        self.subjects = {}\n    def add_subject(self, name, target):\n        self.subjects[name] = {\"target\": target, \"completed\": 0}\n    def log_study(self, subject, hours):\n        self.subjects[subject][\"completed\"] += hours\n\ntracker = StudentTracker(\"Ahmed\")\ntracker.add_subject(\"Math\", 50)\ntracker.log_study(\"Math\", 2)\nprint(f\"Progress: {tracker.subjects['Math']}\")"},
     {"id":"m19-3","type":"quiz","content":"","metadata":{"quiz":{"question":"What makes a good project?","options":["Small steps, tested parts","All code at once","No testing","No planning"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q19","text":"Why break into steps?","options":["To test each part","To make it longer","To avoid code","To remove functions"],"correct":0}]'::jsonb, 0),

  (level_id, 'Module 20: Final Exam Preparation', 'Review key concepts for final exam.', 4, true, true,
   '[
     {"id":"m20-1","type":"text","content":"Final exam preparation: Review all key concepts."},
     {"id":"m20-2","type":"code","content":"# Variables\nx = 10\n# Conditionals\nif x > 5:\n    print(\"Big\")\n# Loops\nfor i in range(3):\n    print(i)\n# Functions\ndef square(n):\n    return n * n"},
     {"id":"m20-3","type":"quiz","content":"","metadata":{"quiz":{"question":"range(3) produces:","options":["0,1,2","1,2,3","0,1,2,3","3 only"],"correctOptionIndex":0}}}
   ]'::jsonb,
   '[{"id":"q20","text":"Python is:","options":["Interpreted","Compiled","Both","Neither"],"correct":0}]'::jsonb, 0);

  -- Create final exam for Classroom 3
  insert into public.exams (level_id, title, questions, passing_score)
  values (level_id, 'Python Foundations - Final Exam',
  '[
    {"id":"final-q1","question":"What does print() do?","options":["Displays output","Stores data","Loops code","Creates file"],"correct":0},
    {"id":"final-q2","question":"Which is a string type?","options":["\"Hello\"","123","True","3.14"],"correct":0},
    {"id":"final-q3","question":"Which operator is for exponentiation?","options":["**","^","//","%"],"correct":0}
  ]'::jsonb, 70);

end $$;

-- Grant access to approved students
grant policy on public.levels for select using (public.is_moderator() or public.is_approved());
grant policy on public.lectures for select using (public.is_moderator() or public.can_access_lecture(id));
grant policy on public.exams for select using (public.is_moderator() or (public.is_approved() and public.has_level_access(level_id)));