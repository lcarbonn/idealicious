export default defineAppConfig({
  ui: {
    main: {
      base: 'min-h-[calc(100vh-var(--ui-header-height))] pb-20'
    },
    colors: {
      primary: 'brand',
      secondary: 'brand-sec',
      info: 'brand-info',
      neutral: 'slate',
      postit0: 'postit0',
      postit1: 'postit1',
      postit2: 'postit2',
      postit3: 'postit3',
      postit4: 'postit4',
    },
    pageCard: {
      slots: {
        wrapper: 'flex flex-col flex-1 items-center',
        title: 'text-white',
      }
    },
    modal: {
      slots: {
        footer: 'justify-end'
      }
    },
    pageGrid: {
      base: 'relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8'
    },
    pageColumns: {
      base: 'relative columns-3 md:columns-6 lg:columns-6 gap-8 space-y-8 *:break-inside-avoid-column *:will-change-transform'
    },
    footer: {
      slots: {
        root: 'fixed pt-1 bottom-0 left-0 right-0 z-40 backdrop-blur bg-default/75 border-t border-default',
        top: 'py-0 lg:py-0',
        container: 'text-xs py-0 lg:py-2 lg:flex lg:items-center lg:justify-between lg:gap-x-3',
      }
    },
    table: {
      slots: {
        tr: 'even:bg-primary-50 dark:even:bg-primary-800/50 hover:bg-primary-100 dark:hover:bg-primary-700/50'
      }
    },
  }
})
