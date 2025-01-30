const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

// Gera o QR Code para autenticação
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Confirmação de conexão
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

// Função para criar delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// Função para enviar áudio do Cloudinary simulando gravação na hora
async function sendAudio(client, chatId, audioUrl, duration) {
    const audio = await MessageMedia.fromUrl(audioUrl);
    await client.sendMessage(chatId, audio, { sendAudioAsVoice: true });
    await delay(duration * 1000); // Delay igual ao tempo do áudio
}

// Função para enviar imagem do Cloudinary
async function sendImage(client, chatId, imageUrl, caption) {
    const image = await MessageMedia.fromUrl(imageUrl);
    await client.sendMessage(chatId, image, { caption });
    await delay(7000); // Delay de 7 segundos
}

// Função para enviar vídeo do Cloudinary
async function sendVideo(client, chatId, videoUrl, caption) {
    const video = await MessageMedia.fromUrl(videoUrl);
    await client.sendMessage(chatId, video, { caption });
    await delay(7000); // Delay de 7 segundos
}

// Fluxo de Conversa
client.on('message', async msg => {
    const userInput = msg.body.toLowerCase();

    if (userInput.includes('escova alisadora')) {
        const chatId = msg.from;

        await client.sendMessage(chatId, ' Oi, tudo bem? Sou o Rafael e tenho uma novidade incrível para você! Vou te mostrar como nossa escova alisadora pode transformar sua rotina e deixar seu cabelo lindo em minutos. Vamos lá? 😍 ');
        await delay(7000);

        await sendAudio(client, chatId, 'https://res.cloudinary.com/dybnngg2g/video/upload/v1738239130/Audio-Wahts_01_ffk3bt.mp3', 21);
        await sendAudio(client, chatId, 'https://res.cloudinary.com/dybnngg2g/video/upload/v1738239130/Audio-Wahts_02_rkhn2c.mp3', 26);
        await sendAudio(client, chatId, 'https://res.cloudinary.com/dybnngg2g/video/upload/v1738239130/Audio-Wahts_03_yoyanq.mp3', 25);

        await sendImage(client, chatId, 'https://res.cloudinary.com/dybnngg2g/image/upload/v1738240109/antes_e_depois_whats_ve9ooq.png', 'Olha o resultado incrível que a Juliana acabou de me mandar! 😍 Quem não quer um cabelo assim, liso e brilhoso em minutos? ✨');
        await sendVideo(client, chatId, 'https://res.cloudinary.com/dybnngg2g/video/upload/v1738239168/cabelo_2_bdouu1.mp4', 'Perfita para TODOS os tipos de cabelos! Pode usar no cabelo seco ou úmido. Aquece rapidinho, protege os fios e ainda tem tecnologia anti-frizz profissional. 😍 Quem não quer?');

        await client.sendMessage(chatId, 'Quer saber os valores e garantir a sua agora? Ou tem alguma dúvida? Só me falar!');
        await delay(7000);
    }

    if (userInput.includes('pode me mandar o preço')) {
        const chatId = msg.from;

        await sendImage(client, chatId, 'https://res.cloudinary.com/dybnngg2g/image/upload/v1738239168/R_139_Whats_zikpyq.png', 'Facilidade total! 🛍️✅ Você agenda agora e recebe no dia que quiser.✅ Só paga na entrega: dinheiro, Pix, débito ou crédito em até 12x. Gostou? Me fala e já garanto a sua!');
        await client.sendMessage(chatId, 'Vamos garantir a sua? 😊Me manda rapidinho:📍 Seu nome completo🏠 Endereço para entrega (rua, número, cidade, estado, CEP)Posso agendar a entrega para amanhã? 🚀');
    }

    if (userInput.includes('moro em')) {
        await client.sendMessage(msg.from, 'Perfeito! Seu pedido já está sendo processado. Em breve entraremos em contato para confirmação do envio. Obrigado pela compra!');
    }
});

// Inicializa o bot
client.initialize();
