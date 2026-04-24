const depthPoints = [
    { depth: 1, firstDayLoss: "0", secondDayLoss: "0", finalDayLoss: "0", victory: "+200" },
    { depth: 2, firstDayLoss: "-200", secondDayLoss: "-100", finalDayLoss: "0", victory: "+200" },
    { depth: 3, firstDayLoss: "-400", secondDayLoss: "-300", finalDayLoss: "-200", victory: "+200" },
    { depth: 4, firstDayLoss: "-600", secondDayLoss: "-500", finalDayLoss: "-400", victory: "+200" },
    { depth: 5, firstDayLoss: "-800", secondDayLoss: "-700", finalDayLoss: "-600", victory: "+200" }
];

const pointModifiers = [
    { condition: "Hidden Map", loss: "+200", win: "+100"},
    { condition: "Hidden Boss", loss: "+200", win: "+100"},
    { condition: "Premature Exit of Another Player", loss: "Loss is halved", win: "None"},
    { condition: "Playing 1 Rank Up", loss: "+50", win: "+50"},
    { condition: "Playing 1 Rank Down", loss: "-50", win: "-50"}
];

const difficultyScaling = [
    {
        enemy: "Normal Mob",
        hp: ["+35%", "+43%", "+53%", "+72%", "+80%", "+100%"],
        damage: ["+35%", "+61%", "+91%", "+166%", "+211%", "+100%"],
        stance: ["+14%", "+15%", "+16%", "+18%", "+19%"],
        stamina: ["+15%", "+20%", "+30%", "+45%", "+50%"],
        runes: "+100%"
    },
    {
        enemy: "Minor Bosses",
        hp: ["+30%", "+38%", "+47%", "+65%", "+73%", "+65% / +80%"],
        damage: ["+30%", "+55%", "+84%", "+154%", "+195%", "+50% / +75%"],
        stance: ["+14%", "+15%", "+16%", "+18%", "+19%"],
        stamina: ["+15%", "+20%", "+30%", "+45%", "+50%"],
        runes: "+60% / +100%"
    },
    {
        enemy: "Evergaol T3",
        hp: ["+20%", "+27%", "+35%", "+52%", "+60%", "+15%"],
        damage: ["+20%", "+37%", "+56%", "+97%", "+122%", "+15%"],
        stance: ["+14%", "+15%", "+16%", "+18%", "+19%"],
        stamina: ["+15%", "+20%", "+30%", "+45%", "+50%"],
        runes: "+35%"
    },
    {
        enemy: "Castle Elite Mobs",
        hp: ["+30%", "+38%", "+47%", "+65%", "+73%", "+65% / +80%"],
        damage: ["+30%", "+55%", "+84%", "+154%", "+195%", "+50% / +75%"],
        stance: ["+14%", "+15%", "+16%", "+18%", "+19%"],
        stamina: ["+15%", "+20%", "+30%", "+45%", "+50%"],
        runes: "+60% / +100%"
    },
    {
        enemy: "Field Boss",
        hp: ["+30%", "+38%", "+47%", "+65%", "+73%", "+65%"],
        damage: ["+30%", "+55%", "+84%", "+154%", "+195%", "+50%"],
        stance: ["+14%", "+15%", "+16%", "+18%", "+19%"],
        stamina: ["+15%", "+20%", "+30%", "+45%", "+50%"],
        runes: "+60%"
    },
    {
        enemy: "Formidable Field Boss",
        hp: ["+20%", "+27%", "+35%", "+52%", "+60%", "+15%"],
        damage: ["+20%", "+37%", "+56%", "+97%", "+122%", "+15%"],
        stance: ["+14%", "+15%", "+16%", "+18%", "+19%"],
        stamina: ["+15%", "+20%", "+30%", "+45%", "+50%"],
        runes: "+35%"
    },
    {
        enemy: "Invaders",
        hp: ["+20%", "+27%", "+35%", "+52%", "+60%", "N/A"],
        damage: ["+20%", "+37%", "+56%", "+97%", "+122%", "N/A"],
        stance: ["+14%", "+15%", "+16%", "+18%", "+19%"],
        stamina: ["+15%", "+20%", "+30%", "+45%", "+50%"],
        runes: "N/A"
    },
    {
        enemy: "Night 1 Boss",
        hp: ["+35%", "+51%", "+70%", "+111%", "+133%", "N/A"],
        damage: ["+35%", "+67%", "+112%", "+214%", "+270%", "N/A"],
        stance: ["+14%", "+15%", "+16%", "+18%", "+19%"],
        stamina: ["+15%", "+20%", "+30%", "+45%", "+50%"],
        runes: "N/A"
    },
    {
        enemy: "Night 2 Boss",
        hp: ["+30%", "+46%", "+64%", "+103%", "+125%", "N/A"],
        damage: ["+30%", "+61%", "+104%", "+203%", "+257%", "N/A"],
        stance: ["+14%", "+15%", "+16%", "+18%", "+19%"],
        stamina: ["+15%", "+20%", "+30%", "+45%", "+50%"],
        runes: "N/A"
    },
    {
        enemy: "Nightlord",
        hp: ["+25%", "+40%", "+57%", "+95%", "+116%", "N/A"],
        damage: ["+25%", "+55%", "+92%", "+183%", "+231%", "N/A"],
        stance: ["+14%", "+15%", "+16%", "+18%", "+19%"],
        stamina: ["+15%", "+20%", "+30%", "+45%", "+50%"],
        runes: "N/A"
    }
];

function renderDifficultyScalingTable() {
    const el = document.getElementById("difficultyScalingTable");
    if (!el) return;

    el.innerHTML = difficultyScaling.map(row => `
        <tr>
            <td class="table-main-cell enemy-col">${escapeHtml(row.enemy)}</td>

            ${row.hp.map((v, i) => `
                <td class="hp-group ${i === 5 ? "red-col" : ""}">
                    ${escapeHtml(v)}
                </td>
            `).join("")}

            ${row.damage.map((v, i) => `
                <td class="damage-group ${i === 5 ? "red-col" : ""}">
                    ${escapeHtml(v)}
                </td>
            `).join("")}

            ${row.stance.map(v => `
                <td class="stance-group">${escapeHtml(v)}</td>
            `).join("")}

            ${row.stamina.map(v => `
                <td class="stamina-group">${escapeHtml(v)}</td>
            `).join("")}

            <td class="runes-group red-col">${escapeHtml(row.runes)}</td>
        </tr>
    `).join("");
}

function renderDepthPointsTable() {
    const el = document.getElementById("depthPointsTable");
    if (!el) return;

    el.innerHTML = depthPoints.map(row => `
        <tr>
            <td>${row.depth}</td>
            <td>${row.firstDayLoss}</td>
            <td>${row.secondDayLoss}</td>
            <td>${row.finalDayLoss}</td>
            <td class="positive-value">${row.victory}</td>
        </tr>
    `).join("");
}

function renderModifiersTable() {
    const el = document.getElementById("modifiersTable");
    if (!el) return;

    el.innerHTML = pointModifiers.map(row => `
        <tr>
            <td class="table-main-cell">${escapeHtml(row.condition)}</td>
            <td>${escapeHtml(row.loss)}</td>
            <td>${escapeHtml(row.win)}</td>
        </tr>
    `).join("");
}

const positiveWeaponEffects = [
    { name: "Increased Maximum HP", desc: "Increase max HP by 8%/12%" },
    { name: "Increased Maximum FP", desc: "Increase max FP by 9%/13%" },
    { name: "Reduced FP Consumption", desc: "Decrease FP cost of skills and spells by 9%/13%" },
    { name: "Increased Maximum Stamina", desc: "Increase max stamina by 8%/12%" },
    { name: "Improved Stamina Recovery", desc: "Increase stamina recovery by 3/5" },
    { name: "Physical Attack Up", desc: "Increase physical damage by 5.5%/8%" },
    { name: "Improved Affinity Attack Power", desc: "Increase magic/fire/lightning/holy damage by 5.5%/8%" },
    { name: "Improved Stance-Breaking", desc: "Increase stance damage by 8%/12%" },
    { name: "Improved Physical Damage Negation", desc: "Decrease physical damage taken by 9%/13%" },
    { name: "Improved Affinity Damage Negation", desc: "Decrease magic/fire/lightning/holy damage taken by 9%/13%" },
    { name: "All Resistances Up", desc: "Increase all status effect resistance by 52/65" },
    { name: "Improved Poise", desc: "Decrease poise damage taken by 20%/33%" },
    { name: "Improved Sorceries & Incantations", desc: "Increase all spell damage by 5.5%/8%" },
    { name: "Increased Sorcery & Incantation Duration", desc: "Increase all spell duration by 45%/60%" },
    { name: "Improved Thrusting Counterattack", desc: "Increase damage of thrusting counterattacks by 10%/15%" },
    { name: "Improved Flask HP Restoration", desc: "Increase HP restoration of flask by 13%/18%" },
    { name: "More Runes From Defeated Enemies", desc: "Increase rune gain for self by 6%/9%" },
    { name: "Ice Storm upon Charged Attacks", desc: "Create frost wind attack after charged heavy attack. Buffs weapon with 20 frost buildup for 20 seconds." },
    { name: "Black Flames upon Charge Attacks", desc: "Create black flame on the ground after charged heavy attack. Buffs weapon with black flame effect with 12 fire damage for 7 seconds." },
    { name: "Phantom Attack upon Charge Attacks", desc: "Trigger Phantom Slash AoW after charged heavy attack." },
    { name: "Holy Shockwave upon Charge Attacks", desc: "Trigger Wave of Gold AoW after charged heavy attack. Buffs weapon with 12 holy damage for 20 seconds." },
    { name: "Luring Enemies upon Charge Attacks", desc: "Create gravity pulse that pulls in enemies after charged heavy attack." },
    { name: "Magma upon Charge Attacks", desc: "Create magma on the ground after charged heavy attack. Buffs weapon with 12 fire damage for 20 seconds." },
    { name: "Lightning upon Charge Attacks", desc: "Create lightning blast after charged heavy attack. Buffs weapon with 12 lightning damage for 20 seconds." },
    { name: "Charge Attacks Invoke Sleep Mist", desc: "Create sleep mist after charged heavy attack. Buffs weapon with 20 sleep buildup for 20 seconds." },
    { name: "Projectiles Launched upon Charge Attacks", desc: "Fire 3 magic projectiles at enemy after charged heavy shot." },
    { name: "Lightning upon Precision Aiming", desc: "Create specified effect when and where a manually aimed shot lands." },
    { name: "Poison Mist upon Precision Aiming", desc: "Create poison mist when and where a manually aimed shot lands." },
    { name: "Rot Mist upon Precision Aiming", desc: "Create rot mist when and where a manually aimed shot lands." },
    { name: "Bloodflies upon Precision Aiming", desc: "Create bloodflies when and where a manually aimed shot lands." },
    { name: "Shielding Creates Holy Ground", desc: "Create holy ground after blocking with shield for about 3 seconds." },
    { name: "Broken Stance Activates Endure", desc: "Gain effect of Endure AoW if guard is broken while blocking." },
    { name: "Guarding Ups Sorceries & Incantations", desc: "Gain a buff after blocking with staff/seal for about 2 seconds. Buff can stack up to 3 times, each stack lasts about 25 seconds. Each stack grants 10% increased spell damage and increased cast speed equivalent to 30 virtual DEX." },
    { name: "Failing to Cast Spell Restores FP", desc: "Restore 13% of max FP when attempting to cast a spell with insufficient FP." },
    { name: "Flask Healing Also Restores FP", desc: "Restore 20% of max FP when drinking flask." }
];

const curseWeaponEffects = [
    { name: "Reduced Maximum HP", desc: "Decrease max HP by 4%/6%" },
    { name: "Reduced Maximum FP", desc: "Decrease max FP by 6%/9%" },
    { name: "Reduced Maximum Stamina", desc: "Decrease max stamina by 5%/8%" },
    { name: "Impaired Physical Damage Negation", desc: "Increase physical damage taken by 6%/8%" },
    { name: "Impaired Affinity Damage Negation", desc: "Increase magic/fire/lightning/holy damage taken by 6%/8%" },
    { name: "All Resistances Down", desc: "Decrease all status effect resistance by 30/45" },
    { name: "Reduced Flask HP Restoration", desc: "Decrease HP restoration of flask by 6%/9%" },
    { name: "Continuous HP Loss", desc: "Lose 1/2 HP per second." },
    { name: "Night's Tide Damage Increased", desc: "Increase damage taken from rain by 100%/150%" },
    { name: "Damage Increased by Night's Encroachment", desc: "Throughout each day, increase damage taken by 1%/2.5% four times, stacking. Stacks reset after the Night 1 boss." },
    { name: "More Damage Taken After Evasion", desc: "Increase damage taken right after dodging by 15%/20%" },
    { name: "Repeated Evasions Lower Damage Negation", desc: "Increase damage taken by 23%/30% for 15 seconds after dodging repeatedly." },
    { name: "Reduced Damage Negation for Flask Usages", desc: "Increase damage taken while drinking flask by 33%/46%" },
    { name: "Lower Attack When Below Max HP", desc: "Decrease damage by 5%/7% when below 85% HP." },
    { name: "Slower Art Gauge When Below Max HP", desc: "Decrease Ultimate Art charging speed by 10%/15% when below 85% HP." },
    { name: "Poison Buildup When Below Max HP", desc: "Gain 7/9 poison buildup when below 85% HP." },
    { name: "Rot Buildup When Below Max HP", desc: "Gain 6/8 rot buildup when below 85% HP." },
    { name: "Lower Stamina Impairs Damage Negation", desc: "Increase damage taken by 10%/15% when below 50% stamina." },
    { name: "Attacks Impaired On Occasion", desc: "Each attack has a 3%/5% chance to do no damage." },
    { name: "Ailments Cause Increased Damage", desc: "Increase damage taken from status effects by 25%/35%." },
    { name: "Near Death Reduces Art Gauge", desc: "Lose 30%/45% of Ultimate Art Gauge after being downed." },
    { name: "Near Death Reduces Max HP", desc: "Decrease max HP by 15%/20% for 30 seconds after being downed." }
];

function renderWeaponEffectsGrid() {
    renderEffects("positiveWeaponEffectsGrid", positiveWeaponEffects, "positive");
    renderEffects("curseWeaponEffectsGrid", curseWeaponEffects, "curse");
}

function renderEffects(elementId, data, type) {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.innerHTML = data.map(effect => `
        <div class="effect-card ${type}">
            <div class="effect-title">${escapeHtml(effect.name)}</div>
            <div class="effect-desc">${escapeHtml(effect.desc)}</div>
        </div>
    `).join("");
}

const positiveRelicEffects = [
    { name: "Increased Maximum HP", desc: "Increases maximum HP by 1.1x" },
    { name: "Increased Maximum FP", desc: "Increases maximum FP by 1.15x" },
    { name: "Increased Maximum Stamina", desc: "Increases maximum stamina by 1.12x" },
    { name: "[Item] in possession at start of expedition", desc: "Starts the game with the specified item" },
    { name: "Max HP increased for each great enemy defeated at a Great Church", desc: "Increases maximum HP by 1.05x for each boss killed at a great church" },
    { name: "Runes and Item Discovery increased for each great enemy defeated at a Fort", desc: "Increases discovery by 16 and rune gain by 1.055x for each boss killed at a fort" },
    { name: "Arcane increased for each great enemy defeated at a Ruin", desc: "Increases arcane by 4 for each boss killed at a ruin" },
    { name: "Max stamina increased for each great enemy defeated at a Great Encampment", desc: "Increases maximum stamina by 1.075x for each boss killed at a camp" },
    { name: "Dormant Power Helps Discover [Weapon Class]", desc: "Changes the preferred weapon class to the specified class, making it more likely to obtain it" },
    { name: "Physical Attack Up +3/4", desc: "Increases physical damage by 1.105x / 1.12x" },
    { name: "Magic/Fire/Lightning/Holy Attack Up +3/4", desc: "Increases magic/fire/lightning/holy damage by 1.105x/1.12x" },
    { name: "Improved Affinity Attack Power +0/1/2", desc: "Increases magic, fire, lightning, and holy damage by 1.05x/1.08x/1.1x" },
    { name: "Physical attack power increases after using grease items +1/2", desc: "Increases physical damage by 1.17x/1.2x for 30 seconds after using grease" },
    { name: "Attack power up when facing poison/scarlet rot/frostbite-afflicted enemy +1/2", desc: "Increases damage by 1.16x/1.2x when attacking an enemy suffering from the specified status" },
    { name: "Sleep/Madness in Vicinity Improves Attack Power +0/+1", desc: "Increases damage by 1.12x/1.22x after sleep/madness procs" },
    { name: "Improved Guard Counters +1/2", desc: "Increases guard counter damage by 1.25x/1.29x" },
    { name: "Improved [Consumable] Damage +1/2", desc: "Increases pot/knife/stone/perfume damage by 1.3x/1.35x" },
    { name: "Art gauge charged from successful guarding +1", desc: "Increases characterSkillGauge by 1.5 upon blocking an attack" },
    { name: "Art gauge fills moderately upon critical hit +1", desc: "Increases characterSkillGauge by 6.5 upon riposte" },
    { name: "Defeating enemies fills more of the Art gauge +1", desc: "Increases characterSkillGauge by 6.5 upon killing enemies" },
    { name: "Improved Sorceries/Incantations +0/1/2", desc: "Increases sorcery/incant damage by 1.05x/1.085x/1.1x" },
    { name: "Reduced FP Consumption +0/1/2", desc: "Reduces FP consumption by 0.92x/0.87x/0.84x" },
    { name: "Improved Physical Damage Negation +1/2", desc: "Increases physical damage negation by 10.5%/12%" },
    { name: "Improved [Element] Damage Negation +1/2", desc: "Increases magic/fire/lightning/holy damage negation by 15%/16%" },
    { name: "Improved Affinity Damage Negation +0/1/2", desc: "Increases magic, fire, lightning, and holy damage negation by 6/10.5/12%" },
    { name: "Improved [Status] Resistance +1/2", desc: "Increases specified status resistance by 110/130" },
    { name: "Partial HP Restoration upon Post-Damage Attacks +1/2", desc: "Same as original, but increases HP gained per hit by 25%/35%" },
    { name: "HP Restoration upon Thrusting Counterattack +1", desc: "Restores [MaxHP * 0.033] on counterhits" },
    { name: "HP restored when using medicinal boluses, etc. +1", desc: "Replenish 80 HP from certain consumables" },
    { name: "Improved Flask HP Restoration", desc: "Increases HP gained from flasks by 1.1x" },
    { name: "[Wylder] Character Skill inflicts Blood Loss", desc: "Skill inflicts 60 bleed on impact / 55 bleed on pull" },
    { name: "[Guardian] Character Skill Boosts Damage Negation of Nearby Allies", desc: "Increases damage negation for self and allies by 12% for 30 seconds after using skill" },
    { name: "[Ironeye] Character Skill Inflicts Heavy Poison Damage on Poisoned Enemies", desc: "Skill inflicts 70 poison and deals extra damage to poisoned enemies" },
    { name: "[Duchess] Use Character Skill for Brief Invulnerability", desc: "Makes you immune to damage for 0.4 seconds after using skill" },
    { name: "[Raider] Hit With Character Skill to Reduce Enemy Attack Power", desc: "Decreases enemy damage dealt by 0.87x for 13 seconds after hitting them with skill" },
    { name: "[Revenant] Increases Max FP upon Ability Activation", desc: "Permanently increases maximum FP in stacks, up to a total 51% increase" },
    { name: "[Recluse] Collect Affinity Residues to Negate Affinity", desc: "Increases magic/fire/lightning/holy damage negation by 20% for 30 seconds after absorbing the matching residue" },
    { name: "[Executor] Slowly Restore HP upon Ability Activation", desc: "Restores HP over 30 seconds after passive activates" },
    { name: "[Scholar] Reduced FP consumption when using Character Skill on self", desc: "Reduces FP consumption by 0.85x for 40 seconds after using the character skill self buff" },
    { name: "[Undertaker] Executing Art readies Character Skill", desc: "Allows you to perform Trance immediately after activating ultimate. Works with temporary ultimate use." },
    { name: "[Wylder] Improved Mind, Reduced Vigor", desc: "Decreases vigor by 5, increases mind by 10" },
    { name: "[Wylder] Improved Intelligence and Faith, Reduced Strength and Dexterity", desc: "Decreases strength by 7 and dexterity by 5, increases intelligence and faith by 15" },
    { name: "[Guardian] Improved Strength and Dexterity, Reduced Vigor", desc: "Decreases vigor by 8, increases strength by 9 and dexterity by 19" },
    { name: "[Guardian] Improved Mind and Faith, Reduced Vigor", desc: "Decreases vigor by 6, increases mind by 8 and faith by 17" },
    { name: "[Ironeye] Improved Arcane, Reduced Dexterity", desc: "Decreases dexterity by 9, increases arcane by 15" },
    { name: "[Ironeye] Improved Vigor and Strength, Reduced Dexterity", desc: "Decreases dexterity by 13, increases strength by 20 and vigor by 5" },
    { name: "[Duchess] Improved Vigor and Strength, Reduced Mind", desc: "Decreases mind by 14, increases strength by 24 and vigor by 3" },
    { name: "[Duchess] Improved Mind and Faith, Reduced Intelligence", desc: "Decreases intelligence by 5, increases faith by 13 and mind by 3" },
    { name: "[Raider] Improved Mind and Intelligence, Reduced Vigor and Endurance", desc: "Decreases vigor by 8 and endurance by 4, increases intelligence by 35 and mind by 9" },
    { name: "[Raider] Improved Arcane, Reduced Vigor", desc: "Decreases vigor by 4, increases arcane by 17" },
    { name: "[Revenant] Improved Vigor and Endurance, Reduced Mind", desc: "Decreases mind by 11, increases vigor by 5 and endurance by 5" },
    { name: "[Revenant] Improved Strength, Reduced Faith", desc: "Decreases faith by 6, increases strength by 25" },
    { name: "[Recluse] Improved Vigor, Endurance, and Dexterity, Reduced Intelligence and Faith", desc: "Decreases intelligence and faith by 10, increases dexterity by 20, endurance by 5, and vigor by 4" },
    { name: "[Recluse] Improved Intelligence and Faith, Reduced Mind", desc: "Decreases mind by 13, increases intelligence and faith by 12" },
    { name: "[Executor] Improved Vigor and Endurance, Reduced Arcane", desc: "Decreases arcane by 13, increases vigor by 5 and endurance by 6" },
    { name: "[Executor] Improved Dexterity and Arcane, Reduced Vigor", desc: "Decreases vigor by 7, increases arcane by 9 and dexterity by 12" },
    { name: "[Scholar] Improved Mind, Reduced Vigor", desc: "Decreases vigor by 3, increases mind by 9" },
    { name: "[Scholar] Improved Endurance and Dexterity, Reduced Intelligence and Arcane", desc: "Decreases intelligence by 4 and arcane by 20, increases endurance by 6 and dexterity by 40" },
    { name: "[Undertaker] Improved Dexterity, Reduced Vigor and Faith", desc: "Decreases vigor by 5 and faith by 13, increases dexterity by 19" },
    { name: "[Undertaker] Improved Mind and Faith, Reduced Strength", desc: "Decreases strength by 15, increases mind by 9 and faith by 12" }
];

const curseRelicEffects = [
    { name: "Taking Damage Causes [Status] Buildup", desc: "Taking damage inflicts status buildup on the user" },
    { name: "Reduced Strength and Intelligence", desc: "Decreases strength and intelligence by 3" },
    { name: "Reduced Dexterity and Faith", desc: "Decreases dexterity and faith by 3" },
    { name: "Reduced Dexterity and Intelligence", desc: "Decreases dexterity and intelligence by 3" },
    { name: "Reduced Strength and Faith", desc: "Decreases strength and faith by 3" },
    { name: "Reduced Vigor and Arcane", desc: "Decreases vigor and arcane by 3" },
    { name: "Reduced Rune Acquisition", desc: "Decreases rune gain by 0.9x" },
    { name: "Reduced Flask HP Restoration", desc: "Reduces HP gained from flasks by 0.85x" },
    { name: "Ultimate Art Charging Impaired", desc: "Decreases ultimate gauge gain by 0.85x" },
    { name: "All Resistances Down", desc: "Decreases all status resist by 80" },
    { name: "Continuous HP Loss", desc: "Decreases HP by 2/s" },
    { name: "More Damage Taken After Evasion", desc: "Decreases damage negations by 45% right after rolling" },
    { name: "Repeated Evasions Lower Damage Negation", desc: "Decreases damage negations by 23% / 35% for 15 seconds on repeat rolls" },
    { name: "Reduced Damage Negation for Flask Usages", desc: "Decreases damage negations by 45% while using flasks" },
    { name: "Lower Attack When Below Max HP", desc: "Decreases damage by 0.915x when HP is below 85%" },
    { name: "Poison Buildup When Below Max HP", desc: "Inflicts the user with 2 poison buildup per 0.22s when HP is below 85%" },
    { name: "Rot Buildup When Below Max HP", desc: "Inflicts the user with 2 rot buildup per 0.24s when HP is below 85%" },
    { name: "Near Death Reduces Max HP", desc: "Reduces maximum HP by 0.75x for 60 seconds after being downed" }
];

function renderRelicEffectsGrid() {
    renderEffects("positiveRelicEffectsGrid", positiveRelicEffects, "positive");
    renderEffects("curseRelicEffectsGrid", curseRelicEffects, "curse");
}



function setupDeepTabs() {
    const tabs = document.querySelectorAll(".deep-tab");
    const sections = document.querySelectorAll(".deep-section");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(target)?.classList.add("active");
        });
    });
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
    renderDepthPointsTable();
    renderModifiersTable();
	renderDifficultyScalingTable();
	renderWeaponEffectsGrid();
	renderRelicEffectsGrid();
    setupDeepTabs();
});