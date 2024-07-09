
function ReactComp({ title }: { title: string }) {
	return (
		<div className="w-full m-0 border-l-2 border-teal-600 flex flex-col gap-2 py-2 [padding-left:1rem]">
			<div role="heading" aria-level={2} className="text-3xl font-bold">{title}</div>
			<div className="rounded-md text-center">
				this is a react component
			</div>
		</div>
	);
}

export default ReactComp;
