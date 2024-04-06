## SnapShot of the Application
___


![p1](https://github.com/Sapnil-Bhowmick/Real-Time-Code-Collaboration/assets/118714419/11a06c6a-575f-4543-8710-23fe404554f9)


## SyncWeave - A Fully Functional code editor where users can collaborate through real-time sync feature
   
___

* A dynamic platform for real-time code collaboration in HTML, CSS, and JavaScript, featuring intuitive UI, theme customization, seamless connection handling, and persistent session data.




## About The Project
___
* **This is a full-stack fast and Flexible code platform where users can collaborate and write code for HTML, CSS and Javascript along in real-time.**

## Project Features
___

* The Welcome screen has an intuitive UI where users can type a customized RoomId or can create a new RoomId using the **new room** link.

* If the user has the invitation of some specific Room then simply paste the invitation Id and type your username to join the room.

* A dropdown has been provided for choosing the desired **Editor Theme** of any choice

* If at some time connection gets dropped then that specific user will be automatically redirected to the Welcome page

* On joining the room users can view 3 editors (HTML,CSS,JS) provided for writing code. All 3 editors have auto-scroll feature. 

* Users can **resize** each of the editors to a minimum & maximum width as per choice and the line-wrapping will work accordingly.

* Users can also **Drag & Drop** code files and the code will get executed instantaneously.

* On the left side : List of Connected users has been provided which is the list of all connected users in a specific room. Whenever any new user 
joins that room , the list will get updated and all other users in that room will be notified with a notification and they can also view the updated connected users in real-time.

* Scroll down the list if needed to view all connected users in that room.
* Hover over a specific avatar to see their full name

* Just below the list of connected users 2 buttons are provided 
  - **COPY ROOM ID**: For copying and sharing the current RoomId.
  - **Leave**: For leaving the specific room
 

* The right side of the screen shows the output which is also synced with 
all users in a room in real-time

* Refreshing the page will **persist** the code in editors and also the output so there is no chance of losing the work in mid of any session




## SyncWeave- Notifications 

* Notification will be shown to all existing users of a room every time a new user joins and leaves i.e disconnected from that room

## A Drawback or Bug 

* Initially when a user joins a room then all the live code written by any other user in that room should get auto-synced in their editor. For some reason couldn't  receive the emitted auto-sync event.

## More Features That could be added
___

* Currently only 3 languages are supported. It can be extended to multiple languages.

* A messaging option could be provided so that users within a room can communicate with each other during a session.

  
