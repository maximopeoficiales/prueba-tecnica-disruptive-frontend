import { GridCardPost } from "@/components/GridCardPost";
import SearchFilter from "@/components/SearchFilter";
import { roleCreator } from "@/config/roles";
import { routes } from "@/config/routes";
import { useAuth } from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/router';

export default function IndexPage() {
	const { context } = useAuth()
	const { push } = useRouter()

	const { countPost } = context.state
	const { isAuthenticated, context: { state: { user } } } = useAuth()
	const isCreator = user?.role?.name == roleCreator
	const redirectCreatePost = () => {
		if (isAuthenticated) {
			push(routes.POST_CREATE)
		}
	}
	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

				<div className="flex justify-between w-full">
					{isAuthenticated && isCreator ?
						<Button color="primary" onClick={redirectCreatePost}>
							Create Post
						</Button> :
						<div></div>
					}
					<div className="flex flex-col text-xs">
						{isAuthenticated && <span>Credits <b>{user.credits}</b></span>}
						{countPost ?
							<>
								<span>Current Images <b>{countPost?.recordsImagesPost}</b></span>
								<span>Current Videos <b>{countPost?.recordsVideoPost}</b></span>
								<span>Current Texts <b>{countPost?.recordsTextPost}</b></span>
							</>
							:
							<span>Not Information</span>
						}
					</div>
				</div>

				<div className="w-6/6  md:w-4/6">
					<SearchFilter />
				</div>
				<GridCardPost />
			</section>
		</DefaultLayout>
	);
}

