let selectedColor = '#EFF6FF';
let selectedTextColor = '#1E40AF';
let unregisterEvent = null;

document.addEventListener("DOMContentLoaded", () => {
    if (typeof tableau === 'undefined' || !tableau.extensions) return;

    tableau.extensions.initializeAsync({'configure': showSettings}).then(() => {
        const worksheet = tableau.extensions.worksheetContent.worksheet;
        unregisterEvent = worksheet.addEventListener(tableau.TableauEventType.SummaryDataChanged, renderPill);
        renderPill();
    });
});

function showSettings() {
    const popupUrl = `${window.location.origin}${window.location.pathname.replace('index.html', 'config.html')}`;
    
    tableau.extensions.ui.displayDialogAsync(popupUrl, "", { height: 400, width: 400 }).then((closePayload) => {
        if (closePayload === "saved") {
            renderPill();
        }
    }).catch((error) => {
        if (error.errorCode !== tableau.ErrorCodes.DialogClosedByUser) {
            console.error(error.message);
        }
    });
}

async function renderPill() {
    const pill = document.getElementById('pill');
    const worksheet = tableau.extensions.worksheetContent.worksheet;
    
    // Load current appearance from settings
    const savedBg = tableau.extensions.settings.get('bgColor');
    const savedText = tableau.extensions.settings.get('textColor');
    if (savedBg) {
        selectedColor = savedBg;
        selectedTextColor = savedText;
    }

    try {
        const dataTable = await worksheet.getSummaryDataAsync();
        if (dataTable.data.length > 0) {
            pill.innerText = dataTable.data[0][0].formattedValue;
        } else {
            pill.innerText = "Drag Measure";
        }
        
        pill.style.backgroundColor = selectedColor;
        pill.style.color = selectedTextColor;
    } catch (e) { 
        console.error(e);
        pill.innerText = "Error"; 
    }
}
