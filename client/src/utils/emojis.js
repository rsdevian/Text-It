const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇'
];

export default function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)]
}

