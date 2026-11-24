// anti-inspect.js - Protects the web page from casual inspection and copying

(function() {
    // 1. Disable mouse right-click (context menu)
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    // 2. Disable DevTools keys and other inspect shortcuts
    document.addEventListener('keydown', function(event) {
        // Disable F12 (123)
        if (event.keyCode === 123) {
            event.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+I (73), Ctrl+Shift+J (74), Ctrl+Shift+C (67)
        if (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74 || event.keyCode === 67)) {
            event.preventDefault();
            return false;
        }
        
        // Disable Ctrl+U (View Source - 85)
        if (event.ctrlKey && event.keyCode === 85) {
            event.preventDefault();
            return false;
        }
        
        // Disable Ctrl+S (Save Page - 83)
        if (event.ctrlKey && event.keyCode === 83) {
            event.preventDefault();
            return false;
        }
    });
})();
