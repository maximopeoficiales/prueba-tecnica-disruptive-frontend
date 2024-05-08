import type { AppProps } from "next/app";

import { fontMono, fontSans } from "@/config/fonts";
import { AuthProvider } from "@/provider/authProvider";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};
