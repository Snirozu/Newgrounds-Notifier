let lastMessages = 0;
let lastInteractions = 0;

var xhttp = new XMLHttpRequest();

function checkNotifs() {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200 && xhttp.responseText.trim().startsWith('{')) {
            const json = JSON.parse(xhttp.responseText);

            const newMessages = json.messages - lastMessages;
            const newInteractions = json.interactions - lastInteractions;

            if (newMessages > 0 && newInteractions > 0) {
                browser.notifications.create('ng-notif-all', {
                    title: 'Newgrounds',
                    message: 'You have ' + (newMessages + newInteractions) + ' new notifications!',
                    type: 'basic',
                    iconUrl: 'icon/ng_logo.png'
                });
            }
            else if (newMessages > 0) {
                browser.notifications.create('ng-notif-pm', {
                    title: 'Newgrounds',
                    message: 'You have ' + newMessages + ' new messages!',
                    type: 'basic',
                    iconUrl: 'icon/ng_logo.png'
                });
            }
            else if (newInteractions > 0) {
                browser.notifications.create('ng-notif-inter', {
                    title: 'Newgrounds',
                    message: 'You have ' + newInteractions + ' new interactions!',
                    type: 'basic',
                    iconUrl: 'icon/ng_logo.png'
                });
            }

            lastMessages = json.messages;
            lastInteractions = json.interactions;

            console.log(json);
        }
    };
    xhttp.open("GET", "https://www.newgrounds.com/checknotifications", true);
    xhttp.send();
}

checkNotifs();
setInterval(checkNotifs, 1000 * 60 * 5);

window.addEventListener("load", (e) => {
    if (Notification?.permission === "granted") {
        Notification.requestPermission((result) => {
            console.log(result);
        });
    }
});

browser.notifications.onClicked.addListener(id => {
    switch (id) {
        case 'ng-notif-all':
            browser.tabs.create({ url: 'https://www.newgrounds.com' });
            break;
        case 'ng-notif-pm':
            browser.tabs.create({ url: 'https://www.newgrounds.com/pm' });
            break;
        case 'ng-notif-inter':
            browser.tabs.create({ url: 'https://www.newgrounds.com/social/feeds/show/interactions' });
            break;
    }
});