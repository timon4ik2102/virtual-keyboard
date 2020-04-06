const wrapper = document.createElement('div');
wrapper.classList = 'wrapper'
document.body.append(wrapper)

const paragraph = document.createElement('p');
wrapper.append(paragraph);
paragraph.classList = 'text-paragraph';
paragraph.innerText = 'Change language - Shift/Alt'

const textarea = document.createElement('textarea');
textarea.classList = 'textarea';
textarea.rows = 30
wrapper.append(textarea);
textarea.focus()

const keyboard = document.createElement('div');
keyboard.classList = 'keyboard';
wrapper.append(keyboard);


if (!localStorage.language) localStorage.language = 'EN'



const createKeyboard = () => {
    localStorage.getItem('language');

    keysArray.forEach((rowEl,item) => {
        let row = document.createElement('div');
        keyboard.append(row);
        row.className = `row row${item}`;

        rowEl.forEach(keyEl => {
            let key = document.createElement('span');
            row.append(key);
            key.className = `key key${keyEl.style}`;

            if (keyEl.en || keyEl.ru) {
                if (localStorage.getItem('language') === 'RU') {
                    key.innerHTML = keyEl.ru;
                }
                else {
                    key.innerHTML = keyEl.en;
                }
            }
            else {
                key.innerHTML = keyEl.title;
            }
            key.id = keyEl.keyCode;

        });

    });

}
createKeyboard();




const elements = document.querySelectorAll('.key');
console.log(elements)
const capsLockBtn = document.getElementById('20');
const backSpaceBtn = document.getElementById('8');
const deleteBtn = document.getElementById('46');
const enterBtn = document.getElementById('13');
const tabBtn = document.getElementById('9');
const leftArrowBtn = document.getElementById('37');
const rightArrowBtn = document.getElementById('39');
const shiftBtn = document.getElementById('16');



const psysicalKeyPressAnimation = () => {
    document.addEventListener('keydown',(event) => {
        textarea.focus();
        elements.forEach(elem => {
            if ((elem.id == event.keyCode)) {
                if (elem === capsLockBtn) {
                    elem.classList.toggle('active');
                }
                else {
                    elem.classList.add('active');
                }
            }
        })

    });

    document.addEventListener('keyup',() => {
        elements.forEach(elem => {
            if (elem != capsLockBtn) {
                elem.classList.remove('active');
            }
        })
    });
}




const inputTextByClicks = () => {
    document.addEventListener('mousedown',(event) => {
        textarea.focus();
        if (event.target.tagName !== 'SPAN') return
        let target = event.target;
        console.log(target)
        if (target !== capsLockBtn) {
            target.classList.add('active')
        }
        if (target.classList.contains('dark') && target.id != 32) {
            if (target === capsLockBtn) {
                capsLockBtn.classList.toggle('active');
                CapsLock();
            }
            else if (target === backSpaceBtn) {
                textarea.value = backspaceButtonPressed(textarea.value,textarea.selectionStart,textarea.selectionEnd)
            }
            else if (target === deleteBtn) {
                textarea.value = deleteTextButtonPressed(textarea.value,textarea.selectionStart,textarea.selectionEnd)
            }
            else if (target === enterBtn) {
                textarea.value += `\n`;
            }
            else if (target === tabBtn) {
                tabButtonPressed();
            }

            else if (target === shiftBtn) {
                CapsLock();

            }
            else if (target === leftArrowBtn) {
                textarea.selectionEnd -= 1;
            }
            else if (target === rightArrowBtn) {
                textarea.selectionStart += 1;
            }

        } else {
            let char = target.textContent
            textarea.value += char[0]
        }
    })
    document.addEventListener('mouseup',(event) => {
        if (event.target.tagName !== 'SPAN') return
        let target = event.target;
        if (target != capsLockBtn && target != shiftBtn) {
            target.classList.remove('active');
        }
        if (target == shiftBtn) {
            target.classList.remove('active');
            CapsLock();
        }
        textarea.focus()
    })

    document.addEventListener('mouseout',(event) => {
        if (event.target.tagName !== 'SPAN') return
        let target = event.target;
        if (target != capsLockBtn && target != shiftBtn) {
            target.classList.remove('active');
        }
        textarea.focus()
    })


}



inputTextByClicks();
psysicalKeyPressAnimation();


// BACK
const backspaceButtonPressed = (str,startIndex,endIndex) => {
    let result = '';
    if (startIndex === endIndex) {
        result = str.replace(str.substr(startIndex - 1,1),'');

    } else {
        result = str.replace(str.slice(startIndex,endIndex),'');
    }
    return result;
}

// DEL
const deleteTextButtonPressed = (str,startIndex,endIndex) => {
    let result = '';
    if (startIndex === endIndex) {
        result = str.replace(str.substr(startIndex,1),'');

    } else {
        result = str.replace(str.slice(startIndex,endIndex),'');
    }
    return result;
}

const tabButtonPressed = () => {
    event.preventDefault();
    textarea.value += `\t`;
}



// CAPS
function CapsLock() {
    keysArray.forEach((rowEl) => {
        rowEl.forEach(keyEl => {
            elements.forEach(elem => {
                if (elem.id == keyEl.keyCode) {
                    switch (elem.innerHTML) {
                        case keyEl.shiftEn:
                            elem.innerHTML = keyEl.en;
                            break;
                        case keyEl.en:
                            elem.innerHTML = keyEl.shiftEn;
                            break;
                        case keyEl.shiftRu:
                            elem.innerHTML = keyEl.ru;
                            break;
                        case keyEl.ru:
                            elem.innerHTML = keyEl.shiftRu;
                            break;
                    }
                }
            });
        });
    });

}





// DOOG
const runOnKeys = (func,...keys) => {
    let pressed = new Set();

    document.addEventListener('keydown',(e) => {
        pressed.add(e.key);
        for (let key of keys) {
            if (!pressed.has(key)) {
                return;
            }
        }
        pressed.clear();
        func();
    });

    document.addEventListener('keyup',(e) => {
        pressed.delete(e.key);
    });
}

runOnKeys(() => ChangeLang(),"Alt","Shift");
runOnKeys(() => CapsLock(),"CapsLock");
runOnKeys(() => tabButtonPressed(),"Tab");





// ДУМАЙ
function ChangeLang() {
    keysArray.forEach((rowEl) => {
        rowEl.forEach(keyEl => {
            elements.forEach(elem => {
                if (elem.id == keyEl.keyCode) {
                    switch (elem.innerHTML) {
                        case keyEl.en:
                            elem.innerHTML = keyEl.ru;
                            lang = 'RU';
                            break;
                        case keyEl.shiftEn:
                            elem.innerHTML = keyEl.shiftRu;
                            lang = 'RU';
                            break;
                        case keyEl.shiftRu:
                            elem.innerHTML = keyEl.shiftEn;
                            lang = 'EN';
                            break;
                        case keyEl.ru:
                            elem.innerHTML = keyEl.en;
                            lang = 'EN';
                            break;
                    }
                }
            });
        });
    });
    localStorage.setItem('language',lang);
}



