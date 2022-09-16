const {
    REST,
    Client,
    GatewayIntentBits,
    Partials, EmbedBuilder,
    BaseChannel,
    ApplicationCommandOptionType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js'),
    client = new Client({
        partials: [Partials.Channel],
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent
        ]
    }),
    dotenv = require('dotenv'),
    dotenvreq = dotenv.config();
//設定

client.on("ready", () => {
    client.user.setPresence({
        activities: [{
            name: "テスト"
        }],
        status: "dnd"
    }); //ここまでステータス設定
    client.application.commands.set([
        {
            name: "button",
            description: "テストボタン"
        }
    ], "926965020724691005"); //ここまでコマンドセット(ギルドcmdを設定する際、「], "チャンネルID"」という形にする。)
    console.log("準備ok"); //じゅんびおっけい！
});

client.on("interactionCreate", interaction => {
    if (interaction.isChatInputCommand()) { //スラッシュコマンドからなら...
        var commandname = interaction.commandName; //コマンド名

        if (commandname == "button") { //コマンド名がbuttonなら
            const button1 = new ActionRowBuilder() //このビルダーはわからん
                .addComponents(
                    new ButtonBuilder() //ボタン作成
                        .setCustomId("test1") //ボタンの識別用(id)
                        .setLabel("ボタン") //ボタンに付く文字列
                        .setStyle(ButtonStyle.Primary) //ボタンの色や種類が変えられる
                );
            const embeds1 = new EmbedBuilder() //埋め込み作成
                .setColor(0x0099FF) //色設定
                .setTitle("テスト中") //一番上のタイトル
                .setDescription("かずなみが作った謎ゲーえ"); //説明
            interaction.reply({ //返信
                content: "これを授ける。", embeds: [embeds1], components: [button1] //contentにメッセージ内容
            });
        } else if (commandname == "game") {
            const button1 = new ActionRowBuilder() //このビルダーはわからん
                .addComponents(
                    new ButtonBuilder() //ボタン作成
                        .setLabel("開く") //ボタンに付く文字列
                        .setStyle(ButtonStyle.Link) //ボタンの色や種類が変えられる
                        .setURL("")
                );
            const embeds1 = new EmbedBuilder() //埋め込み作成
                .setColor(0x0099FF) //色設定
                .setTitle("テスト中") //一番上のタイトル
                .setDescription("テストしています。"); //説明
            interaction.reply({ //返信
                content: "テスト送信", embeds: [embeds1], components: [button1] //contentにメッセージ内容
            });
        }
    } else if (interaction.isButton()) { //ボタンからなら....
        var buttonid = interaction.customId; //ボタンID

        if (buttonid == "test1") { //ボタンIDがtest1なら...
            interaction.reply({content: "ボタンしっかり動いてるじゃん！"});
        };
    };
});
client.login(process.env.KAZUNAMI_BOT_TOKEN); //ろぐいんだ