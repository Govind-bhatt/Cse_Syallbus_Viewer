🖥️ Steps to Run CSE Syllabus Viewer (Node.js + XAMPP Setup)
🔹 1. Install Node.js
Download and install Node.js
During installation:
Click Next on all steps
Keep default settings
Finish installation
🔹 2. Install XAMPP
Download and install XAMPP
During installation:
Click Next on all steps
Complete installation
🔹 3. Start Services in XAMPP
Open XAMPP Control Panel
Click Start for:
Apache → should turn Green
MySQL → should turn Green

👉 Green color indicates services are running successfully.

🔹 4. Prepare Project Folder
Upload or copy the folder Cse_Syllabus_Viewer to your Desktop
Open the folder
🔹 5. Open Command Prompt in Folder
In the folder:
Click on the file path bar
Type cmd and press Enter

👉 Command Prompt will open in that folder location.

🔹 6. Run the Server
In Command Prompt, type:
node server.js
If everything is correct, you will see:
Connected to DB

👉 This means the server is running successfully.

🔹 7. Open the Application
Locate index.html inside the folder
Double-click to open it in a browser

✅ Your project should now be running.

⚠️ Troubleshooting Tips
If node is not recognized → reinstall Node.js properly
If Apache/MySQL not green → check if ports (like 80, 3306) are busy
Ensure server.js exists in the folder
✅ Final Output
Server running ✔
Database connected ✔
Web page opened ✔
