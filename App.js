import React, { useState, useRef, useEffect } from 'react';

// --- CONSTANTS ---
const WISH_MESSAGES = [
    "Ông bạn ơi, 19/11 này chúc mày càng ngày càng đẹp trai, thông minh và luôn tỏa sáng nhé!",
    "Happy Men's Day! Chúc cậu luôn giữ được vibe tích cực, sống chất và thành công trong mọi dự định!",
    "19/11 chúc bạn luôn là ánh sáng trong mắt ai đó, và tìm thấy hạnh phúc trong từng khoảnh khắc!",
    "Chúc mày 19/11 không chỉ đẹp trai mà còn mạnh mẽ, kiên cường trước mọi thử thách!",
    "19/11 này, chúc cậu luôn giữ được nụ cười tỏa nắng và trái tim ấm áp nhé!",
    "Gửi đến cậu - người tuyệt vời, 19/11 thật ý nghĩa và tràn ngập niềm vui!",
    "Chúc cậu có một ngày 19/11 thật đặc biệt, luôn là phiên bản tốt nhất của chính mình!",
    "Chúc bạn nam 19/11 luôn giữ được sự tự tin, bản lĩnh và trái tim ấm áp!",
    "19/11 chúc cậu sống như trend mới nhất: luôn hot, luôn viral và luôn được yêu thương!",
    "Happy Men's Day! Chúc bạn không chỉ thành công trong công việc mà còn hạnh phúc trong từng phút giây!",
    "Chúc mày 19/11 có thêm thật nhiều năng lượng để chinh phục mọi mục tiêu và ước mơ!",
    "19/11 chúc ông bạn luôn nhìn đời bằng đôi mắt tích cực và trái tim rộng mở!",
    "Ê bạn! 19/11 này đừng quên tự thưởng cho bản thân vì đã cố gắng hết mình nhé!",
    "Chúc bạn nam 19/11 luôn được bao bọc bởi tình yêu thương và sự trân trọng!",
    "Happy Men's Day! Chúc cậu không ngừng học hỏi, phát triển và trở thành phiên bản tốt nhất mỗi ngày!",
    "Chúc cậu 19/11 luôn tỏa sáng với năng lượng tích cực và sự tự tin!",
    "19/11 - Ngày để cậu thêm tự hào về bản thân, hãy cứ là chính mình và tỏa sáng!",
    "Chúc cậu luôn giữ được ngọn lửa đam mê và nhiệt huyết trong mọi việc!",
    "19/11 chúc bạn tìm thấy ý nghĩa thực sự của cuộc sống và theo đuổi đam mê với cả trái tim!",
    "Chúc mày 19/11 luôn đủ mạnh mẽ để vượt qua khó khăn, đủ kiên nhẫn để chờ đợi thành công!",
    "Happy Men's Day! Chúc cậu sống hết mình, cười thật tươi và yêu thương hết lòng!",
    "19/11 chúc ông bạn luôn tìm thấy bình yên trong tâm hồn và sức mạnh trong tinh thần!",
    "Chúc bạn nam 19/11 không chỉ thành công mà còn truyền cảm hứng cho những người xung quanh!",
    "19/11 chúc mày luôn là chính mình, bởi đó là phiên bản đặc biệt và giá trị nhất!"
];

const NAME_PROMPTS = [
    "Cho mình biết tên bạn đi!",
    "Bạn tên gì thế?",
    "Tên của bạn là gì vậy?",
    "Mình có thể biết tên bạn không?",
    "Bạn tên gì? Kể mình nghe đi!",
    "Nhanh nhanh cho mình biết tên bạn nào!",
    "Tên bạn là gì? Mình tò mò lắm rồi!",
    "Chúng mình làm quen nhé! Bạn tên gì?",
    "Cho xin tên để mình còn simp nha!"
    "Chà, đẹp trai thế này chắc tên cũng cũng! Cho xin vớiiii",
    "Đẹp trai quá! Cho xin tên để tớ còn kịp thả tim!",
    "Nụ cười tỏa nắng quá! Tên của bạn là gì vậy?",
    "Ôi visual crush rồi! Cho xin tên để còn về mơ!",
    "Thần thái đốn tim! Xin tên để còn biết ai đã đánh cắp trái tim mình!",
    "Đẹp trai không thể không xin tên! Bạn tên là gì?",
    "Uầy, đẹp trai thế! Cho tớ biết tên vớiii",
    "Cho xin tên để tớ còn simp!"
];

// DANH SÁCH AUDIO FILES
const AUDIO_FILES = [
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/03-52.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio1.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio2.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio3.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio4.mp3',
    //'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio5.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio6.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio7.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio8.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio9.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio10.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio11.mp3',
    //'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio12.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio13.mp3',
    'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio14.mp3',
    //'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio16.mp3',
    //'https://raw.githubusercontent.com/gnii9/test/main/public/audio/audio15.mp3',
];


// --- HELPER FUNCTIONS ---
const renderHighlightedMessage = (message, name) => {
    if (!name.trim() || !message) {
        return message;
    }
    const parts = message.split(new RegExp(`(${name})`, 'gi'));

    return React.createElement(React.Fragment, null,
        ...parts.map((part, index) =>
            part.toLowerCase() === name.toLowerCase() ?
                React.createElement('span', { 
                    key: index, 
                    className: "text-pink-400 font-extrabold" 
                }, part) :
                part
        )
    );
};

const generateRandomHearts = () => {
    const newHearts = [];
    const colors = ['#a78bfa', '#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#f87171'];
    const count = 5;

    for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotation = Math.random() * 60 - 30;
        const opacity = Math.random() * 0.3 + 0.7;

        const side = i % 4;
        let top, left, right, bottom;

        const randomPos = `${Math.random() * 80 + 10}%`;
        const randomOffset = `-${Math.random() * 2 + 1.5}rem`;

        switch (side) {
            case 0:
                top = randomOffset;
                left = randomPos;
                break;
            case 1:
                top = randomPos;
                right = randomOffset;
                break;
            case 2:
                bottom = randomOffset;
                left = randomPos;
                break;
            case 3:
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

const HeartIcon = ({ style }) => {
    return React.createElement('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        style: style,
        'aria-hidden': "true"
    }, 
        React.createElement('path', { 
            d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
        })
    );
};

// Hàm xáo trộn mảng (Fisher-Yates shuffle)
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const App = () => {
    const [step, setStep] = useState('welcome');
    const [name, setName] = useState('');
    const [namePrompt, setNamePrompt] = useState('');
    const [message, setMessage] = useState('');
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [hearts, setHearts] = useState([]);
    const [currentAudio, setCurrentAudio] = useState('');
    const [audioKey, setAudioKey] = useState(0);
    
    // THÊM STATE MỚI ĐỂ QUẢN LÝ VÒNG LẶP AUDIO
    const [currentRound, setCurrentRound] = useState([]);
    const [usedAudios, setUsedAudios] = useState(new Set());

    // KHỞI TẠO VÒNG MỚI KHI CẦN
    const initializeNewRound = () => {
        const shuffled = shuffleArray([...AUDIO_FILES]);
        setCurrentRound(shuffled);
        setUsedAudios(new Set());
        return shuffled;
    };

    // LẤY AUDIO TIẾP THEO TRONG VÒNG
    const getNextAudio = () => {
        let round = [...currentRound];
        
        // Nếu vòng hiện tại đã hết hoặc chưa có, khởi tạo vòng mới
        if (round.length === 0 || usedAudios.size >= round.length) {
            round = initializeNewRound();
        }
        
        // Tìm audio chưa được sử dụng trong vòng hiện tại
        const availableAudios = round.filter(audio => !usedAudios.has(audio));
        
        if (availableAudios.length === 0) {
            // Nếu không còn audio nào (trường hợp bất khả thi), khởi tạo lại
            round = initializeNewRound();
            return round[0];
        }
        
        // Chọn audio ngẫu nhiên từ những audio chưa dùng
        const randomIndex = Math.floor(Math.random() * availableAudios.length);
        const selectedAudio = availableAudios[randomIndex];
        
        // Đánh dấu audio đã sử dụng
        setUsedAudios(prev => new Set([...prev, selectedAudio]));
        
        return selectedAudio;
    };

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

        const personalizedMessage = originalMessage.replace(/mày|cậu|ông bạn|bạn nam|đứa bạn|bạn/gi, name);
        setMessage(personalizedMessage);

        // CHỌN AUDIO THEO CƠ CHẾ VÒNG LẶP KHÔNG LẶP
        const selectedAudio = getNextAudio();
        setCurrentAudio(selectedAudio);
        setAudioKey(prev => prev + 1);

        setStep('card');

        setTimeout(() => {
            setIsCardVisible(true);
        }, 100);
    };

    const handleBack = () => {
        setIsCardVisible(false);
        setCurrentAudio('');

        setTimeout(() => {
            setStep('welcome');
            setName('');
        }, 700);
    };

    // Tạo audio element với key duy nhất mỗi lần thay đổi
    const audioElement = currentAudio ? 
        React.createElement('audio', {
            key: `audio-${audioKey}`,
            controls: true,
            src: currentAudio,
            preload: 'auto',
            className: "w-full max-w-sm rounded-full",
            'aria-label': "Audio wish",
            autoPlay: false
        }, "Trình duyệt của bạn không hỗ trợ phát âm thanh.") : null;

    return React.createElement('main', { 
        className: "flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#100f1c] via-[#1a0b2e] to-black p-4 overflow-hidden" 
    },
        step === 'welcome' && React.createElement('div', { 
            className: "transition-opacity duration-500" 
        },
            React.createElement('button', {
                onClick: handleWelcomeClick,
                className: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-12 py-5 text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 shadow-lg shadow-purple-500/10",
                'aria-label': "Start generating a wish"
            }, "Bắt đầu")
        ),

        step === 'name' && React.createElement('div', { 
            className: "flex flex-col items-center gap-8 w-full max-w-lg text-center animate-fade-in" 
        },
            React.createElement('h2', { 
                className: "text-3xl md:text-4xl font-bold text-gray-100 tracking-tight" 
            }, namePrompt),
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
                autoFocus: true
            }),
            React.createElement('button', {
                onClick: handleCreateWish,
                disabled: !name.trim(),
                className: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-12 py-5 text-2xl font-bold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 shadow-lg shadow-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                'aria-label': "Create wish"
            }, "bấm vào tim tớ này!")
        ),

        step === 'card' && React.createElement('div', {
            className: `relative bg-black/40 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl shadow-purple-500/20 text-center max-w-lg w-full transition-all duration-700 ease-in-out transform ${isCardVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 -rotate-3 translate-y-8'}`,
            'aria-live': "polite"
        },
            ...hearts.map(heart =>
                React.createElement(HeartIcon, {
                    key: heart.id,
                    style: heart.style
                })
            ),
            React.createElement('div', { 
                className: "flex flex-col items-center gap-6" 
            },
                React.createElement('h1', { 
                    className: "text-3xl md:text-4xl font-bold text-gray-100 tracking-tight" 
                }, renderHighlightedMessage(message, name)),
                
                // SỬ DỤNG AUDIO ELEMENT ĐÃ TẠO
                audioElement,
                
                React.createElement('button', {
                    onClick: handleBack,
                    className: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-8 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 shadow-md shadow-purple-500/10",
                    'aria-label': "Go back to generate a new wish"
                }, "Quay lại")
            )
        )
    );
};

export default App;
