document.oncontextmenu = function () { return false; };
document.onselectstart = function () { return false; };

document.onkeydown = function () {
    if (window.event && (123 == window.event.keyCode
            || (window.event.ctrlKey && window.event.shiftKey && (74 === window.event.keyCode || 73 === window.event.keyCode || 67 === window.event.keyCode)) // Ctrl + Shift + I/J/C
            || (window.event.ctrlKey && 85 === window.event.keyCode)) // Ctrl + U
        || (window.event.ctrlKey && 80 === window.event.keyCode)) // Ctrl + P
        || (window.event.ctrlKey && 83 === window.event.keyCode)) // Ctrl + S
) {
        return window.event.keyCode = 0, window.event.returnValue = false, false;
    }
};