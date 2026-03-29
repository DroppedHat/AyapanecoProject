const SHEETDB_URL = 'https://sheetdb.io/api/v1/jj2c9emnzi43u';

function changeAudio() {
    const select = document.getElementById('audioSelect');
    const player = document.getElementById('mainPlayer');

    player.src = select.value;
    player.load();
}

document.getElementById('transcribeForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const statusDiv = document.getElementById('statusMessage');
    const submitBtn = document.querySelector('.btn-submit');

    statusDiv.className = "";
    statusDiv.innerHTML = "saving";
    statusDiv.style.color = "#555";
    statusDiv.style.display = "block";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.6";

    const audioName = document.getElementById('audioSelect').value;
    const userText = document.getElementById('transcriptionText').value;

    const data = {
        data: [{
            Timestamp: new Date().toLocaleString(),
            Audio_File: audioName,    
            User_Response: userText   
        }]
    };

    try {
        const response = await fetch(SHEETDB_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            statusDiv.className = "success";
            statusDiv.innerHTML = "Submitted";
            document.getElementById('transcriptionText').value = "";
        } else {
            throw new Error("Server error");
        }
    } catch (error) {
        console.error(error);
        statusDiv.className = "error";
        statusDiv.innerHTML = "Try again. Couldn't save.";
    } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
    }
});