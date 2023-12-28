# 📱 Chatify - Chat App

Chatify is a realtime chat app built with Vite, React, TypeScript, Firebase, and other technologies. This chat app is purposefully made for the web, like a web chat app, but it also works on mobile devices.

## 🚀 Features

- 🗝 Sign in with Google (authentication)
- 👤 View your own profile, email, name, id, etc.
- 🗨 Create conversations (1-on-1 or group)
- 📬 Users can send:
  - 📁 Files
  - 🖼 Images
  - 📝 Text
- 🔗 Detect links and add an anchor tag to them
- 💬 Reply to messages, indicating what you're replying to (text, image, file, etc.)
- 📥 Drag and drop to upload files and images
- 🔔 Get notified of unseen messages
- 👀 See if someone has seen your message (via a small avatar moving down if seen)
- 😂 Send reactions to messages
- 😊 Send emojis through an emoji picker
- 👁 View reactions to each message
- 📸 View sent images and files
- 🔄 Change group picture and group name
- 🌓 Toggle between light mode and dark mode
- 🚮 Remove messages, with a note that says "message removed"
- 👑 Make someone an admin, kick someone out of the group, and add participants in the current active group again

## 🛠️ Main Technologies
- `React`
- `Firebase`
- `TypeScript`
- `Styled Components`
- `Vite`

## 📝 Process

I started by jotting down in my notebook what features I wanted. I often use WhatsApp Web, so I tried to draw inspiration from that.

I obviously started by setting up Firebase, then continued with authentication. Next, I set up routing, the home page, and the private route for it, then focused on the sidebar, since there's a lot happening there, and finally the chat page and its components.

Then it was the smaller details, like creating a drag and drop for images and files, adding an emoji picker, changing the group name, etc. I didn't have a design idea at first; I just built everything and came up with something later. By design, I mean the colors and the styling.

The most challenging part was figuring out how the data structure should be. One new thing I learned was indexing in Firebase. That was new to me and something I can take with me into the future.

## 🤔 How Can It Be Improved?

It would be amazing if users were able to send GIFs and stickers, just like on WhatsApp. Also, being able to send voice messages and videos to each other would greatly improve the project. Adding testing would be beneficial as well, something I definitely plan to do next time.

## 🐛 Current Bug

So far, I'm not really sure if there are any bugs. However, there might be some issues on the mobile version. I tested it out on my phone (iPhone 14 Pro Max), and so far it looks good there, but on smaller devices or Android phones, it might look a bit odd. I'm not sure from that side, but there might be some bugs to iron out.


<details>
<summary><h3> 🎥 - Demo Video </h3></summary>
<video src="https://github.com/mirayatech/Chatify/assets/71933266/c1695a42-8d74-4a00-b89c-e3b6adc4119d" controls="controls" style="max-width: 730px;">
</video>

<video src="https://github.com/mirayatech/Chatify/assets/71933266/f11d1d9b-2517-4a5c-81df-1711f4182da0" controls="controls">
</video>
  

</details>

<details>
<summary><h3> 📸 - Demo Images </h3></summary>

#

![Screenshot 2023-12-28 at 11 45 11](https://github.com/mirayatech/Chatify/assets/71933266/06f67da2-8a3b-480e-8dbb-9d9e69919329)

#

![Screenshot 2023-12-28 at 11 45 53](https://github.com/mirayatech/Chatify/assets/71933266/8e32115d-e902-46c4-acc2-cdadd4023cbf)

#

![Screenshot 2023-12-28 at 11 48 12](https://github.com/mirayatech/Chatify/assets/71933266/d4312f28-9208-4194-bece-805b642554bb)

  
#

![Screenshot 2023-12-28 at 11 48 35](https://github.com/mirayatech/Chatify/assets/71933266/2b7c6e2f-e67b-494b-9274-eba25a677efc)

#

![Screenshot 2023-12-28 at 11 52 06](https://github.com/mirayatech/Chatify/assets/71933266/0a233090-04e4-4a53-9959-d63b52d9831b)

#

![Screenshot 2023-12-28 at 11 52 15](https://github.com/mirayatech/Chatify/assets/71933266/a0a7d6d8-b16e-45de-ad44-d66eafdc55df)


#

![Screenshot 2023-12-28 at 11 53 01](https://github.com/mirayatech/Chatify/assets/71933266/041b4d98-4160-4d05-ad6a-2b9e8513258a)

#

![Screenshot 2023-12-28 at 11 53 20](https://github.com/mirayatech/Chatify/assets/71933266/257803b9-b218-441e-a30a-ed915ebdeecd)


#

![Screenshot 2023-12-28 at 11 54 04](https://github.com/mirayatech/Chatify/assets/71933266/984fd811-9fbf-4e10-b7e7-b3f794124d46)


</details>



