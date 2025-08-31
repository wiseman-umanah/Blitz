import { Users, ArrowLeft } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

type HeaderProps = {
  title: string;
};


export function Header({ title }: HeaderProps) {
  const location = useLocation();

  const showBack = location.pathname !== "/dashboard";

  return (
	<header className="container mx-auto px-4 py-6">
		<div className="flex items-center gap-3 justify-between">
			<div className="flex items-center gap-2">
				{showBack && (
					<button>
					<Link to="/dashboard">
						<ArrowLeft className="w-4 h-4 mr-2" />
					</Link>
					</button>
				)}
				<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
					<Users className="w-5 h-5 text-primary-foreground" />
				</div>
				<span className="text-xl font-bold text-foreground super">{title}</span>
			</div>

			<div>
				<ConnectButton />
			</div>
		</div>
	</header>
  );
}
