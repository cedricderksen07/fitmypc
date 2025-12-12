// PC Configurator - Main Script

// State für aktuelle Auswahl
const selected = {
    cpu: null,
    mainboard: null,
    ram: null,
    gpu: null,
    psu: null,
    storage: null,
    case: null,
    cooler: null
};

let currentPCType = 'gaming';

// Beim Laden der Seite initialisieren
document.addEventListener('DOMContentLoaded', initializeConfigurator);

function initializeConfigurator() {
    addPCTypeListeners();
    populateDropdowns();
    addEventListeners();
    updateCompatibility();
}

/**
 * PC-Typ-Button Event Listener hinzufügen
 */
function addPCTypeListeners() {
    const typeButtons = document.querySelectorAll('.pc-type-btn');
    typeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentPCType = e.target.dataset.type;
            
            typeButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            Object.keys(selected).forEach(key => {
                selected[key] = null;
            });
            
            document.querySelectorAll('select[data-component]').forEach(select => {
                select.value = '';
            });
            
            document.querySelectorAll('[id$="-display"]').forEach(display => {
                display.innerHTML = '';
            });
            
            document.querySelectorAll('[id$="-buy"]').forEach(btn => {
                btn.classList.remove('active');
            });
            
            populateDropdowns();
            updateCompatibility();
        });
    });
}

/**
 * Filter Komponenten nach PC-Typ
 */
function getComponentsByType(componentsArray) {
    return componentsArray.filter(component => {
        if (!component.types) return true;
        return component.types.includes(currentPCType);
    });
}

/**
 * Alle Dropdowns mit Komponenten aus data.js füllen
 */
function populateDropdowns() {
    // CPU Dropdown
    const cpuSelect = document.getElementById('cpu');
    cpuSelect.innerHTML = '<option value="">-- CPU auswählen --</option>';
    getComponentsByType(componentsData.cpus).forEach(cpu => {
        const option = document.createElement('option');
        option.value = cpu.id;
        option.textContent = `${cpu.name} (${cpu.socket}) - UVP: €${cpu.price}`;
        cpuSelect.appendChild(option);
    });

    // Mainboard Dropdown
    const mbSelect = document.getElementById('mainboard');
    mbSelect.innerHTML = '<option value="">-- Mainboard auswählen --</option>';
    getComponentsByType(componentsData.mainboards).forEach(mb => {
        const option = document.createElement('option');
        option.value = mb.id;
        option.textContent = `${mb.name} (${mb.socket}) - UVP: €${mb.price}`;
        mbSelect.appendChild(option);
    });

    // RAM Dropdown
    const ramSelect = document.getElementById('ram');
    ramSelect.innerHTML = '<option value="">-- RAM auswählen --</option>';
    getComponentsByType(componentsData.rams).forEach(ram => {
        const option = document.createElement('option');
        option.value = ram.id;
        option.textContent = `${ram.name} (${ram.type} ${ram.speed}MHz) - UVP: €${ram.price}`;
        ramSelect.appendChild(option);
    });

    // GPU Dropdown
    const gpuSelect = document.getElementById('gpu');
    gpuSelect.innerHTML = '<option value="">-- GPU auswählen --</option>';
    getComponentsByType(componentsData.gpus).forEach(gpu => {
        const option = document.createElement('option');
        option.value = gpu.id;
        option.textContent = `${gpu.name} (${gpu.power}W) - UVP: €${gpu.price}`;
        gpuSelect.appendChild(option);
    });

    // PSU Dropdown
    const psuSelect = document.getElementById('psu');
    psuSelect.innerHTML = '<option value="">-- Netzteil auswählen --</option>';
    getComponentsByType(componentsData.psus).forEach(psu => {
        const option = document.createElement('option');
        option.value = psu.id;
        option.textContent = `${psu.name} (${psu.type}) - UVP: €${psu.price}`;
        psuSelect.appendChild(option);
    });

    // Storage Dropdown
    const storageSelect = document.getElementById('storage');
    storageSelect.innerHTML = '<option value="">-- Speicher auswählen --</option>';
    getComponentsByType(componentsData.storages).forEach(storage => {
        const option = document.createElement('option');
        option.value = storage.id;
        option.textContent = `${storage.name} (${storage.type}) - UVP: €${storage.price}`;
        storageSelect.appendChild(option);
    });

    // Case Dropdown
    const caseSelect = document.getElementById('case');
    caseSelect.innerHTML = '<option value="">-- Gehäuse auswählen --</option>';
    getComponentsByType(componentsData.cases).forEach(caseItem => {
        const option = document.createElement('option');
        option.value = caseItem.id;
        option.textContent = `${caseItem.name} (${caseItem.psuType}) - UVP: €${caseItem.price}`;
        caseSelect.appendChild(option);
    });

    // Cooler Dropdown
    const coolerSelect = document.getElementById('cooler');
    coolerSelect.innerHTML = '<option value="">-- Kühler auswählen --</option>';
    getComponentsByType(componentsData.coolers).forEach(cooler => {
        const option = document.createElement('option');
        option.value = cooler.id;
        option.textContent = `${cooler.name} (${cooler.height}mm) - UVP: €${cooler.price}`;
        coolerSelect.appendChild(option);
    });
}

/**
 * Event Listener für alle Dropdowns hinzufügen
 */
function addEventListeners() {
    const selects = document.querySelectorAll('select[data-component]');
    selects.forEach(select => {
        select.addEventListener('change', (e) => {
            const componentType = e.target.dataset.component;
            const value = e.target.value;
            
            if (value) {
                selected[componentType] = {
                    id: value,
                    name: e.target.options[e.target.selectedIndex].textContent
                };
            } else {
                selected[componentType] = null;
            }
            
            updateComponentDisplay(componentType);
            updateCompatibility();
        });
    });

    // Reset Button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetConfigurator);
    }

    // Budget Button
    const budgetBtn = document.getElementById('budgetBtn');
    if (budgetBtn) {
        budgetBtn.addEventListener('click', buildPCByBudget);
    }
}

/**
 * Komponenten-Display aktualisieren (Preis + Affiliate Button)
 */
function updateComponentDisplay(componentType) {
    const displayId = `${componentType}-display`;
    const display = document.getElementById(displayId);
    const affiliateBtn = document.getElementById(`${componentType}-buy`);
    
    if (!display || !affiliateBtn) return;

    if (!selected[componentType]) {
        display.innerHTML = '';
        affiliateBtn.classList.remove('active');
        return;
    }

    const componentId = selected[componentType].id;
    const componentsArray = componentsData[componentType + 's'];
    const component = componentsArray.find(c => c.id == componentId);

    if (component) {
        display.innerHTML = `<strong>UVP: €${component.price}</strong>`;
        
        // Affiliate Button
        affiliateBtn.classList.add('active');
        affiliateBtn.onclick = () => window.open(component.affiliateLink, '_blank');
    }
}

/**
 * Kompatibilität prüfen und anzeigen
 */
function updateCompatibility() {
    const compatDiv = document.getElementById('compatibility');
    let isCompatible = true;
    let checks = [];

    // 1. CPU ↔ Mainboard Socket
    if (selected.cpu && selected.mainboard) {
        const cpu = componentsData.cpus.find(c => c.id == selected.cpu.id);
        const mb = componentsData.mainboards.find(m => m.id == selected.mainboard.id);
        
        if (cpu && mb) {
            const match = cpu.socket === mb.socket;
            checks.push({
                name: 'CPU ↔ Mainboard Socket',
                compatible: match,
                info: `${cpu.socket} mit ${mb.socket}`
            });
            if (!match) isCompatible = false;
        }
    }

    // 2. RAM ↔ Mainboard RAM-Typ
    if (selected.ram && selected.mainboard) {
        const ram = componentsData.rams.find(r => r.id == selected.ram.id);
        const mb = componentsData.mainboards.find(m => m.id == selected.mainboard.id);
        
        if (ram && mb) {
            const match = ram.type === mb.ramType;
            checks.push({
                name: 'RAM ↔ Mainboard',
                compatible: match,
                info: `${ram.type} mit ${mb.ramType}`
            });
            if (!match) isCompatible = false;
        }
    }

    // 3. GPU-Länge ↔ Gehäuse Max-Länge
    if (selected.gpu && selected.case) {
        const gpu = componentsData.gpus.find(g => g.id == selected.gpu.id);
        const caseItem = componentsData.cases.find(c => c.id == selected.case.id);
        
        if (gpu && caseItem) {
            const match = gpu.length <= caseItem.maxGpuLength;
            checks.push({
                name: 'GPU ↔ Gehäuse Länge',
                compatible: match,
                info: `${gpu.length}mm in ${caseItem.maxGpuLength}mm`
            });
            if (!match) isCompatible = false;
        }
    }

    // 4. Kühlerhöhe ↔ Gehäuse Max-Höhe
    if (selected.cooler && selected.case) {
        const cooler = componentsData.coolers.find(c => c.id == selected.cooler.id);
        const caseItem = componentsData.cases.find(c => c.id == selected.case.id);
        
        if (cooler && caseItem) {
            const match = cooler.height <= caseItem.maxCoolerHeight;
            checks.push({
                name: 'Kühler ↔ Gehäuse Höhe',
                compatible: match,
                info: `${cooler.height}mm in ${caseItem.maxCoolerHeight}mm`
            });
            if (!match) isCompatible = false;
        }
    }

    // 5. Netzteil Wattzahl ↔ Komponenten-Verbrauch
    if (selected.psu && (selected.cpu || selected.gpu)) {
        const psu = componentsData.psus.find(p => p.id == selected.psu.id);
        const cpu = selected.cpu ? componentsData.cpus.find(c => c.id == selected.cpu.id) : null;
        const gpu = selected.gpu ? componentsData.gpus.find(g => g.id == selected.gpu.id) : null;
        
        if (psu) {
            const totalTdp = (cpu ? cpu.tdp : 0) + (gpu ? gpu.power : 0) + 100; // +100 für Rest
            const match = psu.wattage >= totalTdp * 1.25; // 25% Overhead
            checks.push({
                name: 'Netzteil ↔ Verbrauch',
                compatible: match,
                info: `${psu.wattage}W für ~${Math.ceil(totalTdp)}W`
            });
            if (!match) isCompatible = false;
        }
    }

    // 6. Netzteil Typ ↔ Gehäuse
    if (selected.psu && selected.case) {
        const psu = componentsData.psus.find(p => p.id == selected.psu.id);
        const caseItem = componentsData.cases.find(c => c.id == selected.case.id);
        
        if (psu && caseItem) {
            const match = psu.type === caseItem.psuType;
            checks.push({
                name: 'Netzteil ↔ Gehäuse',
                compatible: match,
                info: `${psu.type} in ${caseItem.psuType}`
            });
            if (!match) isCompatible = false;
        }
    }

    // HTML für Kompatibilität generieren
    let html = '';
    if (checks.length > 0) {
        checks.forEach(check => {
            const iconClass = check.compatible ? 'check' : 'cross';
            const icon = check.compatible ? '✓' : '✗';
            const rowClass = check.compatible ? 'compatible' : 'incompatible';
            
            html += `
                <div class="compatibility-item ${rowClass}">
                    <span class="compatibility-icon ${iconClass}">${icon}</span>
                    <div class="compatibility-text">
                        <strong>${check.name}</strong>
                        <small>${check.info}</small>
                    </div>
                </div>
            `;
        });
    } else {
        html = '<p style="color: #999; text-align: center;">Wählen Sie Komponenten aus um die Kompatibilität zu prüfen</p>';
    }

    compatDiv.innerHTML = html;

    // Summary Box aktualisieren
    updateSummaryBox(isCompatible);
}

/**
 * Summary Box mit Gesamtpreis und Status aktualisieren
 */
function updateSummaryBox(isCompatible) {
    const summaryDiv = document.getElementById('summary');
    
    // Gesamtpreis berechnen
    let totalPrice = 0;
    Object.keys(selected).forEach(componentType => {
        if (selected[componentType]) {
            const component = componentsData[componentType + 's'].find(c => c.id == selected[componentType].id);
            if (component) {
                totalPrice += component.price;
            }
        }
    });

    const statusClass = isCompatible ? 'status-compatible' : 'status-incompatible';
    const statusText = isCompatible ? '✓ Vollständig kompatibel!' : '✗ Inkompatibilität erkannt!';

    const html = `
        <h3>PC-Konfiguration</h3>
        <div class="total-price">UVP: €${totalPrice.toFixed(2).replace('.', ',')}</div>
        <div class="summary-status">
            <span class="${statusClass}">${statusText}</span>
        </div>
    `;

    summaryDiv.innerHTML = html;
}

/**
 * Configurator zurücksetzen
 */
function resetConfigurator() {
    // Alle Select-Elemente zurücksetzen
    document.querySelectorAll('select[data-component]').forEach(select => {
        select.value = '';
    });

    // State zurücksetzen
    Object.keys(selected).forEach(key => {
        selected[key] = null;
    });

    // Displays löschen
    document.querySelectorAll('[id$="-display"]').forEach(display => {
        display.innerHTML = '';
    });

    // Affiliate Buttons verstecken
    document.querySelectorAll('[id$="-buy"]').forEach(btn => {
        btn.classList.remove('active');
    });

    // Kompatibilität und Summary aktualisieren
    updateCompatibility();
}

/**
 * PC nach Budget automatisch zusammenstellen
 */
function buildPCByBudget() {
    const budgetInput = document.getElementById('budgetInput');
    const budgetResult = document.getElementById('budgetResult');
    const budget = parseInt(budgetInput.value);

    if (!budget || budget <= 0) {
        budgetResult.innerHTML = '<h4>Bitte geben Sie ein gültiges Budget ein!</h4>';
        budgetResult.className = 'budget-result show error';
        return;
    }

    budgetResult.className = 'budget-result';
    budgetResult.innerHTML = '';

    const validConfigurations = [];

    const cpus = getComponentsByType(componentsData.cpus);
    const mbs = getComponentsByType(componentsData.mainboards);
    const rams = getComponentsByType(componentsData.rams);
    const gpus = getComponentsByType(componentsData.gpus);
    const storages = getComponentsByType(componentsData.storages);
    const cases = getComponentsByType(componentsData.cases);
    const coolers = getComponentsByType(componentsData.coolers);
    const psus = getComponentsByType(componentsData.psus);

    for (const cpu of cpus) {
        for (const mb of mbs) {
            if (cpu.socket !== mb.socket) continue;

            for (const ram of rams) {
                if (ram.type !== mb.ramType) continue;

                for (const gpu of gpus) {
                    for (const storage of storages) {
                        for (const caseItem of cases) {
                            if (gpu.length > caseItem.maxGpuLength) continue;

                            for (const cooler of coolers) {
                                if (cooler.height > caseItem.maxCoolerHeight) continue;

                                for (const psu of psus) {
                                    if (psu.type !== caseItem.psuType) continue;

                                    const totalTdp = cpu.tdp + gpu.power + 100;
                                    if (psu.wattage < totalTdp * 1.25) continue;

                                    const totalPrice = cpu.price + mb.price + ram.price + gpu.price + 
                                                     storage.price + caseItem.price + cooler.price + psu.price;

                                    if (totalPrice <= budget) {
                                        validConfigurations.push({
                                            cpu, mb, ram, gpu, storage, caseItem, cooler, psu,
                                            totalPrice,
                                            performanceScore: gpu.power + cpu.tdp
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (validConfigurations.length === 0) {
        budgetResult.innerHTML = `<h4>❌ Keine kompatible PC-Konfiguration für €${budget} gefunden!</h4>
            <p>Versuchen Sie ein höheres Budget einzugeben.</p>`;
        budgetResult.className = 'budget-result show error';
        return;
    }

    validConfigurations.sort((a, b) => b.performanceScore - a.performanceScore);
    const bestConfig = validConfigurations[0];

    selected.cpu = { id: bestConfig.cpu.id, name: bestConfig.cpu.name };
    selected.mainboard = { id: bestConfig.mb.id, name: bestConfig.mb.name };
    selected.ram = { id: bestConfig.ram.id, name: bestConfig.ram.name };
    selected.gpu = { id: bestConfig.gpu.id, name: bestConfig.gpu.name };
    selected.storage = { id: bestConfig.storage.id, name: bestConfig.storage.name };
    selected.case = { id: bestConfig.caseItem.id, name: bestConfig.caseItem.name };
    selected.cooler = { id: bestConfig.cooler.id, name: bestConfig.cooler.name };
    selected.psu = { id: bestConfig.psu.id, name: bestConfig.psu.name };

    document.getElementById('cpu').value = bestConfig.cpu.id;
    document.getElementById('mainboard').value = bestConfig.mb.id;
    document.getElementById('ram').value = bestConfig.ram.id;
    document.getElementById('gpu').value = bestConfig.gpu.id;
    document.getElementById('storage').value = bestConfig.storage.id;
    document.getElementById('case').value = bestConfig.caseItem.id;
    document.getElementById('cooler').value = bestConfig.cooler.id;
    document.getElementById('psu').value = bestConfig.psu.id;

    ['cpu', 'mainboard', 'ram', 'gpu', 'storage', 'case', 'cooler', 'psu'].forEach(type => {
        updateComponentDisplay(type);
    });

    updateCompatibility();

    let resultHTML = `<h4>✓ PC-Konfiguration gefunden!</h4>
        <div class="budget-result-items">
            <div class="budget-result-item">
                <strong>CPU:</strong>
                <span>${bestConfig.cpu.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>Mainboard:</strong>
                <span>${bestConfig.mb.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>RAM:</strong>
                <span>${bestConfig.ram.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>GPU:</strong>
                <span>${bestConfig.gpu.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>Storage:</strong>
                <span>${bestConfig.storage.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>Case:</strong>
                <span>${bestConfig.caseItem.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>Cooler:</strong>
                <span>${bestConfig.cooler.name}</span>
            </div>
            <div class="budget-result-item">
                <strong>PSU:</strong>
                <span>${bestConfig.psu.name}</span>
            </div>
            <div class="budget-result-total">
                Gesamtpreis: UVP: €${bestConfig.totalPrice}
            </div>
        </div>`;

    budgetResult.innerHTML = resultHTML;
    budgetResult.className = 'budget-result show success';
}

/**
 * Affiliate Links für Pre-Built PCs laden
 */
function initializePreBuiltPCs() {
    const prebuiltContainer = document.getElementById('prebuilt-container');
    if (!prebuiltContainer) return;

    let html = '';
    componentsData.preBuiltPCs.forEach(pc => {
        html += `
            <div class="prebuilt-card">
                <h3>${pc.name}</h3>
                <p>${pc.description}</p>
                <div class="prebuilt-price">UVP: €${pc.price.toFixed(2).replace('.', ',')}</div>
                <a href="${pc.affiliateLink}" target="_blank" class="prebuilt-btn">Jetzt kaufen</a>
            </div>
        `;
    });

    prebuiltContainer.innerHTML = html;
}

// Pre-Built PCs beim Laden initialisieren
document.addEventListener('DOMContentLoaded', initializePreBuiltPCs);
