<a  name="readme-top"></a>

# Kodluyoruz Discord Points Bot

![banner](../docs/images/BANNER.png)

---

<div  align= center>
<a href = "../README.md">
<img height=60 src="../docs/images/turkce.png">
</a>
</div>

---

## About the Project 📜

Kodluyoruz team and Kodluyoruz Open Source volunteers have prepared a Discord points bot that is customizable, user-friendly and creates an automatic scoring system to be used on Discord servers. This scoring system is a tool to track the participation of members in activities on the server, reward active members, and help improve the community experience. It will assist server administrators in streamlining these processes.

## Table of Contents 📑

- [About the Project 📜](#about-the-project-)
- [Getting Started 📌](#getting-started-)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Versions](#versions)
- [Screenshots 📷](#screenshots-)
- [Features 🖥️](#features-️)
  - [User](#user)
  - [Moderation](#moderation)
- [Contributors 👩‍💻](#contributors-)
- [Code of Conduct 🎯](#code-of-conduct-)
- [Contributing 👨‍💻](#contributing-)
- [License ©](#license-)

<p align="right">(<a href="#readme-top"> back to top </a>)</p>

## Getting Started 📌

### Requirements

[Discord.js](https://discord.js.org/#/) v14.13.0 requires [TypeScript](https://www.typescriptlang.org/) v5.2.2 and [Node.js](https://nodejs.org/en/download) v16.11.0 or newer.

To store project data, it requires [MongoDB](https://www.mongodb.com/) database. To make the bot work, you need to create a bot on the [Discord Developer Portal](https://discord.com/developers/applications). For detailed information on creating a Discord bot, you can refer to the [Discord Bot Application Instructions](./docs/BotKaydi.md) document.

### Installation

For more information on how to use and run the project, you can read the following text.

Make sure you have Node.js installed, preferably the LTS version or a newer one. If Node.js is not installed, you can download and install it from the following website: <https://nodejs.org/en/>

Ensure that MongoDB is installed. If MongoDB is not installed, you can download and install it from the following website: <https://www.mongodb.com/>

You can also use an existing MongoDB database. To create a MongoDB database, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

Clone this project or download it to your device by clicking the "Download ZIP" button under the "Code" button on the project page and extract the contents of the zip file to your working directory. To clone it, you can use the following command:

```bash
git clone https://github.com/Kodluyoruz/discord-points-bot
```

In the console, run `yarn install` or `npm install` to install the required dependencies.

Create a `.env` file and create a variable named `BOT_TOKEN` to assign your bot's token. You can obtain your token from the Discord Developer Portal. For the MongoDB database, create a variable named `DBACCESS` and assign the MongoDB connection string. You can create your configuration file as follows:

```sh
BOT_TOKEN=your-discord-bot-token-goes-here
DBACCESS=mongodb+srv://username:password@example.com/database-name
```

To run your bot, enter the following command in the console: `yarn start` or `npm start`.

### Versions

| Technology  | Versions   |
| ----------- | ---------- |
| discord.js  | v14.13.0   |
| i18next     | v23.5.1    |
| Mongoose    | v7.5.1     |
| Winston     | v3.10.0    |

<p align="right">(<a href="#readme-top"> back to top </a>)</p>

## Screenshots 📷

![images1_en](images/image1_en.png)
![images2_en](images/image2_en.png)

<p align="right">(<a href="#readme-top"> back to top </a>)</p>

## Features 🖥️

### User

- ⚡ **Bot Guide** - You can become familiar with the system with a specially tailored guide on how to earn points.
- ⚡ **Easy Join** - You can easily join the point system and start earning points quickly.
- ⚡ **Earning Points** - You can earn points through various actions such as sending messages, inviting friends and being in voice channels.
- ⚡ **Point Status** - Through a specially designed UI, you can easily access real-time point status and ranking of users.
- ⚡ **User Activity** - With the user statistics card, you can personally track your activity on the server, including server rank, message statistics, and voice activity.
- ⚡ **Dynamic Notifications** - You can easily follow notifications related to your point status and stay informed about your point activity.
- ...

### Moderation

- ⚡ **Easy Setup** - After adding the bot to the server, you can easily and quickly set it up by following the instructions.
- ⚡ **Dynamic Structure** - In addition to earning points with standard types such as voice, message, and invitation, it can be customized by the moderator.
- ⚡ **Language Support** - Multi-language support can be provided with Turkish and English.
- ⚡ **Point Management** - In case of abuse, the moderator can intervene in the user's points.
- ⚡ **Period Management** - The ranking can be listed in different periods by the moderator.
- ...

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributors 👩‍💻

Thank you for contributions. We appreciate everyone who contributes.
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/azateser">
          <img src="https://avatars.githubusercontent.com/u/16418661?v=40" width="100px;" alt="Azat Eser" />
          <br /><sub><b>Azat Eser</b></sub></a><br />
        <span title="Designer">🎨</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/WildGenie">
          <img src="https://avatars.githubusercontent.com/u/39780?v=4" width="100px;"
            alt="Bilgehan Zeki Özaytaç" />
          <br /><sub><b>Bilgehan Zeki Özaytaç</b></sub></a><br />
        <span title="Reviewer">👀</span>
        <span title="Tools">🔧</span>
        <span title="Answering Questions">💬</span>
        <span title="Maintenance">🚧</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/cennetgun">
          <img src="https://avatars.githubusercontent.com/u/110102435?v=4" width="100px;"
            alt="Cennet Gündoğdu" />
          <br /><sub><b>Cennet Gündoğdu</b></sub></a><br />
        <span title="Documentation">📖</span>
        <span title="Translation">🌍</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/denizk1">
          <img src="https://avatars.githubusercontent.com/u/65414904?v=4" width="100px;"
            alt="Deniz Kaparlar" /><br /><sub><b>Deniz Kaparlar</b></sub></a><br />
        <span title="Code">💻</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/EcenurrKaya"><img src="https://avatars.githubusercontent.com/u/74544465?v=4"
            width="100px;" alt="Ecenur Kaya" /><br /><sub><b>Ecenur Kaya</b></sub></a><br />
        <span title="Documentation">📖</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://www.behance.net/ekincanakn">
          <img src="https://pps.services.adobe.com/api/profile/A10D3FF85A9FA52D0A495E6A@AdobeID/image/b43c4e52-f6c7-43aa-9339-f2e105dd3e5c/138"
            width="100px;" alt="Ekin Can Akın" />
          <br /><sub><b>Ekin Can Akın</b></sub></a><br />
        <span title="Designer">🎨</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/furkanulutas0"><img
            src="https://avatars.githubusercontent.com/u/92738122?v=4" width="100px;" alt="Furkan Ulutaş" />
          <br /><sub><b>Furkan Ulutaş</b></sub></a><br />
        <span title="Documentation">📖</span>
      </td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/ismet-k">
          <img src="https://avatars.githubusercontent.com/u/73839772?v=4" width="100px;"
            alt="İsmet Kabasakal" />
          <br /><sub><b>İsmet Kabasakal</b></sub></a><br />
        <span title="Documentation">📖</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/code-a-man">
          <img src="https://avatars.githubusercontent.com/u/43219246?v=4" width="100px;" alt="Metin Arslan" />
          <br /><sub><b>Metin Arslan</b></sub></a><br />
        <span title="Reviewer">👀</span>
        <span title="Code">💻</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/metinbicaksiz">
          <img src="https://avatars.githubusercontent.com/u/72347095?v=4" width="100px;"
            alt="Metin Bıçaksız" />
          <br /><sub><b>Metin Bıçaksız</b></sub></a><br />
        <span title="Code">💻</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/muffafa">
          <img src="https://avatars.githubusercontent.com/u/62511949?v=4" width="100px;"
            alt="Muhammed Mustafa Savar" />
          <br /><sub><b>Muhammed Mustafa Savar</b></sub></a><br />
        <span title="Reviewer">👀</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/Onur-Morkoc">
          <img src="https://avatars.githubusercontent.com/u/101945372?v=4" width="100px;" alt="Onur Morkoç" />
          <br /><sub><b>Onur Morkoç</b></sub></a><br />
        <span title="Reviewer">👀</span>
        <span title="Code">💻</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/oykuparlakk">
          <img src="https://avatars.githubusercontent.com/u/56317041?v=4" width="100px;" alt="Öykü Parlak" />
          <br /><sub><b>Öykü Parlak</b></sub></a><br />
        <span title="Code">💻</span>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/selmakoksal">
          <img src="https://avatars.githubusercontent.com/u/98459047?v=4" width="100px;" alt="Selma Köksal" />
          <br /><sub><b>Selma Köksal</b></sub></a><br />
        <span title="Documentation">📖</span>
      </td>
    </tr>
  </tbody>
</table>

<p align="right">(<a href="#readme-top"> back to top </a>)</p>

## Code of Conduct 🎯

To ensure a safe and respectful environment for everyone in this community, we kindly ask you to adhere to the rules in the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file.

## Contributing 👨‍💻

If you would like to contribute to the project, please read the [CONTRIBUTING.md](CONTRIBUTING.md) file. This document contains information on how you can contribute to the project, coding and debugging instructions, feedback submission guidelines and other topics.

## License ©

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license. You can find details of this license in the [LICENSE](LICENSE) file.

<p align="right">(<a href="#readme-top"> back to top </a>)</p>
