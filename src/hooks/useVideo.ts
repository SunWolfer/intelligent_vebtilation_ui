export interface IVideoRow {
	videoUrl?: string
	[key: string]: any
}

export const useVideo = () => {
	const videoUrlList = ref<string[]>([])
	const videoListLength = computed<number>(() => {
		return videoUrlList.value.length
	})

	const resetUrl = (row: Ref<IVideoRow>) => {
		watch(
			() => row.value?.videoUrl,
			(val: string) => {
				if (!val) return
				videoUrlList.value = val.split(',') ?? []
			},
		)
	}

	return {
		videoUrlList,
		videoListLength,
		resetUrl,
	}
}
