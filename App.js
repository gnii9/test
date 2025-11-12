import React, { useState } from 'react';

// --- CONSTANTS ---
const WISH_MESSAGES = [
    "Chúc ông bạn 19/11 đẹp trai không cần chỉnh, thông minh không cần hỏi!",
    "Happy Men’s Day! Chúc mày luôn là phiên bản xịn nhất của chính mình!",
    "19/11 chúc mày sống chất như Gen Z, chill như TikTok, ngầu như Instagram!",
    "Chúc mày 19/11 không drama, không deadline, chỉ có vibe tốt và niềm vui!",
    "Chúc bạn nam 19/11 luôn là “crush quốc dân” trong lòng ai đó!",
    "19/11 chúc mày đẹp trai như idol, học giỏi như AI, sống chill như streamer!",
    "Chúc mày 19/11 không bị gọi lên bảng, chỉ bị gọi là “soái ca lớp học”!",
    "Happy Men’s Day! Chúc mày luôn giữ được phong độ và thần thái như chủ tịch!",
    "Chúc mày 19/11 có tâm trạng như thứ 7, năng lượng như cà phê sữa đá!",
    "19/11 chúc mày không “toang”, không “phèn”, chỉ có “xịn xò” và “đỉnh kout”!",
    "Chúc mày 19/11 được thầy cô khen, bạn bè nể, crush mê!",
    "19/11 chúc mày học không lag, não không đơ, tâm trạng không lỗi!",
    "Chúc mày 19/11 chill như nhạc Lo-fi, sống như vibe của hoàng tử Gen Z!",
    "Happy Men’s Day! Chúc mày luôn là “best boy” trong lòng hội bạn thân!",
    "19/11 chúc mày sống như meme: vui vẻ, viral và không bao giờ lỗi thời!",
    "Chúc mày 19/11 không homework, không stress, chỉ có chill và chill!",
    "19/11 chúc mày học như thần, thi như mơ, sống như chill!",
    "19/11 chúc mày không bị thầy cô “bắt bài”, chỉ bị crush “bắt tim”!",
    "Happy Men’s Day! Chúc mày luôn là “main character” trong cuộc đời mình!",
    "19/11 chúc mày sống như trend: luôn hot, luôn chất, luôn được săn đón!"
];

const NAME_PROMPTS = [
    "Visual đỉnh quá trời, cho mình xin cái tên để còn lưu vào tim!",
    "Đẹp trai thế này chắc tên cũng xịn lắm, cho mình biết với nha!",
    "Góc xin tên trai đẹp: bạn không cho là mình mất ngủ đó!",
    "Thần thái như idol vậy á, cho mình xin tên để còn follow!",
    "Bạn ơi, đẹp trai vậy mà chưa biết tên thì tiếc quá!",
    "Cho mình xin tên để còn biết đường mà crush đúng người!",
    "Nhìn bạn là thấy gu mình rồi đó, cho xin cái tên đi nè!",
    "Đẹp trai như này mà không biết tên thì uổng công ngắm mất!",
    "Tên bạn là gì để mình còn lưu vào danh bạ “chồng tương lai”?",
    "Bạn đẹp trai quá, cho mình xin tên để còn mơ tiếp!"
];

// --- HELPER FUNCTIONS ---

// ĐÃ CHUYỂN ĐỔI: Sử dụng React.createElement thay vì JSX
const renderHighlightedMessage = (message, name) => {
    if (!name.trim() || !message) {
        return message;
    }
    const parts = message.split(new RegExp(`(${name})`, 'gi'));

    return React.createElement(React.Fragment, null,
        parts.map((part, index) =>
            part.toLowerCase() === name.toLowerCase() ?
                React.createElement('span', { key: index, className: "text-pink-400 font-extrabold" },
                    part
                ) :
                part
        )
    );
};

const generateRandomHearts = () => {
    const newHearts = [];
    const colors = ['#a78bfa', '#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#f87171'];
    const count = 5;

    for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 2; // size between 2 and 4 rem
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotation = Math.random() * 60 - 30; // rotation between -30 and 30 deg
        const opacity = Math.random() * 0.3 + 0.7; // opacity between 0.7 and 1.0

        const side = i % 4; // 0: top, 1: right, 2: bottom, 3: left
        let top, left, right, bottom;

        const randomPos = `${Math.random() * 80 + 10}%`; // 10% to 90%
        const randomOffset = `-${Math.random() * 2 + 1.5}rem`; // -1.5rem to -3.5rem

        switch (side) {
            case 0: // Top edge
                top = randomOffset;
                left = randomPos;
                break;
            case 1: // Right edge
                top = randomPos;
                right = randomOffset;
                break;
            case 2: // Bottom edge
                bottom = randomOffset;
                left = randomPos;
                break;
            case 3: // Left edge
                top = randomPos;
                left = randomOffset;
                break;
            default:
                break;
        }

        newHearts.push({
            id: i,
            style: {
                width: `${size}rem`,
                height: `${size}rem`,
                color: color,
                opacity: opacity,
                transform: `rotate(${rotation}deg)`,
                position: 'absolute',
                top,
                left,
                right,
                bottom,
                transition: 'all 0.3s ease-in-out',
            },
        });
    }
    return newHearts;
};

// --- COMPONENTS ---

// ĐÃ CHUYỂN ĐỔI: Sử dụng React.createElement thay vì JSX
const HeartIcon = ({ style }) => (
    React.createElement('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        style: style,
        'aria-hidden': "true" // Thuộc tính 'aria-hidden' được chuyển thành chuỗi
    },
        React.createElement('path', { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })
    )
);

const App = () => {
    const [step, setStep] = useState('welcome');
    const [name, setName] = useState('');
    const [namePrompt, setNamePrompt] = useState('');
    const [message, setMessage] = useState('');
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [hearts, setHearts] = useState([]);

    const handleWelcomeClick = () => {
        const randomIndex = Math.floor(Math.random() * NAME_PROMPTS.length);
        setNamePrompt(NAME_PROMPTS[randomIndex]);
        setStep('name');
    };

    const handleCreateWish = () => {
        if (!name.trim()) return;

        setHearts(generateRandomHearts());

        const randomIndex = Math.floor(Math.random() * WISH_MESSAGES.length);
        const originalMessage = WISH_MESSAGES[randomIndex];

        const personalizedMessage = originalMessage.replace(/mày|ông bạn|bạn nam|đứa bạn/gi, name);
        setMessage(personalizedMessage);

        setStep('card');

        setTimeout(() => {
            setIsCardVisible(true);
        }, 100);
    };

    const handleBack = () => {
        setIsCardVisible(false);

        setTimeout(() => {
            setStep('welcome');
            setName('');
        }, 700);
    };

    // ĐÃ CHUYỂN ĐỔI: Toàn bộ phần return đã được chuyển sang React.createElement
    return React.createElement('main', { className: "flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#100f1c] via-[#1a0b2e] to-black p-4 overflow-hidden" },
        step === 'welcome' && React.createElement('div', { className: "transition-opacity duration-500" },
            React.createElement('button', {
                onClick: handleWelcomeClick,
                className: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-12 py-5 text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 shadow-lg shadow-purple-500/10",
                'aria-label': "Start generating a wish"
            },
                "Bắt đầu"
            )
        ),

        step === 'name' && React.createElement('div', { className: "flex flex-col items-center gap-8 w-full max-w-lg text-center animate-fade-in" },
            React.createElement('h2', { className: "text-3xl md:text-4xl font-bold text-gray-100 tracking-tight" },
                namePrompt
            ),
            React.createElement('input', {
                type: "text",
                value: name,
                onChange: (e) => setName(e.target.value),
                onKeyPress: (e) => {
                    if (e.key === 'Enter' && name.trim()) {
                        handleCreateWish();
                    }
                },
                placeholder: "Nhập tên ở đây...",
                className: "bg-white/5 backdrop-blur-lg border border-white/20 rounded-full px-8 py-4 text-xl text-white text-center w-full max-w-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300",
                'aria-label': "Name input",
                autoFocus: true // Thuộc tính boolean được giữ nguyên
            }),
            React.createElement('button', {
                onClick: handleCreateWish,
                disabled: !name.trim(),
                className: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-12 py-5 text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 shadow-lg shadow-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                'aria-label': "Create wish"
            },
                "bấm vào tim tớ này!"
            )
        ),

        step === 'card' && React.createElement('div', {
            className: `relative bg-black/40 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl shadow-purple-500/20 text-center max-w-lg w-full transition-all duration-700 ease-in-out transform ${isCardVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 -rotate-3 translate-y-8'
                }`,
            'aria-live': "polite"
        },
            hearts.map(heart =>
                React.createElement(HeartIcon, {
                    key: heart.id,
                    style: heart.style
                })
            ),
            React.createElement('div', { className: "flex flex-col items-center gap-6" },
                React.createElement('h1', { className: "text-3xl md:text-4xl font-bold text-gray-100 tracking-tight" },
                    renderHighlightedMessage(message, name)
                ),
                React.createElement('audio', {
                    controls: true,
                    src: import.meta.env.BASE_URL + '03-52.mp3',
                    className: "w-full max-w-sm rounded-full",
                    'aria-label': "Audio wish"
                },
                    "Trình duyệt của bạn không hỗ trợ phát âm thanh."
                ),
                React.createElement('button', {
                    onClick: handleBack,
                    className: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-8 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 shadow-md shadow-purple-500/10",
                    'aria-label': "Go back to generate a new wish"
                },
                    "Quay lại"
                )
            )
        )
    );
};

export default App;
