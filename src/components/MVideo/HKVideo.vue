<template>
  <div v-if="showVideoDialog" class="video">
    <iframe class="viiframe" :src="videourl" frameborder="0" :style="getStyle"></iframe>
  </div>
</template>

<script setup>
  const props = defineProps({
    domid: {
      type: String,
      default() {
        return 'xg'
      },
    },
    autoplay: {
      type: Boolean,
      default() {
        return false
      },
    },
    height: {
      type: String,
      default() {
        return '100%'
      },
    },
    width: {
      type: String,
      default() {
        return '100% !important'
      },
    },
    videoPath: {
      type: String,
    },
  })

  const getStyle = computed(() => {
    return { width: props.width, height: props.height }
  })

  const showVideoDialog = ref(false)
  const videourl = ref('')
  const videoall = import.meta.env.BASE_URL + import.meta.env.VITE_APP_VIDEO_URL

  watch(
    () => props.videoPath,
    (val) => {
      val && play()
    },
  )

  onMounted(() => {
    play()
  })

  function play() {
    showVideoDialog.value = true
    nextTick(() => {
      videourl.value =
        videoall +
        '?url=' +
        import.meta.env.BASE_URL +
        'file/bgVideo.mp4' +
        '&domid=' +
        props.domid +
        '&autoplay=' +
        props.autoplay
    })
  }
  function destory() {}
</script>

<style>
  .xg {
    width: 100% !important;
    /* height: 100% !important; */
  }
  .video {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .viiframe {
    position: absolute;
    z-index: 0;
  }
</style>
