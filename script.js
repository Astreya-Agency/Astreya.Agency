document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const elements = {
        caesar: {
            text: document.getElementById('caesar-text'),
            shift: document.getElementById('caesar-shift'),
            encryptBtn: document.getElementById('encrypt-caesar'),
            decryptBtn: document.getElementById('decrypt-caesar'),
            result: document.getElementById('caesar-result'),
            copyBtn: document.getElementById('copy-caesar')
        },
        vigenere: {
            text: document.getElementById('vigenere-text'),
            key: document.getElementById('vigenere-key'),
            encryptBtn: document.getElementById('encrypt-vigenere'),
            decryptBtn: document.getElementById('decrypt-vigenere'),
            result: document.getElementById('vigenere-result'),
            copyBtn: document.getElementById('copy-vigenere')
        },
        langBtns: document.querySelectorAll('.lang-btn'),
        upgradeBtn: document.querySelector('.upgrade-btn'),
        premiumOverlay: document.querySelector('.premium-overlay')
    };

    // Алфавиты
    const alphabets = {
        ru: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
        en: 'abcdefghijklmnopqrstuvwxyz'
    };

    // Полные переводы для всех страниц
    const translations = {
        ru: {
            common: {
                title: "Astreya | Крипто-инструменты",
                subtitle: "Криптографические инструменты",
                caesarTitle: "ШИФР ЦЕЗАРЯ",
                vigenereTitle: "ШИФР ВИЖЕНЕРА",
                caesarPlaceholder: "Введите текст...",
                vigenerePlaceholder: "Требуется премиум",
                keyPlaceholder: "Ключ (премиум)",
                encryptBtn: "ЗАШИФРОВАТЬ",
                decryptBtn: "РАСШИФРОВАТЬ",
                copyBtn: "КОПИРОВАТЬ",
                donateText: "Поддержать разработку:",
                infoBtn: "О ШИФРАХ",
                premiumText: "Доступно в премиум версии",
                upgradeBtn: "Активировать за 5€",
                rightsText: "Все права защищены",
                premiumActivated: "Премиум активирован!",
                warningText: "Внимание: Используйте только в образовательных целях"
            },
            info: {
                title: "Astreya | О шифрах",
                subtitle: "Криптографические инструменты",
                backBtn: "НАЗАД",
                rightsText: "Astreya Agency | Все права защищены",
                aboutTitle: "Что такое шифр?",
                aboutText1: "Шифр — это способ спрятать сообщение, чтобы никто, кроме тебя и тех, кому ты доверяешь, не смог его прочитать. Шифры создают специальные правила замены букв, чтобы секретное сообщение выглядело как непонятный набор символов.",
                caesarAbout: "Шифр Цезаря: самый простой шифр с сдвигом букв",
                caesarText1: "Этот шифр придумал примерно 2000 лет назад древнеримский полководец Гай Юлий Цезарь, чтобы тайно посылать письма своим солдатам.",
                caesarText2: "Он просто сдвигал все буквы в сообщении на 3 позиции вперёд по алфавиту. Например, буква А становится Г, Б становится Д и так далее.",
                caesarText3: "Если у тебя слово «ДА», то сдвинув на 3 буквы, получим «ЖГ».",
                caesarComplexity: "Очень низкая — около 2 из 10. Сегодня такой шифр легко расшифровывается даже вручную.",
                tarabarAbout: "Тарабарщина — похожий русский шифр",
                tarabarText1: "В России в Средние века использовали похожий способ шифрования, который называли тарабарщина или тарабарская грамота.",
                tarabarText2: "Его применяли для тайных переписок, например, митрополит Киприан и Сергий Радонежский.",
                tarabarText3: "Тут буквы из верхнего алфавитного ряда заменяли на буквы из нижнего, по специальному правилу.",
                tarabarComplexity: "Примерно 3 из 10 — чуть сложнее, чем шифр Цезаря, но всё равно очень простой.",
                vigenereAbout: "Шифр Виженера — более умный шифр с ключевым словом",
                vigenereText1: "Этот шифр придумали в XVI веке и он стал популярным, потому что намного сложнее взламывается.",
                vigenereText2: "Вместо одного сдвига для всего сообщения используется ключ — слово, которое помогает менять буквы по-разному в каждой позиции.",
                vigenereExampleTitle: "Простой пример:",
                vigenereExample1: "Исходное слово: «Астрея»",
                vigenereExample2: "Ключ: «Шифр»",
                vigenereExample3: "Мы подставляем ключ под текст и для каждой буквы складываем номера буквы из текста и ключа (представленные числами). Если ключ короче текста, его повторяют снова и снова.",
                vigenereExample4: "Так буквы меняются по-разному, и это намного надёжнее.",
                vigenereComplexity: "Средняя — около 5 из 10. Без знания ключа расшифровать сообщение уже не так просто.",
                importanceTitle: "Почему это важно?",
                importanceText: "Шифры помогают хранить личные данные и тайны в безопасности. Чем сложнее шифр, тем труднее его взломать постороннему."
            }
        },
        en: {
            common: {
                title: "Astreya | Crypto Tools",
                subtitle: "Cryptographic Tools",
                caesarTitle: "CAESAR CIPHER",
                vigenereTitle: "VIGENÈRE CIPHER",
                caesarPlaceholder: "Enter text...",
                vigenerePlaceholder: "Premium required",
                keyPlaceholder: "Key (premium)",
                encryptBtn: "ENCRYPT",
                decryptBtn: "DECRYPT",
                copyBtn: "COPY",
                donateText: "Support development:",
                infoBtn: "ABOUT CIPHERS",
                premiumText: "Available in premium version",
                upgradeBtn: "Activate for 5€",
                rightsText: "All rights reserved",
                premiumActivated: "Premium activated!",
                warningText: "Warning: For educational purposes only"
            },
            info: {
                title: "Astreya | About Ciphers",
                subtitle: "Cryptographic Tools",
                backBtn: "BACK",
                rightsText: "Astreya Agency | All rights reserved",
                aboutTitle: "What is a cipher?",
                aboutText1: "A cipher is a way to hide a message so that no one except you and those you trust can read it. Ciphers create special rules for replacing letters to make a secret message look like a meaningless set of characters.",
                caesarAbout: "Caesar Cipher: the simplest letter-shift cipher",
                caesarText1: "This cipher was invented about 2000 years ago by the Roman general Gaius Julius Caesar to secretly send letters to his soldiers.",
                caesarText2: "It simply shifts all letters in the message 3 positions forward in the alphabet. For example, the letter A becomes D, B becomes E, and so on.",
                caesarText3: "If you have the word 'YES' shifting it by 3 letters would give 'BHV'.",
                caesarComplexity: "Very low — about 2 out of 10. Today such a cipher can be easily decrypted even manually.",
                tarabarAbout: "Tarabarshchina — similar Russian cipher",
                tarabarText1: "In medieval Russia, a similar encryption method called tarabarshchina or tarabar script was used.",
                tarabarText2: "It was used for secret correspondence, for example by Metropolitan Cyprian and Sergius of Radonezh.",
                tarabarText3: "Here, letters from the upper alphabetical row were replaced with letters from the lower row according to a special rule.",
                tarabarComplexity: "About 3 out of 10 — slightly more complex than Caesar cipher, but still very simple.",
                vigenereAbout: "Vigenère Cipher — smarter cipher with a keyword",
                vigenereText1: "This cipher was invented in the 16th century and became popular because it's much harder to crack.",
                vigenereText2: "Instead of a single shift for the entire message, it uses a key — a word that helps change letters differently at each position.",
                vigenereExampleTitle: "Simple example:",
                vigenereExample1: "Original word: «Astreya»",
                vigenereExample2: "Key: «Cipher»",
                vigenereExample3: "We align the key under the text and for each letter add the numerical positions of the text letter and key letter. If the key is shorter than the text, it is repeated.",
                vigenereExample4: "This way letters change differently, making it much more reliable.",
                vigenereComplexity: "Medium — about 5 out of 10. Without the key, decrypting the message becomes much harder.",
                importanceTitle: "Why is this important?",
                importanceText: "Ciphers help keep personal data and secrets secure. The more complex the cipher, the harder it is for outsiders to crack."
            }
        }
    };

    // Текущий язык и премиум статус
    let currentLang = 'ru';
    let isPremium = localStorage.getItem('premium') === 'true';

    // Инициализация
    init();

    function init() {
        // Проверка премиума
        if (isPremium) {
            activatePremium();
        }

        // Обработчики для Цезаря
        setupCaesarHandlers();
        
        // Обработчики для Виженера (если премиум)
        if (isPremium) {
            setupVigenereHandlers();
        }

        // Настройка переключения языка
        setupLanguageSwitcher();

        // Настройка премиум-активации
        setupPremiumActivation();

        // Первоначальный перевод
        translatePage();
        updateActiveLangBtn();
    }

    function setupCaesarHandlers() {
        if (elements.caesar.encryptBtn) {
            elements.caesar.encryptBtn.addEventListener('click', () => {
                const text = elements.caesar.text.value;
                const shift = parseInt(elements.caesar.shift.value);
                elements.caesar.result.textContent = caesarCipher(text, shift, currentLang);
            });
        }

        if (elements.caesar.decryptBtn) {
            elements.caesar.decryptBtn.addEventListener('click', () => {
                const text = elements.caesar.text.value;
                const shift = parseInt(elements.caesar.shift.value);
                elements.caesar.result.textContent = caesarCipher(text, -shift, currentLang);
            });
        }

        if (elements.caesar.copyBtn) {
            elements.caesar.copyBtn.addEventListener('click', () => {
                copyToClipboard(elements.caesar.result.textContent);
            });
        }
    }

    function setupVigenereHandlers() {
        if (elements.vigenere.encryptBtn) {
            elements.vigenere.encryptBtn.addEventListener('click', () => {
                const text = elements.vigenere.text.value;
                const key = elements.vigenere.key.value;
                elements.vigenere.result.textContent = vigenereCipher(text, key, currentLang, true);
            });
        }

        if (elements.vigenere.decryptBtn) {
            elements.vigenere.decryptBtn.addEventListener('click', () => {
                const text = elements.vigenere.text.value;
                const key = elements.vigenere.key.value;
                elements.vigenere.result.textContent = vigenereCipher(text, key, currentLang, false);
            });
        }

        if (elements.vigenere.copyBtn) {
            elements.vigenere.copyBtn.addEventListener('click', () => {
                copyToClipboard(elements.vigenere.result.textContent);
            });
        }
    }

    function setupLanguageSwitcher() {
        elements.langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentLang = btn.dataset.lang;
                updateActiveLangBtn();
                translatePage();
            });
        });
    }

    function setupPremiumActivation() {
        if (elements.upgradeBtn) {
            elements.upgradeBtn.addEventListener('click', () => {
                if (confirm(currentLang === 'ru' ? 
                    "Активировать премиум за 5€?" : 
                    "Activate premium for 5€?")) {
                    isPremium = true;
                    localStorage.setItem('premium', 'true');
                    activatePremium();
                    alert(translations[currentLang].common.premiumActivated);
                }
            });
        }
    }

    function activatePremium() {
        if (elements.premiumOverlay) {
            elements.premiumOverlay.style.display = 'none';
        }
        if (elements.vigenere) {
            elements.vigenere.text.readOnly = false;
            elements.vigenere.key.readOnly = false;
            elements.vigenere.text.placeholder = translations[currentLang].common.caesarPlaceholder;
            elements.vigenere.key.placeholder = translations[currentLang].common.keyPlaceholder.replace(' (premium)', '');
            document.querySelectorAll('.premium-btn').forEach(btn => {
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            });
        }
        setupVigenereHandlers();
    }

    function translatePage() {
        const isInfoPage = window.location.pathname.includes('info.html');
        const t = translations[currentLang].common;
        const tInfo = translations[currentLang].info;
        
        // Установка заголовка
        document.title = isInfoPage ? tInfo.title : t.title;
        
        // Обновление субтитра
        const subtitle = document.querySelector('.logo-subtext');
        if (subtitle) {
            subtitle.textContent = isInfoPage ? tInfo.subtitle : t.subtitle;
        }

        // Переводим все элементы с data-translate
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (key.startsWith('info.')) {
                const infoKey = key.split('.')[1];
                el.textContent = tInfo[infoKey];
            } else {
                el.textContent = t[key];
            }
        });

        // Дополнительный перевод для info.html (если нет data-translate)
        if (isInfoPage) {
            // Основные элементы страницы info.html
            translateElement('.info-page h2', tInfo.aboutTitle);
            translateElement('.info-page p:nth-of-type(1)', tInfo.aboutText1);
            translateElement('.info-page h3:nth-of-type(1)', tInfo.caesarAbout);
            translateElement('.info-page p:nth-of-type(2)', tInfo.caesarText1);
            // Добавьте другие элементы по аналогии...
            translateElement('.info-page .btn', tInfo.backBtn);
            translateElement('.app-footer p', tInfo.rightsText);
        }

        // Обновление элементов только на главной странице
        if (!isInfoPage) {
            if (elements.caesar && elements.caesar.text) {
                elements.caesar.text.placeholder = t.caesarPlaceholder;
            }
            
            if (elements.vigenere && elements.vigenere.text) {
                elements.vigenere.text.placeholder = isPremium ? t.caesarPlaceholder : t.vigenerePlaceholder;
                elements.vigenere.key.placeholder = isPremium ? t.keyPlaceholder.replace(' (premium)', '') : t.keyPlaceholder;
            }
        }
    }

    function translateElement(selector, text) {
        const element = document.querySelector(selector);
        if (element && text) {
            element.textContent = text;
        }
    }

    // Шифр Цезаря
    function caesarCipher(text, shift, lang) {
        const alphabet = alphabets[lang];
        if (!alphabet) return text;
        
        let result = '';

        for (let char of text) {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);
            
            if (index >= 0) {
                let newIndex = (index + shift) % alphabet.length;
                if (newIndex < 0) newIndex += alphabet.length;
                const newChar = alphabet[newIndex];
                result += (char === char.toUpperCase()) ? newChar.toUpperCase() : newChar;
            } else {
                result += char;
            }
        }
        return result;
    }

    // Шифр Виженера
    function vigenereCipher(text, key, lang, encrypt) {
        const alphabet = alphabets[lang];
        if (!alphabet) return text;
        
        let result = '';
        key = key.toLowerCase().replace(/[^a-zа-яё]/g, '');

        if (key.length === 0) return translations[currentLang].common.keyPlaceholder;

        for (let i = 0, keyIndex = 0; i < text.length; i++) {
            const char = text[i];
            const lowerChar = char.toLowerCase();
            const textPos = alphabet.indexOf(lowerChar);

            if (textPos >= 0) {
                const keyChar = key[keyIndex % key.length];
                const keyPos = alphabet.indexOf(keyChar);
                let newPos;
                
                if (encrypt) {
                    newPos = (textPos + keyPos) % alphabet.length;
                } else {
                    newPos = (textPos - keyPos + alphabet.length) % alphabet.length;
                }
                
                const newChar = alphabet[newPos];
                result += (char === char.toUpperCase()) ? newChar.toUpperCase() : newChar;
                keyIndex++;
            } else {
                result += char;
            }
        }
        return result;
    }

    // Копирование в буфер обмена
    function copyToClipboard(text) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            alert(currentLang === 'ru' ? "Скопировано!" : "Copied!");
        });
    }

    // Обновление активной кнопки языка
    function updateActiveLangBtn() {
        elements.langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
    }
});