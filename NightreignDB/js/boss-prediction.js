let rawData = [];
let fields = [];
let filters = {};

async function loadPrediction() {
    const res = await fetch("config_data.json?v=2");
    const config = await res.json();

    fields = config.fields;
    rawData = config.data;

    fields.slice(1).forEach(f => filters[f] = "(all)");

    renderFilters();
    update();
}

function getFilteredData() {
    return rawData.filter(row => {
        return fields.slice(1).every((f, i) => {
            return filters[f] === "(all)" || row[i + 1] === filters[f];
        });
    });
}

function computeOptions(field) {
    let temp = rawData;

    fields.slice(1).forEach(f => {
        if (f === field) return;

        if (filters[f] !== "(all)") {
            const i = fields.indexOf(f);
            temp = temp.filter(r => r[i] === filters[f]);
        }
    });

    const idx = fields.indexOf(field);

    const values = [...new Set(temp.map(r => r[idx]))]
        .filter(v => v !== undefined && v !== null && v !== "")
        .sort((a, b) => String(a).localeCompare(String(b), undefined, { sensitivity: "base" }));

    return ["(all)", ...values];
}

function renderFilters() {
    const el = document.getElementById("filters");
    el.innerHTML = "";

    fields.slice(1).forEach(f => {
        const label = document.createElement("div");
        label.textContent = f;

        const s = document.createElement("select");

        s.onchange = e => {
            filters[f] = e.target.value;
            renderFilters();
            update();
        };

        computeOptions(f).forEach(o => {
            const opt = document.createElement("option");
            opt.value = o;
            opt.text = o;

            if (filters[f] === o) {
                opt.selected = true;
            }

            s.appendChild(opt);
        });

        el.appendChild(label);
        el.appendChild(s);
    });
}

function update() {
    const data = getFilteredData();
    renderTable(data);
    renderProbability(data);
}

function renderTable(data) {
    const el = document.getElementById("table");

    if (!data.length) {
        el.innerHTML = "No data";
        return;
    }

    let html = "<table><tr>";

    fields.forEach(f => {
        html += `<th>${escapeHtml(f)}</th>`;
    });

    html += "</tr>";

    data.forEach(r => {
        html += "<tr>";

        fields.forEach((f, i) => {
            html += `<td>${escapeHtml(r[i] ?? "")}</td>`;
        });

        html += "</tr>";
    });

    el.innerHTML = html + "</table>";
}

function renderProbability(data) {
    const el = document.getElementById("probability");

    if (!data.length) {
        el.innerHTML = "No data";
        return;
    }

    const idx = fields.indexOf("Night Lord");
    const count = {};

    data.forEach(r => {
        count[r[idx]] = (count[r[idx]] || 0) + 1;
    });

    let html = "<table><tr><th>Boss</th><th>%</th></tr>";

    Object.entries(count)
        .sort((a, b) => String(a[0]).localeCompare(String(b[0]), undefined, { sensitivity: "base" }))
        .forEach(([k, v]) => {
            html += `<tr><td>${escapeHtml(k)}</td><td>${((v / data.length) * 100).toFixed(2)}%</td></tr>`;
        });

    el.innerHTML = html + "</table>";
}

function resetFilters() {
    fields.slice(1).forEach(f => filters[f] = "(all)");
    renderFilters();
    update();
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", loadPrediction);