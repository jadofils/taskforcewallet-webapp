document.getElementById('reportForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const reportType = document.getElementById('reportType').value;
    const reportFormat = document.getElementById('reportFormat').value;
    const timePeriod = document.getElementById('timePeriod').value;

    const response = await fetch('http://localhost:5000/generate-report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportType, reportFormat, timePeriod }),
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report.${reportFormat}`;
        a.click();
        window.URL.revokeObjectURL(url);
    } else {
        alert('Failed to generate report');
    }
});