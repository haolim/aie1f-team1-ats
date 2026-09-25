// Sidebar component for the Applicant Tracker application
import { NavLink } from 'react-router';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <h2 className="sidebar-title">Applicant Tracker</h2>
      <NavLink to="/" end>
        Board
      </NavLink>
      <NavLink to="/rejected">Rejected</NavLink>
      <NavLink to="/candidates/new">+ Add</NavLink>
    </nav>
  );
}
