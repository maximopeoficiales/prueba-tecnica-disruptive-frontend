import { GridCardPost } from "@/components/GridCardPost";
import SearchFilter from "@/components/SearchFilter";
import { useSession } from "@/hooks/useSession";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/router';

export default function IndexPage() {
	const { context } = useSession()
	const { countPost } = context.state
	const { isAuthenticated, context: { state: { user } } } = useSession()
	const isCreator = user?.role?.name == 'creator'
	const { push } = useRouter()
	const redirectCreatePost = () => {
		push('/post/create')
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
						<span>Current Images <b>{countPost?.recordsImagesPost}</b></span>
						<span>Current Videos <b>{countPost?.recordsVideoPost}</b></span>
						<span>Current Texts <b>{countPost?.recordsTextPost}</b></span>
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

