export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Library Multimedia",
	description: "App with NextJs",
	navItems: [
		{
			label: "Library",
			href: "/",
		},
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Register",
      href: "/register",
    },
	],
	navMenuItems: [
		{
			label: "Library",
			href: "/",
		},
		{
			label: "Login",
			href: "/login",
		},
		{
			label: "Register",
			href: "/register",
		},
	],
	links: {
		github: "https://github.com/maximopeoficiales",
	},
};
