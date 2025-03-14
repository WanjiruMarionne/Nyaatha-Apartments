import React, { useState } from 'react';
import "./FinancePropertyManagement.css";
import Sidebar from './Sidebar';

const FinancePropertyManagement = (leases, tenants, units) => {
  const [rentInvoices, setRentInvoices] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [activeItem, setActiveItem] = useState('Financial Management');
  const [showModal, setShowModal] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [invoiceFilter, setInvoiceFilter] = useState('all');
  const [expenseFilter, setExpenseFilter] = useState('all');

  const [newInvoice, setNewInvoice] = useState({
    tenant: '',
    property: '',
    amount: '',
    dueDate: '',
    paid: false,
  });
  const [newExpense, setNewExpense] = useState({ category: '', vendor: '', amount: '', date: '', paid: false });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [selectedTenantUnits, setSelectedTenantUnits] = useState([]);

  const handleInputChange = (e, setter, state) => {
    setter({ ...state, [e.target.name]: e.target.value });
  };

  const handleTenantChange = (e) => {
    const tenantName = e.target.value;
    setNewInvoice({ ...newInvoice, tenant: tenantName, property: '' });
    const filteredUnits = leases
      .filter((lease) => lease.tenantName === tenantName)
      .map((lease) => lease.unit);
    setSelectedTenantUnits(filteredUnits);
  };

  const handlePropertyChange = (e) => {
    const unitId = parseInt(e.target.value);
    setNewInvoice({ ...newInvoice, property: unitId });
  };

  const addRecord = (setter, state, newItem, resetSetter) => {
    if (editItemId) {
      const updatedList = state.map(item => item.id === editItemId ? { ...newItem, id: editItemId } : item);
      setter(updatedList);
      setEditItemId(null);
    } else {
      setter([...state, { ...newItem, id: Date.now() }]);
    }
    resetSetter({});
    setShowModal(null);
  };

  const markAsPaid = (id, setter, state) => {
    const updatedList = state.map(item => item.id === id ? { ...item, paid: true } : item);
    setter(updatedList);
  };

  const deleteRecord = (id, setter, state) => {
    const item = state.find(item => item.id === id);
    if (item && item.paid) {
      alert("Cannot delete paid items.");
      return;
    }
    const updatedList = state.filter(item => item.id !== id);
    setter(updatedList);
  };

  const editRecord = (id, setter, state, itemSetter) => {
    const itemToEdit = state.find(item => item.id === id);
    if (itemToEdit && itemToEdit.paid) {
      alert("Cannot edit paid items.");
      return;
    }
    setEditItemId(id);
    if (itemToEdit) {
      itemSetter({ ...itemToEdit });
      setShowModal(setter === setRentInvoices ? "invoice" : setter === setExpenses ? "expense" : "lease");
    }
  };

  const filterByDate = (items) => {
    if (!startDate || !endDate) return items;
    return items.filter(item =>
      new Date(item.date || item.dueDate || item.startDate) >= new Date(startDate) &&
      new Date(item.date || item.dueDate || item.endDate) <= new Date(endDate)
    );
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  const filteredInvoices = filterByDate(rentInvoices).filter(invoice => {
    if (invoiceFilter === 'all') return true;
    return invoice.paid === (invoiceFilter === 'paid');
  });

  const filteredExpenses = filterByDate(expenses).filter(expense => {
    if (expenseFilter === 'all') return true;
    return expense.paid === (expenseFilter === 'paid');
  });

  const totalIncome = filteredInvoices.reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div>
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="finance-container">
        <h1 className="title">Financial Management</h1>

        <div className="finance-header">
          <div className="finance-buttons">
            <button onClick={() => { setEditItemId(null); setShowModal("invoice") }}>Add Invoice</button>
            <button onClick={() => { setEditItemId(null); setShowModal("expense") }}>Add Expense</button>
          </div>

          <div className="filter-section">
            <label>Filter by Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button onClick={clearFilters}>Clear Filter</button>
          </div>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(null)}>&times;</span>

              {showModal === "invoice" && (
  <>
    <h2>{editItemId ? "Edit Invoice" : "Add Invoice"}</h2>
    {Array.isArray(tenants) && (
      <select name="tenant" onChange={handleTenantChange} value={newInvoice.tenant}>
        <option value="">Select Tenant</option>
        {tenants.map((tenant) => (
          <option key={tenant.id} value={tenant.name}>
            {tenant.name}
          </option>
        ))}
      </select>
    )}

    {Array.isArray(selectedTenantUnits) && (
      <select name="property" onChange={handlePropertyChange} value={newInvoice.property}>
        <option value="">Select Property</option>
        {selectedTenantUnits.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.name}
          </option>
        ))}
      </select>
    )}


                  <input name="amount" type="number" placeholder="Amount" value={newInvoice.amount} onChange={(e) => handleInputChange(e, setNewInvoice, newInvoice)} />
                  <div className="due-date">
                    <p>Due Date</p>
                    <input name="dueDate" type="date" value={newInvoice.dueDate} onChange={(e) => handleInputChange(e, setNewInvoice, newInvoice)} />
                  </div>
                  <button onClick={() => addRecord(setRentInvoices, rentInvoices, newInvoice, setNewInvoice)}>{editItemId ? "Update Invoice" : "Save Invoice"}</button>
                </>
              )}

              {showModal === "expense" && (
                <>
                  <h2>{editItemId ? "Edit Expense" : "Add Expense"}</h2>
                  <input name="category" placeholder="Category" value={newExpense.category} onChange={(e) => handleInputChange(e, setNewExpense, newExpense)} />
                  <input name="vendor" placeholder="Vendor" value={newExpense.vendor} onChange={(e) => handleInputChange(e, setNewExpense, newExpense)} />
                  <input name="amount" type="number" placeholder="Amount" value={newExpense.amount} onChange={(e) => handleInputChange(e, setNewExpense, newExpense)} />
                  <div className="due-date">
                    <p>Due Date</p>
                    <input name="date" type="date" value={newExpense.date} onChange={(e) => handleInputChange(e, setNewExpense, newExpense)} />
                  </div>
                  <button onClick={() => addRecord(setExpenses, expenses, newExpense, setNewExpense)}>{editItemId ? "Update Expense" : "Save Expense"}</button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="summary-container">
          <h2>Income Statement Summary</h2>
          <p>Total Income: ${totalIncome.toFixed(2)}</p>
          <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
          <p>Net Profit: ${netProfit.toFixed(2)}</p>
        </div>

        <div className="table-container">
          <h2>Rent Invoices</h2>
          <div>
            <select value={invoiceFilter} onChange={(e) => setInvoiceFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <table>
            <thead><tr><th>Tenant</th><th>Property</th><th>Amount</th><th>Due Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id}>
                  <td>{invoice.tenant}</td>
                  <td>{units.find(unit=> unit.id === invoice.property)?.name}</td>
                  <td>${invoice.amount}</td>
                  <td>{invoice.dueDate}</td>
                  <td>{invoice.paid ? "Paid ✅" : <button onClick={() => markAsPaid(invoice.id, setRentInvoices, rentInvoices)}>Mark as Received</button>}</td>
                  <td>
                    <button onClick={() => editRecord(invoice.id, setRentInvoices, rentInvoices, setNewInvoice)}>Edit</button>
                    <button onClick={() => deleteRecord(invoice.id, setRentInvoices, rentInvoices)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <h2>Expenses</h2>
          <div>
            <select value={expenseFilter} onChange={(e) => setExpenseFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <table>
            <thead><tr><th>Category</th><th>Vendor</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.category}</td>
                  <td>{expense.vendor}</td>
                  <td>${expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>{expense.paid ? "Paid ✅" : <button onClick={() => markAsPaid(expense.id, setExpenses, expenses)}>Mark as Paid</button>}</td>
                  <td>
                    <button onClick={() => editRecord(expense.id, setExpenses, expenses, setNewExpense)}>Edit</button>
                    <button onClick={() => deleteRecord(expense.id, setExpenses, expenses)}>Delete</button>
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

export default FinancePropertyManagement;