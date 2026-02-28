let selectedColor = '#EEF0FA';
let selectedTextColor = '#6A71D0';
let unregisterEvent = null;

const colors = [
    { bg: '#EFF6FF', text: '#1E40AF' }, // Blue
    { bg: '#FEF2F2', text: '#991B1B' }, // Red
    { bg: '#F0FDF4', text: '#166534' }, // Green
    { bg: '#FFFBEB', text: '#92400E' }, // Amber
    { bg: '#F5F3FF', text: '#5B21B6' }, // Violet
    { bg: '#EEF2FF', text: '#3730A3' }, // Indigo
    { bg: '#FFF1F2', text: '#9F1239' }, // Rose
    { bg: '#F0FDFA', text: '#115E59' }, // Teal
    { bg: '#ECFEFF', text: '#155E75' }, // Cyan
    { bg: '#FFF7ED', text: '#9A3412' }, // Orange
    { bg: '#F8FAFC', text: '#1E293B' }, // Slate
    { bg: '#F7FEE7', text: '#3F6212' }, // Lime
    { bg: '#ECFDF5', text: '#065F46' }, // Emerald
    { bg: '#F0F9FF', text: '#075985' }, // Sky
    { bg: '#FDF2F8', text: '#86198F' }, // Fuchsia
    { bg: '#FDF4FF', text: '#701A75' }, // Purple
    { bg: '#F9FAFB', text: '#111827' }, // Gray
    { bg: '#FAF9F6', text: '#44403C' }, // Stone
    { bg: '#FEFCE8', text: '#854D0E' }, // Yellow
    { bg: '#FAF5FF', text: '#6B21A8' }  // Deep Purple
];

document.addEventListener("DOMContentLoaded", () => {
    initColorPicker();
    if (typeof tableau === 'undefined' || !tableau.extensions) return;

    tableau.extensions.initializeAsync({'configure': showSettings}).then(() => {
        // Load saved appearance
        const savedBg = tableau.extensions.settings.get('bgColor');
        const savedText = tableau.extensions.settings.get('textColor');
        if (savedBg) {
            selectedColor = savedBg;
            selectedTextColor = savedText;
        }

        // Listen for data changes (e.g., dragging a measure to the encoding shelf)
        const worksheet = tableau.extensions.worksheetContent.worksheet;
        unregisterEvent = worksheet.addEventListener(tableau.TableauEventType.SummaryDataChanged, renderPill);
        
        renderPill();
    });
});

function initColorPicker() {
    const picker = document.getElementById('color-picker');
    colors.forEach((c) => {
        const div = document.createElement('div');
        div.className = 'color-option';
        div.style.backgroundColor = c.bg;
        div.onclick = () => selectColor(c.bg, c.text, div);
        if (c.bg === selectedColor) div.classList.add('selected');
        picker.appendChild(div);
    });
}

function selectColor(bg, text, element) {
    selectedColor = bg;
    selectedTextColor = text;
    document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
}

function showSettings() {
    document.getElementById('settings-pane').classList.add('active');
}

function hideSettings() {
    document.getElementById('settings-pane').classList.remove('active');
}

async function saveSettings() {
    tableau.extensions.settings.set('bgColor', selectedColor);
    tableau.extensions.settings.set('textColor', selectedTextColor);
    await tableau.extensions.settings.saveAsync();
    hideSettings();
    renderPill();
}

async function renderPill() {
    const pill = document.getElementById('pill');
    const worksheet = tableau.extensions.worksheetContent.worksheet;
    
    try {
        // Get the data from the worksheet (which includes fields dragged onto the encoding shelf)
        const dataTable = await worksheet.getSummaryDataAsync();
        
        // Find the index for the KPI Value encoding (or just take the first measure available)
        if (dataTable.data.length > 0) {
            // By default, we show the first measure value found in the summary data
            // This maps to whatever measure is dragged onto the marks card or encoding shelf
            const val = dataTable.data[0][0].formattedValue;
            pill.innerText = val;
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
