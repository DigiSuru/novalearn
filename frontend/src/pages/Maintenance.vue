<template>
  <div class="maintenance-bg h-screen w-full flex items-center justify-center p-4">

    <!-- Main Content Container with CRT Flicker -->
    <div class="crt-flicker w-full max-w-4xl border-l-4 border-r-4 border-cyan-400 p-8 md:p-12 bg-black/60 backdrop-blur-sm relative z-10 mx-auto">
        
        <!-- Top decorative elements -->
        <div class="absolute top-0 left-0 w-full flex justify-between p-2 text-xs text-cyan-400 opacity-70">
            <span>SYS_STAT: OFFLINE</span>
            <span>ERR_CODE: 404_MAINT</span>
            <span class="animate-pulse text-pink-500">REC: ACTIVE</span>
        </div>
        <div class="absolute top-0 right-0 w-12 h-1 bg-cyan-400"></div>
        <div class="absolute bottom-0 left-0 w-12 h-1 bg-pink-500"></div>

        <!-- Terminal Output Area -->
        <div class="mb-8 font-mono text-sm md:text-base text-gray-400" id="terminal-output">
            <p>> INITIATING SYSTEM DIAGNOSTIC...</p>
            <p>> CRITICAL CORE UPDATE IN PROGRESS.</p>
            <p>> ESTIMATED TIME TO COMPLETION: <span class="text-yellow-400">UNKNOWN</span></p>
            <p v-for="(msg, index) in terminalMessages" :key="index" class="text-green-500 opacity-80">{{ msg }}</p>
        </div>

        <!-- Glitch Header -->
        <div class="glitch-wrapper mb-6 flex justify-center text-center">
            <h1 class="glitch text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter" data-text="SYSTEM OFFLINE">SYSTEM OFFLINE</h1>
        </div>
        
        <div class="text-center mb-10">
            <p class="text-xl md:text-2xl text-cyan-200 mb-2 glow-text">NEURAL NETWORK UNDERGOING MAINTENANCE</p>
            <p class="text-gray-400 max-w-2xl mx-auto">Please stand by while we upgrade the mainframe. Normal operations will resume shortly. We apologize for the interruption to your data stream.</p>
        </div>

        <!-- Admin Contact Section styled as a cyberpunk panel -->
        <div class="border border-pink-500/50 bg-pink-900/10 p-6 relative mx-auto max-w-md">
            <!-- Panel decorative corners -->
            <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-pink-500"></div>
            <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-pink-500"></div>
            <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-pink-500"></div>
            <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-pink-500"></div>

            <h2 class="text-pink-500 text-sm tracking-widest mb-4 font-bold border-b border-pink-500/30 pb-2 flex items-center justify-between">
                <span>// ADMIN_CONTACT_SECURE_LINE</span>
                <span class="w-2 h-2 bg-pink-500 rounded-full animate-ping"></span>
            </h2>
            
            <div class="space-y-4">
                <!-- Website Contact -->
                <div class="flex items-start">
                    <span class="text-cyan-400 mr-3 mt-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                    </span>
                    <div>
                        <div class="text-xs text-gray-500 mb-1">PORTAL:</div>
                        <a href="https://skmeghwal.in" class="text-white hover:text-cyan-300 transition-colors text-lg tracking-wide hover:underline decoration-cyan-400 decoration-2 underline-offset-4">skmeghwal.in</a>
                    </div>
                </div>

                <!-- Phone Contact -->
                <div class="flex items-start">
                    <span class="text-yellow-400 mr-3 mt-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </span>
                    <div>
                        <div class="text-xs text-gray-500 mb-1">VOICE_COMM:</div>
                        <a href="tel:9252145887" class="text-white hover:text-yellow-300 transition-colors text-lg tracking-wide">9252145887</a>
                    </div>
                </div>
            </div>
            
            <div class="mt-6 flex justify-end">
                <button @click="copyAdminInfo" class="cyber-button text-xs py-1 px-3 border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black">
                    COPY_DATA
                </button>
            </div>
        </div>

        <!-- Bottom terminal input line -->
        <div class="mt-8 pt-4 border-t border-gray-800 flex items-center text-cyan-400">
            <span class="mr-2">user@sys:~$</span>
            <span class="cursor-blink w-2 h-4 bg-cyan-400 inline-block"></span>
        </div>

    </div>

    <!-- Notification Toast (Hidden by default) -->
    <div :class="['fixed bottom-5 right-5 bg-cyan-900 border border-cyan-400 text-cyan-100 px-4 py-3 shadow-[0_0_15px_rgba(0,255,255,0.5)] transform transition-all duration-300 z-50 flex items-center', toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0']">
        <svg class="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Data copied to clipboard matrix.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const toastVisible = ref(false);
const terminalMessages = ref([]);

let terminalInterval = null;

const messages = [
    "> RE-ROUTING POWER TO MAIN THRUSTERS...",
    "> BYPASSING SECURITY PROTOCOL ALPHA...",
    "> ENCRYPTING DATA STREAMS...",
    "> ESTABLISHING SECURE HANDSHAKE..."
];

onMounted(() => {
    let messageIndex = 0;
    terminalInterval = setInterval(() => {
        if (messageIndex < messages.length) {
            terminalMessages.value.push(messages[messageIndex]);
            messageIndex++;
        } else {
            clearInterval(terminalInterval);
        }
    }, 4000);
});

onUnmounted(() => {
    if (terminalInterval) clearInterval(terminalInterval);
});

const copyAdminInfo = () => {
    const info = "Admin: skmeghwal.in\nContact: 9252145887";
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(info).then(() => {
            showToast();
        }).catch(err => {
            fallbackCopyTextToClipboard(info);
        });
    } else {
        fallbackCopyTextToClipboard(info);
    }
};

const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) showToast();
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
};

const showToast = () => {
    toastVisible.value = true;
    setTimeout(() => {
        toastVisible.value = false;
    }, 3000);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.maintenance-bg {
    --cyber-pink: #ff00ff;
    --cyber-blue: #00ffff;
    --cyber-yellow: #ffff00;
    --bg-color: #050510;
    
    background-color: var(--bg-color);
    color: #fff;
    font-family: 'Space Mono', monospace;
    overflow: hidden;
    /* Cyberpunk grid background */
    background-image: 
        linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 30px 30px;
    background-position: center center;
    /* Scanline overlay */
    box-shadow: inset 0 0 100px rgba(0,0,0,0.9);
}

/* Scanline effect */
.maintenance-bg::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 2;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
}

/* Glitch Text Effect */
.glitch-wrapper {
    position: relative;
}

.glitch {
    position: relative;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    /* Text shadow for base glow */
    text-shadow: 0 0 5px rgba(255,255,255,0.5);
}

.glitch::before,
.glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
}

/* Red/Pink glitch shift */
.glitch::before {
    left: 2px;
    text-shadow: -2px 0 var(--cyber-pink);
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
}

/* Blue/Cyan glitch shift */
.glitch::after {
    left: -2px;
    text-shadow: -2px 0 var(--cyber-blue), 2px 2px var(--cyber-pink);
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim2 5s infinite linear alternate-reverse;
}

/* Keyframes for glitch animation 1 */
@keyframes glitch-anim {
    0% { clip: rect(72px, 9999px, 83px, 0); }
    5% { clip: rect(61px, 9999px, 5px, 0); }
    10% { clip: rect(15px, 9999px, 98px, 0); }
    15% { clip: rect(44px, 9999px, 20px, 0); }
    20% { clip: rect(32px, 9999px, 95px, 0); }
    25% { clip: rect(89px, 9999px, 12px, 0); }
    30% { clip: rect(51px, 9999px, 100px, 0); }
    35% { clip: rect(10px, 9999px, 35px, 0); }
    40% { clip: rect(93px, 9999px, 55px, 0); }
    45% { clip: rect(27px, 9999px, 76px, 0); }
    50% { clip: rect(66px, 9999px, 18px, 0); }
    55% { clip: rect(81px, 9999px, 42px, 0); }
    60% { clip: rect(3px, 9999px, 88px, 0); }
    65% { clip: rect(58px, 9999px, 25px, 0); }
    70% { clip: rect(12px, 9999px, 90px, 0); }
    75% { clip: rect(49px, 9999px, 62px, 0); }
    80% { clip: rect(85px, 9999px, 11px, 0); }
    85% { clip: rect(38px, 9999px, 77px, 0); }
    90% { clip: rect(96px, 9999px, 31px, 0); }
    95% { clip: rect(22px, 9999px, 84px, 0); }
    100% { clip: rect(70px, 9999px, 48px, 0); }
}

/* Keyframes for glitch animation 2 */
@keyframes glitch-anim2 {
    0% { clip: rect(25px, 9999px, 99px, 0); }
    5% { clip: rect(86px, 9999px, 14px, 0); }
    10% { clip: rect(41px, 9999px, 68px, 0); }
    15% { clip: rect(9px, 9999px, 33px, 0); }
    20% { clip: rect(78px, 9999px, 52px, 0); }
    25% { clip: rect(54px, 9999px, 87px, 0); }
    30% { clip: rect(18px, 9999px, 2px, 0); }
    35% { clip: rect(63px, 9999px, 46px, 0); }
    40% { clip: rect(37px, 9999px, 91px, 0); }
    45% { clip: rect(92px, 9999px, 19px, 0); }
    50% { clip: rect(5px, 9999px, 73px, 0); }
    55% { clip: rect(48px, 9999px, 39px, 0); }
    60% { clip: rect(82px, 9999px, 65px, 0); }
    65% { clip: rect(29px, 9999px, 8px, 0); }
    70% { clip: rect(95px, 9999px, 57px, 0); }
    75% { clip: rect(11px, 9999px, 80px, 0); }
    80% { clip: rect(69px, 9999px, 24px, 0); }
    85% { clip: rect(43px, 9999px, 96px, 0); }
    90% { clip: rect(76px, 9999px, 40px, 0); }
    95% { clip: rect(31px, 9999px, 15px, 0); }
    100% { clip: rect(88px, 9999px, 61px, 0); }
}

/* Blinking cursor effect for terminal feel */
.cursor-blink {
    animation: blink 1s step-end infinite;
}

@keyframes blink {
    50% { opacity: 0; }
}

/* Cyberpunk Button Styling */
.cyber-button {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: var(--cyber-blue);
    background-color: transparent;
    border: 2px solid var(--cyber-blue);
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    cursor: pointer;
    overflow: hidden;
    z-index: 10;
}

.cyber-button:hover {
    color: var(--bg-color);
    background-color: var(--cyber-blue);
    box-shadow: 0 0 10px var(--cyber-blue), 0 0 40px var(--cyber-blue);
}

.cyber-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.5s ease;
}

.cyber-button:hover::before {
    left: 100%;
}

/* CRT Flicker Effect on main container */
.crt-flicker {
    animation: crt 0.15s infinite;
}

@keyframes crt {
    0% { opacity: 0.95; }
    50% { opacity: 1; }
    100% { opacity: 0.98; }
}

/* Glowing text utility */
.glow-text {
    text-shadow: 0 0 5px currentColor;
}
</style>
