# CE-CZ4034-Information-Retrieval-Group-Project
Group Project Submission for CE/CZ4034 Information Retrieval

To add the Solr bin directory to your system's PATH environment variable and run the Solr server, you can follow these steps:
Step 1: Navigate to the bin directory within the Solr file and copy the full path. Path Example : `C:\User\xx\CE-CZ4034-Information-Retrieval-Group-Project\solr-9.2.0\bin`
Step 2: Open the Start menu and search for "environment variables".
Step 3: Click on "Edit the system environment variables".
Step 4: Click on the "Environment Variables" button.
Step 5: In the "System Variables" section, scroll down until you find the "Path" variable and click on the "Edit" button.
Step 6: Click on the "New" button and paste the full path to the Solr bin directory that you copied earlier
Step 7: Click on the "OK" button to save your changes and close all of the windows.

To start Apache solr server
Step 1: Make sure you have added the Solr bin directory to your system's PATH environment variable
Step 2: type `cd solr-9.2.0\bin` in terminal
Step 3: type `.\solr start` in terminal
Step 4: To access solr server webpage, open browser and go to "http://localhost:8983/"

To stop Apache solr server
Step 1: type `.\solr stop -all` in terminal used for solr previously and this will stop all solr servers

To start Website
Step 1: type `cd Application` in a new terminal
Step 2: type `npm install` in the terminal if haven't install required node_modules
Step 3: type `npm start` in terminal and wait for the application to open in browser or go to "http://localhost:3000/"