import { useState } from 'react';
import './Main.css';

const Main = () => {
	const [employees, setEmployees] = useState([]);
	const [form, setForm] = useState({ id: '', name: '', email: '', dob: '', position: '' });
	const [editing, setEditing] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem('token');
		window.location.reload();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const handleAdd = () => {
		if (form.name && form.email && form.dob && form.position) {
			setEmployees([...employees, { id: Date.now(), ...form }]);
			setForm({ id: '', name: '', email: '', dob: '', position: '' });
		}
	};

	const handleEdit = (employee) => {
		setForm(employee);
		setEditing(true);
	};

	const handleUpdate = () => {
		setEmployees((prevEmployees) =>
			prevEmployees.map((emp) =>
				emp.id === form.id ? { ...form } : emp
			)
		);
		setForm({ id: '', name: '', email: '', dob: '', position: '' });
		setEditing(false);
	};

	const handleDelete = (id) => {
		setEmployees((prevEmployees) =>
			prevEmployees.filter((emp) => emp.id !== id)
		);
	};

	return (
		<div className='main_container'>
			<nav className='navbar'>
				<h1>Employee Data</h1>
				<button className='white_btn' onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className='banner'>
				<h1>Welcome to the Employee Management System</h1>
			</div>
			<div className='content_container'>
				<div className='form_container'>
					<h2>{editing ? 'Edit Employee' : 'Add Employee'}</h2>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={form.name}
						onChange={handleChange}
					/>
					<input
						type='email'
						placeholder='Email'
						name='email'
						value={form.email}
						onChange={handleChange}
					/>
					<input
						type='date'
						placeholder='Date of Birth'
						name='dob'
						value={form.dob}
						onChange={handleChange}
					/>
					<input
						type='text'
						placeholder='Position'
						name='position'
						value={form.position}
						onChange={handleChange}
					/>
					<button onClick={editing ? handleUpdate : handleAdd}>
						{editing ? 'Update' : 'Add'} Employee
					</button>
				</div>
				<div className='employee_list'>
					{employees.length > 0 ? (
						<ul>
							{employees.map((employee) => (
								<li key={employee.id}>
									<span>{employee.name} - {employee.email} - {employee.dob} - {employee.position}</span>
									<button onClick={() => handleEdit(employee)}>Edit</button>
									<button onClick={() => handleDelete(employee.id)}>Delete</button>
								</li>
							))}
						</ul>
					) : (
						<p>No employees available</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Main;
