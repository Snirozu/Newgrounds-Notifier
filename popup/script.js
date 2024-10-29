var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        if (xhttp.responseText.trim().startsWith('{')) {
            document.getElementById('status').textContent = "";

            const json = JSON.parse(xhttp.responseText);

            const messNum = document.createElement("span");
            messNum.className = "AccentColor";
            messNum.textContent = json.messages;
            document.getElementById('info').appendChild(messNum);
            
            const messDet = document.createElement("span");
            messDet.textContent = " new messages";
            document.getElementById('info').appendChild(messDet);

            document.getElementById('info').appendChild(document.createElement("br"));

            const interNum = document.createElement("span");
            interNum.className = "AccentColor";
            interNum.textContent = json.interactions;
            document.getElementById('info').appendChild(interNum);

            const interDet = document.createElement("span");
            interDet.textContent = " new interactions";
            document.getElementById('info').appendChild(interDet);
        }
        else {
            if (xhttp.responseText.trim().startsWith('"401'))
                document.getElementById('status').textContent = "Please Login to Newgrounds!";
            else
                document.getElementById('status').textContent = "Failed with: " + xhttp.responseText;
        }
    }
    else {
        document.getElementById('status').textContent = "Fetching...";
    }
};
xhttp.open("GET", "https://www.newgrounds.com/checknotifications", true);
xhttp.send();