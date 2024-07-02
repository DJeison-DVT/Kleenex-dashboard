import { NavLink } from 'react-router-dom';
import { Gauge, ShoppingCart, Award } from 'lucide-react';

export default function Sidebar() {
	return (
		<div className="w-fit h-full flex flex-col">
			<div className="bg-primary w-64 flex justify-center py-2">
				<img
					src="/demente-logo.png"
					alt="demente logo"
					className="invert w-60"
				/>
			</div>
			<nav className="flex flex-col bg-dark text-primary flex-1 *:p-4">
				<NavLink
					to="/dashboard"
					end
					className={({ isActive }) =>
						(isActive && 'bg-black/25') || 'hover:bg-black/35'
					}
				>
					<div className="flex gap-4">
						<Gauge />
						Dashboard
					</div>
				</NavLink>
				<NavLink
					to="/dashboard/participations"
					className={({ isActive }) =>
						(isActive && 'bg-black/25') || 'hover:bg-black/35'
					}
				>
					<div className="flex gap-4">
						<ShoppingCart />
						Participaciones
					</div>
				</NavLink>
				<NavLink
					to="/dashboard/prizes"
					className={({ isActive }) =>
						(isActive && 'bg-black/25') || 'hover:bg-black/35'
					}
				>
					<div className="flex gap-4">
						<Award />
						Premios
					</div>
				</NavLink>
			</nav>
		</div>
	);
}
