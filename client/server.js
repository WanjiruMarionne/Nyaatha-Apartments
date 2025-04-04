const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const leasesFile = "./leases.json";
const unitsFile = "./units.json";

// Read data from file
const readData = (file) => {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, "utf8"));
};

// Write data to file
const writeData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
};

// Get all units
app.get("/units", (req, res) => {
    const units = readData(unitsFile);
    res.json(units);
});

// Add a new unit
app.post("/units", (req, res) => {
    const units = readData(unitsFile);
    const newUnit = { id: Date.now(), ...req.body, status: "vacant" };
    units.push(newUnit);
    writeData(unitsFile, units);
    res.json(newUnit);
});

// Get all leases
app.get("/leases", (req, res) => {
    const leases = readData(leasesFile);
    res.json(leases);
});

// Add a new lease
app.post("/leases", (req, res) => {
    const leases = readData(leasesFile);
    const units = readData(unitsFile);

    const { tenantName, contact, unitId, startDate, endDate } = req.body;
    const unit = units.find((u) => u.id === parseInt(unitId));

    if (!unit || unit.status !== "vacant") {
        return res.status(400).json({ error: "Invalid or occupied unit." });
    }

    const newLease = { id: Date.now(), tenantName, contact, unit, startDate, endDate };
    leases.push(newLease);
    unit.status = "occupied";

    writeData(leasesFile, leases);
    writeData(unitsFile, units);

    res.json(newLease);
});

// Delete a lease
app.delete("/leases/:id", (req, res) => {
    let leases = readData(leasesFile);
    let units = readData(unitsFile);

    const leaseId = parseInt(req.params.id);
    const leaseToDelete = leases.find((lease) => lease.id === leaseId);

    if (!leaseToDelete) return res.status(404).json({ error: "Lease not found" });

    // Mark unit as vacant
    units = units.map((unit) =>
        unit.id === leaseToDelete.unit.id ? { ...unit, status: "vacant" } : unit
    );

    leases = leases.filter((lease) => lease.id !== leaseId);

    writeData(leasesFile, leases);
    writeData(unitsFile, units);

    res.json({ message: "Lease deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
