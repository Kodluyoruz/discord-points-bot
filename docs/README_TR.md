 <a name="readme-top"></a>

# Kodluyoruz Discord Puan Botu

![banner](../docs/images/BANNER.png)

---

<div align= center>
<a href = "../README.md">
<img height=60 src="../docs/images/english.png">
</a>
</div>

---

## Proje Hakkında 📜

Kodluyoruz ekibi ve Kodluyoruz Açık Kaynak gönüllüleri tarafından hazırlanmış Discord puan botu, Discord sunucularında kullanılmak üzere özelleştirilebilir, kullanıcı dostu ve otomatik bir puanlama sistemi oluşturmaktır. Bu puanlama sistemi, sunucuda bulunan üyelerin etkinliklerdeki katılımlarını izlemek, aktif üyeleri ödüllendirmek ve topluluk deneyimini geliştirmeye yardımcı olan bir araçtır. Sunucu yöneticilerinin bu işlemlerdeki süreçlerini kolaylaştırmaya destek olacaktır.

## İçerik Tablosu 📑

- [Proje Hakkında 📜](#proje-hakkında-)
- [Başlarken 📌](#başlarken-)
  - [Gereksinimler](#gereksinimler)
  - [Kurulum](#kurulum)
  - [Versiyonlar](#versiyonlar)
- [Görseller 📷](#görseller-)
- [Özellikler 🖥️](#özellikler-️)
  - [Kullanıcı](#kullanıcı)
  - [Moderasyon](#moderasyon)
- [Katkı Sağlayanlar 👩‍💻](#katkı-sağlayanlar-)
- [Davranış Kuralları 🎯](#davranış-kuralları-)
- [Katkıda Bulunma 👨‍💻](#katkıda-bulunma-)
- [Lisans ©](#lisans-)

<p align="right">(<a href="#readme-top"> yukarı çık </a>)</p>

## Başlarken 📌

### Gereksinimler

[Discord.js](https://discord.js.org/#/) v14.13.0 için [TypeScript](https://www.typescriptlang.org/) v5.2.2, [Node.js](https://nodejs.org/en/download) v16.11.0 veya daha yeni bir sürümü gereklidir.

Projenin verilerinin kaydedilmesi için [MongoDB](https://www.mongodb.com/) veritabanını ihtiyaç duyar. Botun çalışması için [Discord Developer Portal](https://discord.com/developers/applications) üzerinden bir bot oluşturulmalıdır. Discord botu oluşturma ile alakalı detaylı bilgi için [Discord Bot Uygulaması Talimatları](../docs/BotRegistration_TR.md) dökümanına göz atabilirsiniz.

### Kurulum

Projenin kullanımı ve çalıştırılması hakkında daha fazla bilgi için aşağıdaki yazıyı okuyabilirsiniz.

Node.js'in LTS sürümü veya daha yüksek bir sürümünün yüklü olduğundan emin olun. Node.js yüklü değilse, aşağıdaki web sitesini ziyaret ederek indirin ve kurun: <https://nodejs.org/en/>

MongoDB'nin yüklü olduğundan emin olun. MongoDB yüklü değilse, aşağıdaki web sitesini ziyaret ederek indirin ve kurun: <https://www.mongodb.com/>

Dilerseniz mevcut bir MongoDB veritabanı kullanabilirsiniz. MongoDB veritabanı oluşturmak için [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) kullanabilirsiniz.

Bu projeyi klonlayın veya proje sayfasından "Code" butonu altındaki "Download ZIP" butonuna tıklayarak projeyi cihazınıza indirin ve zip dosyasının içeriğini çalışma dizininize aktarın. Klonlamak için aşağıdaki komutu kullanın:

```bash
git clone https://github.com/Kodluyoruz/discord-points-bot
```

Konsola `yarn install` veya `npm install` yazarak gerekli bağımlılıkları yükleyin.

`.env` dosyası oluşturun ve `BOT_TOKEN` adında bir değişken oluşturarak botunuzun token'ını atayın. Token'ınızı Discord Developer Portal'dan alabilirsiniz. MongoDB veritabanı için, `DBACCESS` adında bir değişken oluşturarak MongoDB bağlantı cümlesini atayın. Ayar dosyanızı aşağıdaki gibi oluşturabilirsiniz:

```sh
BOT_TOKEN=discord-bot-tokeninizi-buraya-yazin
DBACCESS=mongodb+srv://kullanici-adi:sifre@example.com/tablo-adi
```

Botunuzu çalıştırmak için konsolda `yarn start` ya da `npm start` komutunu yazın.

### Versiyonlar

| Teknoloji  | Versiyonlar |
| ---------- | ----------- |
| discord.js | v14.13.0    |
| i18next    | v23.5.1     |
| Mongoose   | v7.5.1      |
| Winston    | v3.10.0     |

<p align="right">(<a href="#readme-top"> yukarı çık </a>)</p>

## Görseller 📷

![image1](../docs/images/image1.png)
![image2](../docs/images/image2.png)

<p align="right">(<a href="#readme-top"> yukarı çık </a>)</p>

## Özellikler 🖥️

### Kullanıcı

- ⚡ **Bot Rehberi** - Nasıl puan kazanacağına dair özel ayarlanmış rehber ile sistem hakkında bilgi sahibi olunabilir.
- ⚡ **Kolayca Katılabilme** - Puan sistemine kolayca dahil olup, puan kazanmaya hızlıca başlanabilir.
- ⚡ **Puan Kazanma** - Mesaj atma, arkadaş davet etme, sesli kanalda bulunma gibi pek çok farklı eylem ile puan kazanabilirsiniz.
- ⚡ **Puan Durumu** - Özel tasarlanmış UI sayesinde kullanıcı anlık puan durumuna ve sıralamasına kolayca ulaşabilir.
- ⚡ **Kullanıcı Etkinliği** - Kullanıcı istatistik kartı ile kişisel olarak sunucudaki etkinlik takip edilebilir, sunucu rankı, mesaj istatistiği ve ses aktivitesine ulaşılabilir.
- ⚡ **Dinamik Bildirimler** - Dinamik bildirimler sayesinde puan durumunuzla alakalı bilgilendirmeleri kolayca takip edebilir, puan aktivitenizden haberdar olabilirsiniz.
- ...

### Moderasyon

- ⚡ **Kolay Kurulum** - Bot sunucuya dahil edildikten sonra yönergeler takip edilerek kolay ve hızlı kurulum gerçekleştirilebilir.
- ⚡ **Dinamik Yapı** - Standart puan türü olarak sesli, mesaj, davet ile puan kazanmanın dışında moderatör tarafından özelleştirilebilir.
- ⚡ **Dil Desteği** - Mevcut diller arasında Türkçe ve İngilizce ile çoklu dil desteği sağlanabilir.
- ⚡ **Puan Yönetimi** - Kötüye kullanım durumunda moderatör tarafından kullanıcının puanına müdahale edilebilir.
- ⚡ **Periyot Yönetimi** - Moderatör tarafından sıralama farklı periyotlar halinde listelenebilir.
- ...

<p align="right">(<a href="#readme-top"> yukarı çık </a>)</p>

## Katkı Sağlayanlar 👩‍💻

Katkıda bulunduğunuz için teşekkür ederiz. Katkıda bulunan herkesi takdir ediyoruz.

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
        <span title="Reviewer">👀</span>
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

<p align="right">(<a href="#readme-top"> yukarı çık </a>)</p>

## Davranış Kuralları 🎯

Bu toplulukta herkes için güvenli ve saygılı bir ortam sağlamak için [CODE_OF_CONDUCT.md](../docs/CODE_OF_CONDUCT_TR.md) dosyasındaki kurallara uymanızı rica ederiz.

## Katkıda Bulunma 👨‍💻

Projeye katkıda bulunmak istiyorsanız, lütfen [CONTRIBUTING.md](../docs/CONTRIBUTING_TR.md) dosyasını okuyun. Bu dosyada, projeye nasıl katkıda bulunabileceğiniz, kod yazma ve hata ayıklama talimatları, geri bildirim gönderme yönergeleri ve diğer konular yer alır.

## Lisans ©

Bu proje [MIT](https://choosealicense.com/licenses/mit/) lisansı altında lisanslanmıştır. Bu lisansın detayları için [LICENSE](LICENSE) dosyasına bakabilirsiniz.

<p align="right">(<a href="#readme-top"> yukarı çık </a>)</p>
