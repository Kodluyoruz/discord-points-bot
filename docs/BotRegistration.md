# Discord Bot Application Instructions

---

<div align=center>
<a href="">
<img height=60 src="./images/turkce.png">
</a>
</div>

---

## Table of Contents

- [How to Create a Discord Server?](#how-to-create-a-discord-server)
- [Creating a Discord Application](#creating-a-discord-application)
- [Setting Up a Bot Account](#setting-up-a-bot-account)
- [Inviting the Bot to a Server](#inviting-the-bot-to-a-server)

## How to Create a Discord Server?

- Click on the **Create a server** button in the left sidebar where the list of servers in the application is visible.
- When the screen called **Create a server** appears, select the option to create a server that is most suitable for your needs.
- When the screen called **Tell us about your server** appears, choose one of the options according to the purpose of your server, and click the button.
- In the **Customize Your Server** screen, you can set the server name and image. After making these customizations, click the create button to create the server.
- A Discord server has been created.

## Creating a Discord Application

- You can go to the [Discord Developer Portal](https://discord.com/developers/applications) by clicking on the link to create an application. If you have not connected to your Discord account before, it will redirect you to the login page.
- Enter your email and password and log in to your Discord account. When you access your Discord account, you will be on the Discord page called **Developer Portal**.
- Click the **New Application** button in the top right corner of the **Developer Portal** page to create a new application. If you already have applications created before, they will be listed by clicking on **Applications** in the left sidebar.
- When you click the **New Application** button, the **Create An Application** window will open. In this window, you can create your application by entering the name of your application and clicking the **Create** button.
- Set the name, image, and description of your application in the **General Information** section that appears.

## Setting Up a Bot Account

- Click on the **Bot** tab in the left menu. Set the name and image of your bot.
- Click the **Reset Token** button and copy the token from the **Token** section of your bot. This token should be saved in our application's `.env` file as `BOT_TOKEN`.
- Optionally, you can enable the **PUBLIC BOT** feature. This feature allows your bot to be invited by everyone. If you enable this feature, anyone you share the bot's invite URL with can add your bot to their servers.
- In the **Privileged Gateway Intents** section, turn on the **PRESENCE INTENT**, **SERVER MEMBERS INTENT**, and **MESSAGE CONTENT INTENT** features. These features allow your bot to receive status updates, access server members, and read message content.

## Inviting the Bot to a Server

- After creating your bot account, click on the **OAuth2** tab in the left menu.
- Choose the **In-app Authorization** option from the **Authorization Method** section. This option generates a URL to invite your bot.
- In the **Scopes** section, check the **bot** and **applications.commands** options. These options allow your bot to join the server and use commands.
- In the **Bot Permissions** section, select the permissions you want your bot to have on the server. For example, if you check the **Administrator** option, your bot can do everything on the server. You can enable only the features that your bot needs. Remember that missing settings can prevent your bot from functioning properly.
- Click on the URL Generator tab below the OAuth2 tab. In the newly opened tab, once again check the **bot** and **applications.commands** options in the **Scopes** section. Check the **Administrator** option in the **Bot Permissions** section. Copy the URL under **GENERATED URL** and open it in a new tab.
- On the opened page, select the server where you want to invite your bot and click the **Authorize** button.
- Your bot has been successfully invited to your server.
