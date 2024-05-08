import {
	Button,
	Link,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Navbar as NextUINavbar
} from "@nextui-org/react";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import clsx from "clsx";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/ThemeSwitch";
import {
	GithubIcon,
} from "@/components/icons";


import { Logo } from "@/components/icons";
import { useSession } from "@/hooks/useSession";

export const Navbar = () => {
	const { logout, context, } = useSession()
	const { state: { user }, isAuthenticated } = context
	const navItems = !isAuthenticated ?
		siteConfig.navItems : siteConfig.navItems.filter(e => e.href !== '/login' && e.href !== '/register')
	const navMenuItems = !isAuthenticated ?
		siteConfig.navMenuItems : siteConfig.navMenuItems.filter(e => e.href !== '/login' && e.href !== '/register')


	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit uppercase">Multimedia Library</p>
					</NextLink>
				</NavbarBrand>
				<div className="hidden lg:flex gap-4 justify-start ml-2">
					{navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</div>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1/5 sm:basis-full pl-4" justify="end">
				<Link isExternal href={siteConfig.links.github}>
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarContent className="hidden sm:flex basis-1 " justify="end">
				<p>Hola<b className="mx-1">{isAuthenticated ? user?.username : 'Invitado'}</b></p>
				<NavbarItem className="hidden sm:flex gap-2">
					<Link isExternal href={siteConfig.links.github}>
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
				{isAuthenticated &&
					<Button color="danger" onClick={logout}>
						Logout
					</Button>
				}
			</NavbarContent>


			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === navMenuItems.length - 1
											? "danger"
											: "foreground"
								}
								size="lg"
							>
								<NextLink
									href={item.href}
								>
									{item.label}
								</NextLink>

							</Link>
						</NavbarMenuItem>
					))}
					{isAuthenticated &&
						<NavbarMenuItem>
							<Button color="danger" onClick={logout}>
								Logout
							</Button>
						</NavbarMenuItem>
					}

				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
