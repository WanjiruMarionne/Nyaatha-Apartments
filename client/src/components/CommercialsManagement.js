import React, { useState, useEffect } from 'react';
import './CommercialLeaseManagement.css'
import Sidebar from './Sidebar';

const CommercialLeaseManagement = () => {
  const [leases, setLeases] = useState([]);
  const [units, setUnits] = useState([]);
  const [activeItem, setActiveItem] = useState('Commercials Management');

  const [newLease, setNewLease] = useState({
    tenantName: '',
    contact: '',
    unitId: '',
    startDate: '',
    endDate: '',
  });
  const [unitFilter, setUnitFilter] = useState('all');
  const [leaseFilter, setLeaseFilter] = useState('all');
  const [newUnit, setNewUnit] = useState({ floor: '', unitNumber: '' });
  const [editLeaseId, setEditLeaseId] = useState(null);
  const [renewLeaseId, setRenewLeaseId] = useState(null);

  const handleLeaseChange = (e) => {
    setNewLease({ ...newLease, [e.target.name]: e.target.value });
  };

  const handleUnitChange = (e) => {
    setNewUnit({ ...newUnit, [e.target.name]: e.target.value });
  };

  const addLeaseRecord = () => {
    const unit = units.find((u) => u.id === parseInt(newLease.unitId));

    if (!unit) {
      alert('Invalid unit selection.');
      return;
    }

    if (unit.status !== 'vacant') {
      alert('Unit is not vacant.');
      return;
    }

    const startDate = new Date(newLease.startDate);
    const endDate = new Date(newLease.endDate);

    if (endDate < startDate) {
      alert('End date must be after start date.');
      return;
    }

    const overlappingLease = leases.find(
        (lease) =>
          lease.unit.id === parseInt(newLease.unitId) &&
          new Date(newLease.startDate) <= new Date(lease.endDate) &&
          new Date(newLease.endDate) >= new Date(lease.startDate)
      );
  
      if (overlappingLease) {
        // Replace existing lease
        setLeases(
          leases.map((lease) =>
            lease.id === overlappingLease.id ? { ...newLease, id: Date.now(), unit } : lease
          )
        );
      } else {
        // Add new lease
        setLeases([...leases, { ...newLease, id: Date.now(), unit }]);
      }
      setLeases([...leases, { ...newLease, id: Date.now(), unit }]);
    setUnits(units.map((u) => (u.id === unit.id ? { ...u, status: 'occupied' } : u)));

    setNewLease({
      tenantName: '',
      contact: '',
      unitId: '',
      startDate: '',
      endDate: '',
    });
  };

  const addUnitRecord = () => {
    if (newUnit.floor.trim() === '' || newUnit.unitNumber.trim() === '') {
      alert('Floor and Unit Number cannot be empty.');
      return;
    }
    const unitName = `Floor ${newUnit.floor}, Unit ${newUnit.unitNumber}`;
    setUnits([...units, { id: Date.now(), name: unitName, status: 'vacant' }]);
    setNewUnit({ floor: '', unitNumber: '' });
  };

  const filteredUnits =
    unitFilter === 'all'
      ? units
      : units.filter((unit) => unit.status === unitFilter);

  const sortedUnits = [...units].sort((a, b) => a.id - b.id);

  const getTenantNameForUnit = (unitId) => {
    const lease = leases.find((lease) => lease.unit.id === unitId);
    return lease ? lease.tenantName : '';
  };

  const editLease = (leaseId) => {
    setEditLeaseId(leaseId);
    const leaseToEdit = leases.find((lease) => lease.id === leaseId);
    setNewLease({
      tenantName: leaseToEdit.tenantName,
      contact: leaseToEdit.contact,
      unitId: leaseToEdit.unit.id,
      startDate: leaseToEdit.startDate,
      endDate: leaseToEdit.endDate,
    });
  };

  const saveEditedLease = () => {
    const startDate = new Date(newLease.startDate);
    const endDate = new Date(newLease.endDate);

    if (endDate < startDate) {
      alert('End date must be after start date.');
      return;
    }

    // Check for overlapping leases (excluding the lease being edited)
    const overlappingLease = leases.find(
        (lease) =>
          lease.unit.id === parseInt(newLease.unitId) &&
          lease.id !== editLeaseId &&
          new Date(newLease.startDate) <= new Date(lease.endDate) &&
          new Date(newLease.endDate) >= new Date(lease.startDate)
      );
  
      if (overlappingLease) {
        // Replace existing lease
        setLeases(
          leases.map((lease) =>
            lease.id === overlappingLease.id ? { ...newLease, id: Date.now(), unit: lease.unit } : lease
          )
        );
      }
  
      setLeases(leases.map((lease) => (lease.id === editLeaseId ? { ...lease, ...newLease } : lease)));
    setEditLeaseId(null);
    setNewLease({ tenantName: '', contact: '', unitId: '', startDate: '', endDate: '' });
    };

    const filteredLeases = leases.filter((lease) => {
        const currentDate = new Date();
        const startDate = new Date(lease.startDate);
        const endDate = new Date(lease.endDate);
    
        if (leaseFilter === 'all') {
          return true;
        } else if (leaseFilter === 'active') {
          return startDate <= currentDate && endDate >= currentDate;
        } else if (leaseFilter === 'expired') {
          return endDate < currentDate;
        }
        return true;
      });

  const deleteLease = (leaseId) => {
    const leaseToDelete = leases.find((lease) => lease.id === leaseId);
    setUnits(units.map((unit) => (unit.id === leaseToDelete.unit.id ? { ...unit, status: 'vacant' } : unit)));
    setLeases(leases.filter((lease) => lease.id !== leaseId));
  };

  const renewLease = (leaseId) => {
    const leaseToRenew = leases.find((lease) => lease.id === leaseId);
    const unitId = leaseToRenew.unit.id;

    // Check if the unit is occupied by a different lease
    const isUnitOccupied = leases.some(
      (lease) =>
        lease.unit.id === unitId &&
        lease.id !== leaseId &&
        new Date(lease.startDate) <= new Date() &&
        new Date(lease.endDate) >= new Date()
    );

    if (isUnitOccupied) {
      alert('This lease cannot be renewed because the unit is currently occupied.');
      return;
    }

    setRenewLeaseId(leaseId);
    setNewLease({
      tenantName: leaseToRenew.tenantName,
      contact: leaseToRenew.contact,
      unitId: leaseToRenew.unit.id,
      startDate: leaseToRenew.endDate,
      endDate: '',
    });
  };

  const saveRenewedLease = () => {
    const startDate = new Date(newLease.startDate);
    const endDate = new Date(newLease.endDate);

    if (endDate < startDate) {
      alert('End date must be after start date.');
      return;
    }

    setLeases([...leases, { ...newLease, id: Date.now(), unit: leases.find((lease)=>lease.id === renewLeaseId).unit }]);
    setRenewLeaseId(null);
    setNewLease({ tenantName: '', contact: '', unitId: '', startDate: '', endDate: '' });
  };

  const checkLeaseExpiration = () => {
    const currentDate = new Date();
    const updatedUnits = units.map((unit) => ({ ...unit, status: 'vacant' })); // Assume all vacant initially

    leases.forEach((lease) => {
      const startDate = new Date(lease.startDate);
      const endDate = new Date(lease.endDate);

      if (endDate >= currentDate && startDate <= currentDate) {
        // Active lease, mark unit as occupied
        updatedUnits.forEach((unit, index) => {
          if (unit.id === lease.unit.id) {
            updatedUnits[index].status = 'occupied';
          }
        });
      }
    });

    setUnits(updatedUnits);
  };

  React.useEffect(() => {
    checkLeaseExpiration();
  }, [leases]);


  return (
    <div>
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
    
    <div className='commercials-container'>
      <h1>Commercial Lease Management</h1>

      {/* Add Unit Form */}
      <div>
        <h2>Add Unit</h2>
        <input
          type="text"
          name="floor"
          placeholder="Floor"
          value={newUnit.floor}
          onChange={handleUnitChange}
        />
        <input
          type="text"
          name="unitNumber"
          placeholder="Unit Number"
          value={newUnit.unitNumber}
          onChange={handleUnitChange}
        />
        <button onClick={addUnitRecord}>Add Unit</button>
      </div>

      {/* Add Lease Form */}
      <div>
        <h2>{editLeaseId ? 'Edit Lease' : renewLeaseId ? 'Renew Lease' : 'Add Lease'}</h2>
        <input
          type="text"
          name="tenantName"
          placeholder="Tenant Name"
          value={newLease.tenantName}
          onChange={handleLeaseChange}
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Info"
          value={newLease.contact}
          onChange={handleLeaseChange}
        />
        <select
          name="unitId"
          value={newLease.unitId}
          onChange={handleLeaseChange}
        >
          <option value="">Select Unit</option>
          {units
            .filter((unit) => unit.status === 'vacant' || (editLeaseId && leases.find(l=>l.id === editLeaseId).unit.id === unit.id) || (renewLeaseId && leases.find(l=>l.id===renewLeaseId).unit.id === unit.id))
            .map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
        </select>
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={newLease.startDate}
          onChange={handleLeaseChange}
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={newLease.endDate}
          onChange={handleLeaseChange}
        />
        <button onClick={editLeaseId ? saveEditedLease : renewLeaseId ? saveRenewedLease : addLeaseRecord}>
          {editLeaseId ? 'Save Edit' : renewLeaseId ? 'Save Renewal' : 'Add Lease'}
          </button>
          {editLeaseId || renewLeaseId ? (
            <button onClick={() => {
              setEditLeaseId(null);
              setRenewLeaseId(null);
              setNewLease({ tenantName: '', contact: '', unitId: '', startDate: '', endDate: '' });
            }}>Cancel</button>
          ) : null}
        </div>

        {/* Unit Filter */}
        <div>
          <h2>Filter Units</h2>
          <select value={unitFilter} onChange={(e) => setUnitFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="vacant">Vacant</option>
            <option value="occupied">Occupied</option>
          </select>
        </div>

        {/* Unit List (Filtered and Chronological) */}
        <div>
          <h2>Unit Status</h2>
          <table>
            <thead>
              <tr>
                <th>Unit Name</th>
                <th>Tenant Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnits.map((unit) => (
                <tr key={unit.id}>
                  <td>{unit.name}</td>
                  <td>{getTenantNameForUnit(unit.id)}</td>
                  <td>{unit.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
        <h2>Filter Leases</h2>
        <select value={leaseFilter} onChange={(e) => setLeaseFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
      </div>

        {/* Lease List */}
        <div>
          <h2>Lease List</h2>
          <table>
            <thead>
              <tr>
                <th>Tenant Name</th>
                <th>Contact</th>
                <th>Unit</th>
                <th>From</th>
                <th>To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {filteredLeases.map((lease) => (
                <tr key={lease.id}>
                  <td>{lease.tenantName}</td>
                  <td>{lease.contact}</td>
                  <td>{lease.unit.name}</td>
                  <td>{lease.startDate}</td>
                  <td>{lease.endDate}</td>
                  <td>
                    <button onClick={() => editLease(lease.id)}>Edit</button>
                    <button onClick={() => deleteLease(lease.id)}>Delete</button>
                    <button onClick={() => renewLease(lease.id)}>Renew</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    );
  };

  export default CommercialLeaseManagement;