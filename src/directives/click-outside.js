const elements = new Map()

const handler = event => {
    elements.forEach(({ callback, isDisabled }, el) => {
        if (!isDisabled && el !== event.target && !el.contains(event.target)) {
            callback(event)
        }
    })
}

export default {
    bind (el, binding) {
        const context = { callback: binding.value, isDisabled: true }
        elements.set(el, context)
        document.addEventListener('click', handler)

        setTimeout(() => {
            context.isDisabled = false
        }, 0)
    },
    unbind (el) {
        elements.delete(el)
        if (elements.size === 0) {
            document.removeEventListener('click', handler)
        }
    }
}
