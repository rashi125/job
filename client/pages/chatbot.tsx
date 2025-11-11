import React, { useEffect } from "react";

// Global declarations for external libraries
declare global {
    interface Window {
        botpress?: any;
        botpressWebChat?: any;
        responsiveVoice?: any;
    }
}

const BotpressChat: React.FC = () => {
    useEffect(() => {
        // Utility: dynamically load script
        const loadScript = (src: string) =>
            new Promise<void>((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load ${src}`));
                document.body.appendChild(script);
            });

        // Load dependencies
        const loadDependencies = async () => {
            try {
                await loadScript("https://code.responsivevoice.org/responsivevoice.js?key=tNuL6DIz");
                await loadScript("https://cdn.botpress.cloud/webchat/v3.3/inject.js");
                initBotpress();
            } catch (err) {
                console.error("Error loading scripts:", err);
            }
        };

        loadDependencies();

        let userInteracted = false;

        // Unlock audio after user interaction (for speech synthesis)
        const unlockAudio = () => {
            if (!userInteracted) {
                userInteracted = true;
                const utterance = new SpeechSynthesisUtterance("");
                speechSynthesis.speak(utterance);
            }
        };

        window.addEventListener("click", unlockAudio);
        window.addEventListener("keydown", unlockAudio);

        // Initialize Botpress
        const initBotpress = (retries = 10) => {
            if (window.botpress && window.botpress.init) {
                console.log("🟢 Initializing Botpress...");

                window.botpress.init({
                    botId: "40fe53a2-6714-4198-84ce-7d30a0f074cb",
                    clientId: "cccef710-6356-477d-bcd5-bb8d49f79407",
                    selector: "#bp-embedded-webchat",
                    configuration: {
                        version: "v2",
                        embedded: true,
                        hideWidget: true,
                        themeMode: "light",
                        botName: "Your Brand Assistant",
                        color: "#3276EA",
                        variant: "solid",
                        headerVariant: "glass",
                        radius: 3,
                        fontFamily: "Abhaya Libre",
                        feedbackEnabled: false,
                        soundEnabled: false,
                    },
                });

                // Wait until webchat is ready
                window.botpress.on("webchat:ready", () => {
                    console.log("✅ Botpress ready!");
                    setTimeout(() => window.botpress.open(), 500);

                    // Text-to-speech for incoming messages
                    window.botpress.on("incoming_message", (event: any) => {
                        const text = event.payload?.text || event.payload?.title || event.preview;
                        if (userInteracted && text && window.responsiveVoice) {
                            window.responsiveVoice.cancel();
                            window.responsiveVoice.speak(text, "UK English Male");
                        }
                    });
                });
            } else if (retries > 0) {
                console.warn("⏳ Botpress not ready, retrying...");
                setTimeout(() => initBotpress(retries - 1), 500);
            } else {
                console.error("❌ Failed to initialize Botpress WebChat");
            }
        };

        return () => {
            window.removeEventListener("click", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
        };
    }, []);

    return (
        // No white box, just a transparent div where Botpress will render
        <div
            id="bp-embedded-webchat"
            style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                width: "100%",
                height: "100%",
                background: "transparent",
                border: "none",
                boxShadow: "none",
                zIndex: 1000,
            }}
        />
    );
};

export default BotpressChat;
