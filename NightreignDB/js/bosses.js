let bossesData = null;
let currentMode = "solo";
let bossSearch = "";

const damageLabels = [
    ["phys", "⚔️", "Physical"],
    ["slash", "🗡️", "Slash"],
    ["strike", "🔨", "Strike"],
    ["pierce", "🏹", "Pierce"],
    ["magic", "✨", "Magic"],
    ["fire", "🔥", "Fire"],
    ["lightning", "⚡", "Lightning"],
    ["holy", "☀️", "Holy"]
];

const affinityLabels = [
    ["poison", "☠️", "Poison"],
    ["rot", "🧫", "Rot"],
    ["bleed", "🩸", "Bleed"],
    ["frostbite", "❄️", "Frostbite"],
    ["sleep", "💤", "Sleep"],
    ["madness", "👁️", "Madness"],
    ["deathBlight", "💀", "Death Blight"]
];

const statusLabels = [
    ["bleed", "🩸", "Bleed Multiplier"],
    ["frost", "❄️", "Frost Multiplier"],
    ["sleep", "💤", "Sleep Multiplier"],
    ["madness", "👁️", "Madness Multiplier"]
];

const weakLabels = [
    ["gravityVoid", "🌀", "Gravity / Void"],
    ["liveInDeath", "🦴", "Live in Death"],
    ["ancientDragon", "🐉", "Ancient Dragon"],
    ["dragonWyrm", "🐲", "Dragon / Wyrm"]
];

async function loadBosses() {
    try {
        const bossesRes = await fetch(`./bosses_data.json?v=${window.APP_VERSION}`);
        bossesData = await bossesRes.json();
    } catch (err) {
        console.error("Could not load bosses_data.json", err);
        bossesData = null;
    }

    updateModeButtons();
    renderBossCategories();
}

function setMode(mode) {
    currentMode = mode;
    updateModeButtons();
    renderBossCategories();
}

function updateModeButtons() {
    ["solo", "duo", "trio"].forEach(mode => {
        const el = document.getElementById(`mode-${mode}`);
        if (el) {
            el.classList.toggle("active", currentMode === mode);
        }
    });
}

function setBossSearch(value) {
    bossSearch = value;
    renderBossCategories();
}

function renderBossCategories() {
    const root = document.getElementById("bossCategories");
    if (!root) return;

    if (!bossesData || !bossesData.categories) {
        root.innerHTML = `
            <div class="box">
                <p class="no-data">Could not load bosses_data.json.</p>
            </div>`;
        return;
    }

    const query = bossSearch.trim().toLowerCase();
    let html = "";

    bossesData.categories.forEach(category => {
        const rows = (category.rows || []).filter(row => {
            if (!query) return true;
            return JSON.stringify(row).toLowerCase().includes(query);
        });

        if (rows.length === 0) return;

        html += `
        <div class="box">
            <div class="category-header">
                <h2>${escapeHtml(category.title)}</h2>
                <span class="count-pill">${rows.length} entries</span>
            </div>

            <div class="table-wrap">
                <table class="boss-table">
                    <thead>
                        <tr>
                            <th rowspan="2" class="col-name">Name</th>
                            <th rowspan="2" class="col-hp">HP</th>
                            <th rowspan="2" class="col-variant">Variant</th>
                            <th colspan="8" class="group-head dmg-head">Dmg Res</th>
                            <th colspan="7" class="group-head aff-head">Affinity Res</th>
                            <th colspan="4" class="group-head status-head">Status Mult</th>
                            <th colspan="4" class="group-head weak-head">Weak</th>
                        </tr>
                        <tr>
                            ${damageLabels.map(([key, icon, title]) => headIcon(icon, title)).join("")}
                            ${affinityLabels.map(([key, icon, title]) => headIcon(icon, title)).join("")}
                            ${statusLabels.map(([key, icon, title]) => headIcon(icon, title)).join("")}
                            ${weakLabels.map(([key, icon, title]) => headIcon(icon, title)).join("")}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(renderBossRow).join("")}
                    </tbody>
                </table>
            </div>
        </div>`;
    });

    if (!html) {
        html = `
        <div class="box">
            <p class="no-data">No bosses found for "${escapeHtml(bossSearch)}".</p>
        </div>`;
    }

    root.innerHTML = html;
}

function headIcon(icon, title) {
    return `<th class="icon-col" title="${escapeHtml(title)}">${icon}</th>`;
}

function renderBossRow(row) {
    const hp = row.hp?.[currentMode] ?? "";
    const status = row.statusMultiplier?.[currentMode] || {};
    const variantInfo = getVariantInfo(row.variant);

    return `
    <tr>
        <td class="boss-name" title="${escapeHtml(row.name)}">${escapeHtml(row.name)}</td>
        <td class="hp-cell">${formatValue(hp)}</td>
        <td>
            <span class="variant-pill ${variantInfo.className}" title="${escapeHtml(row.variant || "Normal")}">
                ${variantInfo.label}
            </span>
        </td>

        ${damageLabels.map(([key]) => renderValueCell(row.damageResistance?.[key], true)).join("")}
        ${affinityLabels.map(([key]) => renderValueCell(row.affinityResistance?.[key], false)).join("")}
        ${statusLabels.map(([key]) => renderValueCell(status?.[key], false)).join("")}
        ${weakLabels.map(([key]) => renderWeakCell(row.weakDamageType?.[key])).join("")}
    </tr>`;
}

function getVariantInfo(variant) {
    const raw = String(variant || "Normal");
    const value = raw.toLowerCase().trim();

    if (value.includes("enhanced") || value.includes("phase")) {
        return { label: "Enh.", className: "variant-enhanced" };
    }

    if (value.includes("tier 1") || value === "t1") {
        return { label: "T1", className: "variant-tier1" };
    }

    if (value.includes("tier 2") || value === "t2") {
        return { label: "T2", className: "variant-tier2" };
    }

    if (value.includes("tier 3") || value === "t3") {
        return { label: "T3", className: "variant-tier3" };
    }

    if (value.includes("day 1")) {
        return { label: "D1", className: "variant-day1" };
    }

    if (value.includes("day 2")) {
        return { label: "D2", className: "variant-day2" };
    }

    if (value.includes("basement") || value.includes("basemente")) {
        return { label: "Base", className: "variant-basement" };
    }

    if (value.includes("rooftop")) {
        return { label: "Roof", className: "variant-rooftop" };
    }

    if (value.includes("crater")) {
        return { label: "Crtr", className: "variant-crater" };
    }

    if (value.includes("noklateo")) {
        return { label: "Nok", className: "variant-noklateo" };
    }

    if (
        value.includes("mountain tops") ||
        value.includes("mountaintops") ||
        value.includes("mountain top") ||
        value.includes("mountaintop")
    ) {
        return { label: "Mtn", className: "variant-mountaintops" };
    }

    if (value.includes("normal")) {
        return { label: "Norm.", className: "" };
    }

    return {
        label: escapeHtml(raw.length > 8 ? raw.slice(0, 8) : raw),
        className: ""
    };
}

function renderValueCell(value, signed) {
    let cls = "";

    if (String(value).toLowerCase() === "immune") {
        cls = "immune";
    } else if (signed && Number(value) > 0) {
        cls = "pos";
    } else if (signed && Number(value) < 0) {
        cls = "neg";
    }

    return `<td class="${cls}">${formatValue(value)}</td>`;
}

function renderWeakCell(value) {
    const yes = String(value).toLowerCase() === "yes";
    return `<td class="${yes ? "yes" : ""}">${yes ? "✓" : "-"}</td>`;
}

function formatValue(value) {
    if (value === null || value === undefined || value === "") return "-";

    if (typeof value === "number") {
        if (Number.isInteger(value) && value >= 1000) {
            return value.toLocaleString("en-US");
        }

        return String(value);
    }

    const text = String(value);

    if (text.toLowerCase() === "immune") return "Imm";

    return escapeHtml(text);
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", loadBosses);